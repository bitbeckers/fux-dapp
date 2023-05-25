// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155ReceiverUpgradeable.sol";

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

error NotAllowed();
error NonTransferableFux();
error NotContributor();
error NotCoordinator();
error NotEnoughFunds();
error NotEnoughFux();
error NotEnoughVFux();
error TokensAlreadyMinted();
error EvaluationAlreadySubmitted();
error NonExistentWorkstream();
error NotApprovedOrOwner();
error InvalidInput(string message);

enum WorkstreamState {
    Started,
    Evaluation,
    Closed
}

contract FUX is
    Initializable,
    ERC1155Upgradeable,
    AccessControlUpgradeable,
    ERC1155SupplyUpgradeable,
    ERC1155URIStorageUpgradeable,
    ERC1155ReceiverUpgradeable,
    UUPSUpgradeable
{
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    uint256 public constant FUX_TOKEN_ID = 0;
    uint256 public constant VFUX_TOKEN_ID = 1;
    uint256 internal counter;

    bytes4 internal constant ERC1155_ACCEPTED = 0xf23a6e61;
    bytes4 internal constant ERC1155_BATCH_ACCEPTED = 0xbc197c81;

    event FuxClaimed(address user);
    event VFuxClaimed(address user, uint256 workstreamID);
    event FuxGiven(address user, uint256 workstreamId, uint256 amount);

    event WorkstreamMinted(uint256 id, uint256 funds, uint256 deadline, string metadataUri);
    event ContributorsAdded(uint256 id, address[] contributors);

    event EvaluationSubmitted(uint256 workstreamID, address creator, address[] contributors, uint256[] ratings);
    event WorkstreamClosed(uint256 workstreamID);

    event WorkstreamCancelled(uint256 workstreamID);

    event RewardsReserved(address user, uint256 amount);
    event RewardsClaimed(address user, uint256 amount);

    event StateUpdate(uint256 workstreamID, WorkstreamState state);

    struct Workstream {
        string name;
        address creator;
        uint256 deadline;
        uint256 funds;
        WorkstreamState state;
        bool exists;
    }

    struct Evaluation {
        address[] contributors;
        uint256[] ratings;
    }

    mapping(address => bool) internal isFuxer;
    mapping(uint256 => Workstream) internal workstreams;
    mapping(address => mapping(uint256 => uint256)) internal commitments;
    mapping(address => mapping(uint256 => Evaluation)) internal evaluations;
    mapping(address => mapping(uint256 => bool)) internal contributors;
    mapping(address => uint256) internal balances;

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

    // READ

    function getCommitment(address user, uint256 workstreamID) external view returns (uint256 fuxGiven) {
        fuxGiven = commitments[user][workstreamID];
    }

    function getEvaluation(address user, uint256 workstreamID) external view returns (Evaluation memory evaluation) {
        evaluation = evaluations[user][workstreamID];
    }

    function getWorkstream(uint256 workstreamID) external view returns (Workstream memory workstream) {
        workstream = workstreams[workstreamID];
    }

    function getRewards(address user) external view returns (uint256 availableRewards) {
        availableRewards = balances[user];
    }

    function uri(uint256 tokenId)
        public
        view
        override(ERC1155Upgradeable, ERC1155URIStorageUpgradeable)
        returns (string memory)
    {
        return super.uri(tokenId);
    }

    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    function mintFux() public {
        if (isFuxer[msg.sender]) revert TokensAlreadyMinted();

        isFuxer[msg.sender] = true;
        _mint(msg.sender, FUX_TOKEN_ID, 100, "");

        emit FuxClaimed(msg.sender);
    }

    function mintVFux(uint256 workstreamID) public onlyCoordinator(workstreamID) {
        Workstream storage workstream = workstreams[workstreamID];
        if (!workstream.exists || workstream.state != WorkstreamState.Started) revert NotAllowed();
        if (commitments[msg.sender][workstreamID] == 0) revert NotEnoughFux();

        workstream.state = WorkstreamState.Evaluation;
        _mint(msg.sender, VFUX_TOKEN_ID, 100, "");
        emit VFuxClaimed(msg.sender, workstreamID);
    }

    function mintWorkstream(
        string memory name,
        address[] calldata _contributors,
        uint256 coordinatorCommitment,
        uint256 deadline
    ) public payable {
        counter += 1;

        // Create workstream
        Workstream memory _workstream;
        _workstream.name = name;
        _workstream.creator = msg.sender;
        _workstream.deadline = deadline;
        _workstream.state = WorkstreamState.Started;
        _workstream.exists = true;

        if (msg.value > 0) {
            _workstream.funds = msg.value;
        }

        // Add contributors
        uint256 contributorsLength = _contributors.length;

        for (uint256 i = 0; i < contributorsLength;) {
            address contributor = _contributors[i];

            contributors[contributor][counter] = true;
            unchecked {
                ++i;
            }
        }

        // Store workstream
        workstreams[counter] = _workstream;

        // Commit coordinator to workstream
        commitToWorkstream(counter, coordinatorCommitment);

        emit ContributorsAdded(counter, _contributors);
        emit WorkstreamMinted(counter, msg.value, deadline, "");
    }

    function addContributors(uint256 workstreamID, address[] calldata _contributors)
        public
        isActiveWorkstream(workstreamID)
    {
        if (workstreams[workstreamID].creator != msg.sender) revert NotApprovedOrOwner();
        uint256 contributorsLength = _contributors.length;
        for (uint256 i = 0; i < contributorsLength;) {
            contributors[_contributors[i]][workstreamID] = true;
            unchecked {
                ++i;
            }
        }
        emit ContributorsAdded(workstreamID, _contributors);
    }

    function commitToWorkstream(uint256 workstreamID, uint256 fuxGiven) public isActiveWorkstream(workstreamID) {
        if (!contributors[msg.sender][workstreamID]) revert NotContributor();

        uint256 currentFux = commitments[msg.sender][workstreamID];

        if (currentFux == fuxGiven) revert InvalidInput("Current equals update");

        commitments[msg.sender][workstreamID] = fuxGiven;

        if (currentFux < fuxGiven) {
            _safeTransferFrom(msg.sender, address(this), FUX_TOKEN_ID, fuxGiven - currentFux, "");
        }
        if (currentFux > fuxGiven) {
            _safeTransferFrom(address(this), msg.sender, FUX_TOKEN_ID, currentFux - fuxGiven, "");
        }

        emit FuxGiven(msg.sender, workstreamID, fuxGiven);
    }

    function submitEvaluation(uint256 workstreamID, address[] memory _contributors, uint256[] memory ratings) public {
        if (!contributors[msg.sender][workstreamID]) revert NotContributor();
        if (commitments[msg.sender][workstreamID] == 0) revert NotAllowed();
        if (_contributors.length == 0 || _contributors.length != ratings.length) {
            revert InvalidInput("Array size mismatch");
        }

        _submitEvaluations(workstreamID, _contributors, ratings);
    }

    function finalizeWorkstream(uint256 workstreamID, address[] memory _contributors, uint256[] memory vFuxGiven)
        public
        onlyCoordinator(workstreamID)
    {
        Workstream storage workstream = workstreams[workstreamID];
        if (commitments[msg.sender][workstreamID] == 0) revert NotEnoughFux();
        if (workstream.state != WorkstreamState.Evaluation) revert NotAllowed();

        uint256 funds = workstream.funds;
        uint256 coordinatorCommitment = commitments[msg.sender][workstreamID];

        commitments[msg.sender][workstreamID] = 0;
        workstream.state = WorkstreamState.Closed;
        workstream.exists = false;

        _returnFux(_contributors, workstreamID);
        _payVFux(_contributors, vFuxGiven);

        if (funds > 0) {
            workstream.funds = 0;
            _reserveFunds(_contributors, vFuxGiven, funds);
        }

        _safeTransferFrom(address(this), msg.sender, FUX_TOKEN_ID, coordinatorCommitment, "");

        emit WorkstreamClosed(workstreamID);
    }

    function closeWorkstream(uint256 workstreamID, address[] memory _contributors)
        public
        onlyCoordinator(workstreamID)
    {
        Workstream storage workstream = workstreams[workstreamID];
        if (commitments[msg.sender][workstreamID] == 0) revert NotEnoughFux();
        if (workstream.state == WorkstreamState.Closed) revert NotAllowed();

        uint256 funds = workstream.funds;
        uint256 coordinatorCommitment = commitments[msg.sender][workstreamID];

        commitments[msg.sender][workstreamID] = 0;
        workstream.state = WorkstreamState.Closed;
        workstream.exists = false;
        workstream.funds = 0;

        _returnFux(_contributors, workstreamID);

        if (balanceOf(msg.sender, VFUX_TOKEN_ID) > 0) {
            _burn(msg.sender, VFUX_TOKEN_ID, 100);
        }

        _safeTransferFrom(address(this), msg.sender, FUX_TOKEN_ID, coordinatorCommitment, "");
        payable(msg.sender).transfer(funds);

        emit WorkstreamClosed(workstreamID);
    }

    function _submitEvaluations(uint256 workstreamID, address[] memory _contributors, uint256[] memory ratings)
        internal
    {
        if (_getTotal(ratings) != 100) revert InvalidInput("ratings != 100");
        _noSelfFuxing(_contributors);

        if (_contributors.length == 0 || _contributors.length != ratings.length) {
            revert InvalidInput("contributors, ratings");
        }

        evaluations[msg.sender][workstreamID] = Evaluation(_contributors, ratings);

        emit EvaluationSubmitted(workstreamID, msg.sender, _contributors, ratings);
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

    function _payVFux(address[] memory _contributors, uint256[] memory vFuxGiven) internal {
        if (_getTotal(vFuxGiven) != 100) revert NotAllowed();
        uint256 size = vFuxGiven.length;

        for (uint256 i = 0; i < size;) {
            _safeTransferFrom(msg.sender, _contributors[i], VFUX_TOKEN_ID, vFuxGiven[i], "");
            unchecked {
                ++i;
            }
        }
    }

    function _returnFux(address[] memory _contributors, uint256 workstreamID) internal {
        uint256 size = _contributors.length;
        for (uint256 i = 0; i < size;) {
            address contributor = _contributors[i];
            uint256 commitment = commitments[contributor][workstreamID];
            commitments[contributor][workstreamID] = 0;

            _safeTransferFrom(address(this), contributor, FUX_TOKEN_ID, commitment, "");
            unchecked {
                ++i;
            }
        }
    }

    function _reserveFunds(address[] memory _contributors, uint256[] memory vFuxGiven, uint256 balance) internal {
        uint256 size = vFuxGiven.length;
        uint256 total = 0;
        for (uint256 i = 0; i < size;) {
            uint256 portion = (vFuxGiven[i] * balance) / 100;
            total += portion;
            balances[_contributors[i]] += portion;
            emit RewardsReserved(_contributors[i], portion);
            unchecked {
                ++i;
            }
        }

        if (total > balance) revert NotEnoughFunds();
    }

    function claimRewards() external {
        if (balances[msg.sender] == 0) revert NotEnoughFunds();

        uint256 owed = balances[msg.sender];
        balances[msg.sender] = 0;

        payable(msg.sender).transfer(owed);
        emit RewardsClaimed(msg.sender, owed);
    }

    function _getTotal(uint256[] memory values) internal pure returns (uint256 total) {
        uint256 len = values.length;
        for (uint256 i = 0; i < len;) {
            total += values[i];
            unchecked {
                ++i;
            }
        }
    }

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

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}

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
