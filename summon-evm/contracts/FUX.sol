// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155ReceiverUpgradeable.sol";

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import "hardhat/console.sol";

error NotAllowed();
error NonTransferableFux();
error NotContributor();
error NotCoordinator();
error NotEnoughBalance(address token);
error NotEnoughFux();
error NotEnoughVFux();
error TokensAlreadyMinted();
error NonExistentWorkstream();
error NotApprovedOrOwner();
error InvalidInput(string message);

enum WorkstreamState {
    Started,
    Evaluation,
    Closed
}

/**
 * @title FUX
 * @dev FUX is a protocol for staking your attention span. We utilise FUX token as a parallel for attention and vFUX are the rewards allocated by the coordinator after normalised ratings informed by your peers.
 * This contract implements the FUX token and the VFUX token, which are ERC-1155 tokens used to reward contributors to workstreams.
 */
contract FUX is
    Initializable,
    ERC1155Upgradeable,
    AccessControlUpgradeable,
    ERC1155SupplyUpgradeable,
    ERC1155URIStorageUpgradeable,
    ERC1155ReceiverUpgradeable,
    UUPSUpgradeable
{
    /**
     * @notice Role definitions
     */
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    uint256 public constant FUX_TOKEN_ID = 1;
    uint256 public constant VFUX_TOKEN_ID = 0;
    uint256 internal counter;

    bytes4 internal constant ERC1155_ACCEPTED = 0xf23a6e61;
    bytes4 internal constant ERC1155_BATCH_ACCEPTED = 0xbc197c81;

    /**
     * @dev Emitted when a user claims FUX tokens.
     * @param user The address of the user who claimed the tokens.
     */
    event FuxClaimed(address user);

    /**
     * @dev Emitted when FUX are given by a user for a workstream.
     * @param user The address of the user who gave FUX.
     * @param workstreamID The ID of the workstream for which FUX were given.
     * @param amount The amount of FUX given.
     */
    event FuxGiven(address user, uint256 workstreamID, uint256 amount);

    event WorkstreamMinted(
        uint256 workstreamID, uint256 deadline, address[] rewardsToken, uint256[] rewards, string metadataUri
    );
    event ContributorsAdded(uint256 workstreamID, address[] contributors);

    event EvaluationSubmitted(uint256 workstreamID, address creator, address[] contributors, uint256[] ratings);
    event WorkstreamClosed(uint256 workstreamID, address[] contributors, uint256[] vFux);

    event RewardsClaimed(address user, uint256 amount, address token);

    event StateUpdate(uint256 workstreamID, WorkstreamState state);
    event UpdatedWorkstreamURI(uint256 workstreamID, string uri);

    struct Workstream {
        string name;
        address creator;
        uint256 deadline;
        WorkstreamState state;
        bool exists;
    }

    struct Evaluation {
        address[] contributors;
        uint256[] ratings;
    }

    mapping(address => bool) internal isFuxer;
    mapping(uint256 => Workstream) internal workstreams;
    mapping(address => mapping(uint256 => uint256)) internal userWorkstreamIndex;
    mapping(uint256 => uint256) internal commitments;
    mapping(uint256 => Evaluation) internal evaluations;
    mapping(uint256 => bool) internal contributors;
    mapping(uint256 => address[]) internal workstreamTokens;
    mapping(address => mapping(address => uint256)) internal userBalances;
    mapping(uint256 => mapping(address => uint256)) internal workstreamBalances;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __ERC1155_init("");
        __AccessControl_init();
        __ERC1155Supply_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(URI_SETTER_ROLE, msg.sender);
        _grantRole(UPGRADER_ROLE, msg.sender);

        counter = 0;
    }

    /**
     * READING FUNCTIONS
     */

    function getCommitment(address user, uint256 workstreamID) external view returns (uint256 fuxGiven) {
        fuxGiven = commitments[_userWorkstreamIndex(user, workstreamID)];
    }

    function getEvaluation(address user, uint256 workstreamID) external view returns (Evaluation memory evaluation) {
        evaluation = evaluations[_userWorkstreamIndex(user, workstreamID)];
    }

    function getWorkstream(uint256 workstreamID) external view returns (Workstream memory workstream) {
        workstream = workstreams[workstreamID];
    }

    function getUserRewards(address user, address token) external view returns (uint256 availableRewards) {
        availableRewards = userBalances[user][token];
    }

    function getWorkstreamRewards(uint256 workstreamID, address token)
        external
        view
        returns (uint256 availableRewards)
    {
        availableRewards = workstreamBalances[workstreamID][token];
    }

    function uri(uint256 tokenId)
        public
        view
        override(ERC1155Upgradeable, ERC1155URIStorageUpgradeable)
        returns (string memory)
    {
        return super.uri(tokenId);
    }

    function mintFux() public {
        if (isFuxer[msg.sender]) revert TokensAlreadyMinted();

        isFuxer[msg.sender] = true;
        _mint(msg.sender, FUX_TOKEN_ID, 100, "");

        emit FuxClaimed(msg.sender);
    }

    function mintWorkstream(
        string memory name,
        address[] calldata _contributors,
        uint256 coordinatorCommitment,
        uint256 deadline,
        address[] calldata rewardsTokens,
        uint256[] calldata rewards,
        string memory metadataUri
    ) public payable {
        // Create workstream
        uint256 workstreamID = _createWorkstream(name, deadline, rewardsTokens, rewards);

        // Add contributors
        _addContributors(workstreamID, _contributors);

        // Commit coordinator to workstream
        commitToWorkstream(workstreamID, coordinatorCommitment);

        setURI(workstreamID, metadataUri);

        emit ContributorsAdded(workstreamID, _contributors);
        emit WorkstreamMinted(workstreamID, deadline, rewardsTokens, rewards, metadataUri);
    }

    function addContributors(uint256 workstreamID, address[] calldata _contributors)
        external
        onlyCoordinator(workstreamID)
    {
        if (workstreams[workstreamID].state != WorkstreamState.Started) revert NotAllowed();

        _addContributors(workstreamID, _contributors);
        emit ContributorsAdded(workstreamID, _contributors);
    }

    function commitToWorkstream(uint256 workstreamID, uint256 fuxGiven) public isActiveWorkstream(workstreamID) {
        if (!contributors[_userWorkstreamIndex(msg.sender, workstreamID)]) revert NotContributor();

        uint256 currentFux = commitments[_userWorkstreamIndex(msg.sender, workstreamID)];

        if (currentFux == fuxGiven) revert InvalidInput("Current equals update");

        commitments[_userWorkstreamIndex(msg.sender, workstreamID)] = fuxGiven;

        if (currentFux < fuxGiven) {
            _safeTransferFrom(msg.sender, address(this), FUX_TOKEN_ID, fuxGiven - currentFux, "");
        }
        if (currentFux > fuxGiven) {
            _safeTransferFrom(address(this), msg.sender, FUX_TOKEN_ID, currentFux - fuxGiven, "");
        }

        emit FuxGiven(msg.sender, workstreamID, fuxGiven);
    }

    function submitEvaluation(uint256 workstreamID, address[] memory _contributors, uint256[] memory ratings) public {
        if (!contributors[_userWorkstreamIndex(msg.sender, workstreamID)]) revert NotContributor();
        if (commitments[_userWorkstreamIndex(msg.sender, workstreamID)] == 0) revert NotAllowed();
        if (_contributors.length == 0 || _contributors.length != ratings.length) {
            revert InvalidInput("Array size mismatch");
        }
        if (_getTotal(ratings) != 100) revert InvalidInput("ratings != 100");

        _noSelfFuxing(_contributors);

        evaluations[_userWorkstreamIndex(msg.sender, workstreamID)] = Evaluation(_contributors, ratings);

        emit EvaluationSubmitted(workstreamID, msg.sender, _contributors, ratings);
    }

    function finalizeWorkstream(uint256 workstreamID, address[] memory _contributors, uint256[] memory vFuxGiven)
        public
        onlyCoordinator(workstreamID)
    {
        Workstream storage workstream = workstreams[workstreamID];
        if (!workstream.exists && workstream.state == WorkstreamState.Closed) revert NotAllowed();

        // Calculate the total amount of funds in the workstream by mapping over all the reward tokens
        if (workstreamTokens[workstreamID].length > 0) {
            uint256 len = workstreamTokens[workstreamID].length;

            for (uint256 i = 0; i < len; i++) {
                address token = workstreamTokens[workstreamID][i];
                uint256 funds = workstreamBalances[workstreamID][token];

                workstreamBalances[workstreamID][token] = 0;
                _reserveFunds(_contributors, vFuxGiven, token, funds, workstreamID);
            }
        }

        // Transfer the coordinator's commitment back to them
        uint256 coordinatorCommitment = commitments[_userWorkstreamIndex(msg.sender, workstreamID)];
        commitments[_userWorkstreamIndex(msg.sender, workstreamID)] = 0;
        _safeTransferFrom(address(this), msg.sender, FUX_TOKEN_ID, coordinatorCommitment, "");

        // Return FUX tokens to all contributors
        _returnFux(_contributors, workstreamID);

        // Pay vFUX rewards to all contributors
        _payVFux(_contributors, vFuxGiven);

        // Close the workstream
        workstream.state = WorkstreamState.Closed;
        workstream.exists = false;

        emit WorkstreamClosed(workstreamID, _contributors, vFuxGiven);
    }

    function claimRewards(address token) external {
        if (token == address(0)) {
            uint256 owed = userBalances[token][msg.sender];
            userBalances[token][msg.sender] = 0;

            payable(msg.sender).transfer(owed);
            emit RewardsClaimed(msg.sender, owed, token);
        } else {
            IERC20(token).transfer(msg.sender, userBalances[token][msg.sender]);
            userBalances[token][msg.sender] = 0;
            emit RewardsClaimed(msg.sender, userBalances[token][msg.sender], token);
        }
    }

    /**
     * PRIVATE FUNCTIONS
     */

    function _addContributors(uint256 workstreamID, address[] calldata _contributors) private {
        uint256 contributorsLength = _contributors.length;

        for (uint256 i = 0; i < contributorsLength;) {
            contributors[_userWorkstreamIndex(_contributors[i], workstreamID)] = true;
            unchecked {
                ++i;
            }
        }
    }

    function _createWorkstream(
        string memory name,
        uint256 deadline,
        address[] memory rewardToken,
        uint256[] memory rewards
    ) private returns (uint256) {
        counter += 1;

        Workstream memory _workstream;
        _workstream.name = name;
        _workstream.creator = msg.sender;
        _workstream.deadline = deadline;
        _workstream.state = WorkstreamState.Started;
        _workstream.exists = true;

        if (rewardToken.length > 0) {
            uint256 len = rewardToken.length;

            for (uint256 i = 0; i < len; i++) {
                address token = rewardToken[i];
                uint256 reward = rewards[i];

                workstreamTokens[counter].push(token);
                workstreamBalances[counter][token] = reward;
            }
        }

        if (msg.value > 0) {
            workstreamBalances[counter][address(0)] = msg.value;
        }

        workstreams[counter] = _workstream;

        return counter;
    }

    function _reserveFunds(
        address[] memory _contributors,
        uint256[] memory _vFux,
        address _rewardToken,
        uint256 _totalFunds,
        uint256 _workstreamID
    ) private onlyCoordinator(_workstreamID) {
        if (_vFux.length != _contributors.length) revert InvalidInput("Lengths do not match");
        if (_getTotal(_vFux) != 100) revert InvalidInput("Percentages do not add up to 100");

        uint256 size = _contributors.length;
        uint256 remainingFunds = _totalFunds;

        for (uint256 i = 0; i < size; i++) {
            address contributor = _contributors[i];
            uint256 vFux = _vFux[i];

            uint256 rewardAmount = (_totalFunds * vFux) / 100;

            if (_rewardToken == address(0)) {
                // Handle native token (Ether)
                require(address(this).balance >= rewardAmount, "Insufficient balance");
                (bool success,) = contributor.call{value: rewardAmount}("");
                require(success, "Transfer failed");
            } else {
                // Handle ERC20 token
                IERC20 rewardToken = IERC20(_rewardToken);
                require(rewardToken.balanceOf(address(this)) >= rewardAmount, "Insufficient balance");
                require(rewardToken.transfer(contributor, rewardAmount), "Transfer failed");
            }

            remainingFunds -= rewardAmount;
        }

        if (_rewardToken == address(0)) {
            // Handle native token (Ether)
            require(address(this).balance >= remainingFunds, "Insufficient balance");
        } else {
            // Handle ERC20 token
            IERC20 rewardToken = IERC20(_rewardToken);
            require(rewardToken.balanceOf(address(this)) >= remainingFunds, "Insufficient balance");
        }
    }

    function _returnFux(address[] memory _contributors, uint256 workstreamID) private {
        uint256 size = _contributors.length;
        for (uint256 i = 0; i < size;) {
            address contributor = _contributors[i];
            uint256 commitment = commitments[_userWorkstreamIndex(contributor, workstreamID)];

            if (commitment > 0) {
                commitments[_userWorkstreamIndex(contributor, workstreamID)] = 0;

                _safeTransferFrom(address(this), contributor, FUX_TOKEN_ID, commitment, "");
            }

            unchecked {
                ++i;
            }
        }
    }

    function _payVFux(address[] memory _contributors, uint256[] memory vFuxGiven) internal {
        if (_getTotal(vFuxGiven) != 100) revert NotAllowed();
        uint256 size = vFuxGiven.length;

        for (uint256 i = 0; i < size;) {
            if (vFuxGiven[i] > 0) {
                _safeTransferFrom(msg.sender, _contributors[i], VFUX_TOKEN_ID, vFuxGiven[i], "");
            }
            unchecked {
                ++i;
            }
        }
    }

    /**
     * UTILITY FUNCTIONS
     */

    function _getTotal(uint256[] memory values) internal pure returns (uint256 total) {
        uint256 len = values.length;
        for (uint256 i = 0; i < len;) {
            total += values[i];
            unchecked {
                ++i;
            }
        }
    }

    function _noSelfFuxing(address[] memory _contributors) internal view {
        uint256 size = _contributors.length;
        for (uint256 i = 0; i < size;) {
            if (_contributors[i] == msg.sender) revert NotAllowed();
            unchecked {
                ++i;
            }
        }
    }

    function _userWorkstreamIndex(address user, uint256 workstreamID) internal view returns (uint256 index) {
        index = userWorkstreamIndex[user][workstreamID];
    }

    /**
     * CONFIGURATION FUNCTIONS
     */

    function updateURI(uint256 workstreamID, string calldata newuri) public onlyRole(URI_SETTER_ROLE) {
        emit UpdatedWorkstreamURI(workstreamID, newuri);
    }

    function setURI(uint256 tokenID, string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(tokenID, newuri);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}

    /**
     * BLOCK TRANSFER FUNCTIONS
     */

    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes memory data)
        public
        pure
        override
    {
        revert NotAllowed();
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public pure virtual override {
        revert NotAllowed();
    }
    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155Upgradeable, ERC1155SupplyUpgradeable) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155Upgradeable, ERC1155ReceiverUpgradeable, AccessControlUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function onERC1155Received(address _operator, address _from, uint256 _id, uint256 _value, bytes calldata _data)
        external
        pure
        returns (bytes4)
    {
        return ERC1155_ACCEPTED;
    }

    function onERC1155BatchReceived(
        address _operator,
        address _from,
        uint256[] calldata _ids,
        uint256[] calldata _values,
        bytes calldata _data
    ) external pure returns (bytes4) {
        return ERC1155_BATCH_ACCEPTED;
    }

    modifier onlyCoordinator(uint256 workstreamID) {
        if (workstreams[workstreamID].creator != msg.sender) revert NotCoordinator();
        _;
    }

    modifier isActiveWorkstream(uint256 workstreamID) {
        Workstream storage workstream = workstreams[workstreamID];
        if (workstream.state == WorkstreamState.Closed || !workstream.exists) revert NotAllowed();
        _;
    }

    function readWorkstreamState(uint256 workstreamID) external view returns (string memory) {
        WorkstreamState temp = workstreams[workstreamID].state;
        if (temp == WorkstreamState.Started) return "Started";
        if (temp == WorkstreamState.Evaluation) return "Evaluation";
        if (temp == WorkstreamState.Closed) return "Closed";
        return "";
    }
}
