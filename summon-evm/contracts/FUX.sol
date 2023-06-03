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

/**
 * ERROR MESSAGES
 */

/**
 * @dev Throws a NotAllowed error when an action is not allowed
 * Example case: A user tries to call a function that is restricted to the contract owner
 */
error NotAllowed();

/**
 * @dev Throws a NonTransferableFux error when FUX tokens cannot be transferred
 * Example case: A user tries to transfer FUX tokens to another user or contract, which is not allowed
 */
error NonTransferableFux();

/**
 * @dev Throws a NotContributor error when the caller is not a contributor to a workstream
 * Example case: A user tries to contribute to a workstream that they are not a part of
 */
error NotContributor();

/**
 * @dev Throws a NotCoordinator error when the caller is not the coordinator of a workstream
 * Example case: A user tries to close a workstream that they are not the coordinator of
 */
error NotCoordinator();

/**
 * @dev Throws a NotEnoughBalance error with the address of the token when the caller does not have enough balance of a specified token
 * Example case: A user tries to transfer tokens, but they do not have enough balance of the specified token
 */
error NotEnoughBalance(address token);

/**
 * @dev Throws a NotEnoughFux error when the caller does not have enough FUX tokens
 * Example case: A user tries to contribute to a workstream, but they do not have enough FUX tokens
 */
error NotEnoughFux();

/**
 * @dev Throws a NotEnoughVFux error when the caller does not have enough VFUX tokens
 * Example case: A user tries to claim rewards for a workstream, but they do not have enough VFUX tokens
 */
error NotEnoughVFux();

/**
 * @dev Throws a TokensAlreadyMinted error when tokens have already been minted
 * Example case: A user tries to mint tokens, but the tokens have already been minted
 */
error TokensAlreadyMinted();

/**
 * @dev Throws a NonExistentWorkstream error when a workstream does not exist
 * Example case: A user tries to contribute to a workstream that does not exist
 */
error NonExistentWorkstream();

/**
 * @dev Throws a NotApprovedOrOwner error when the caller is not the owner or has not been approved
 * Example case: A user tries to transfer tokens, but they are not the owner or have not been approved
 */
error NotApprovedOrOwner();

/**
 * @dev Throws an InvalidInput error with the specified message when the input is invalid
 * Example case: A user tries to call a function with invalid input parameters
 */
error InvalidInput(string message);

/**
 * @dev Enum representing the state of a workstream
 */
enum WorkstreamState {
    Started, // The workstream has been started
    Evaluation, // The workstream is in the evaluation phase
    Closed // The workstream has been closed
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

    /**
     * @dev This event is emitted when a new workstream is minted
     * @param workstreamID The ID of the newly minted workstream
     * @param deadline The deadline for contributors to submit their evaluations
     * @param rewardsToken An array of addresses of the tokens used to reward contributors
     * @param rewards An array of the amounts of each token used to reward contributors
     * @param metadataUri A URI pointing to metadata about the workstream
     */
    event WorkstreamMinted(
        uint256 workstreamID, uint256 deadline, address[] rewardsToken, uint256[] rewards, string metadataUri
    );

    /**
     * @dev This event is emitted when contributors are added to a workstream
     * @param workstreamID The ID of the workstream to which contributors were added
     * @param contributors An array of addresses of the contributors who were added
     */
    event ContributorsAdded(uint256 workstreamID, address[] contributors);

    /**
     * @dev This event is emitted when an evaluation is submitted for a workstream
     * @param workstreamID The ID of the workstream for which the evaluation was submitted
     * @param creator The address of the creator of the workstream
     * @param contributors An array of addresses of the contributors who submitted evaluations
     * @param ratings An array of ratings submitted by the contributors
     */
    event EvaluationSubmitted(uint256 workstreamID, address creator, address[] contributors, uint256[] ratings);

    /**
     * @dev This event is emitted when a workstream is closed
     * @param workstreamID The ID of the workstream that was closed
     * @param contributors An array of addresses of the contributors to the workstream
     * @param vFux An array of the amounts of vFUX tokens awarded to each contributor
     */
    event WorkstreamClosed(uint256 workstreamID, address[] contributors, uint256[] vFux);

    /**
     * @dev This event is emitted when a user claims their rewards
     * @param user The address of the user claiming their rewards
     * @param amount The amount of rewards claimed
     * @param token The address of the token claimed
     */
    event RewardsClaimed(address user, uint256 amount, address token);

    /**
     * @dev This event is emitted when the state of a workstream is updated
     * @param workstreamID The ID of the workstream whose state was updated
     * @param state The new state of the workstream
     * @notice The workstream can be in one of three states: Started, Evaluation, or Closed
     */
    event StateUpdate(uint256 workstreamID, WorkstreamState state);

    /**
     * @dev This event is emitted when the URI of a workstream is updated
     * @param workstreamID The ID of the workstream whose URI was updated
     * @param uri The new URI of the workstream
     */
    event UpdatedWorkstreamURI(uint256 workstreamID, string uri);

    /**
     * @dev This struct defines the properties of a workstream
     * @param name The name of the workstream
     * @param creator The address of the creator of the workstream
     * @param deadline The deadline for contributors to submit their evaluations
     * @param state The current state of the workstream
     * @param exists A flag indicating whether the workstream exists
     */
    struct Workstream {
        // The name of the workstream
        string name;
        // The address of the creator of the workstream
        address creator;
        // The deadline for the workstream (in seconds since the Unix epoch)
        uint256 deadline;
        // The state of the workstream
        WorkstreamState state;
        // A flag indicating whether the workstream exists
        bool exists;
    }

    /**
     * @dev This struct defines the properties of an evaluation
     * @param contributors An array of addresses of the contributors who submitted evaluations
     * @param ratings An array of ratings submitted by the contributors
     */
    struct Evaluation {
        address[] contributors;
        uint256[] ratings;
    }

    /**
     * @dev This mapping keeps track of whether an address is a FUXer
     */
    mapping(address => bool) internal isFuxer;

    /**
     * @dev This mapping keeps track of the workstreams
     */
    mapping(uint256 => Workstream) internal workstreams;

    /**
     * @dev This mapping keeps track of the index of a user's workstream
     */
    mapping(address => mapping(uint256 => uint256)) internal userWorkstreamIndex;

    /**
     * @dev This mapping keeps track of the commitments made to a workstream by a user
     */
    mapping(uint256 => address) internal commitments;

    /**
     * @dev This mapping keeps track of the evaluations submitted for a workstream
     */
    mapping(uint256 => Evaluation) internal evaluations;

    /**
     * @dev This mapping keeps track of the contributors to a workstream
     */
    mapping(uint256 => bool) internal contributors;

    /**
     * @dev This mapping keeps track of the tokens used to reward contributors to a workstream
     */
    mapping(uint256 => address[]) internal workstreamTokens;

    /**
     * @dev This mapping keeps track of the balances of a user's tokens available for withdrawal
     */
    mapping(address => mapping(address => uint256)) internal userBalances;

    /**
     * @dev This mapping keeps track of the balances of a workstream's tokens
     */
    mapping(uint256 => mapping(address => uint256)) internal workstreamBalances;

    /**
     * @dev This mapping keeps track of the URIs of the workstreams
     */
    mapping(uint256 => string) internal workstreamURIs;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /**
     * @dev This function initializes the contract and grants roles to the contract deployer
     * @notice This function init ERC1155, AccessControl, ERC1155Supply, UUPSUpgradeable
     * @notice This function grants DEFAULT_ADMIN_ROLE, URI_SETTER_ROLE, UPGRADER_ROLE to the contract deployer
     */
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

    /**
     * @dev This function returns the amount of FUX tokens committed by a user to a workstream
     * @param user The address of the user
     * @param workstreamID The ID of the workstream
     * @return fuxGiven The amount of FUX tokens committed by the user to the workstream
     */
    function getCommitment(address user, uint256 workstreamID) external view returns (uint256 fuxGiven) {
        fuxGiven = commitments[_userWorkstreamIndex(user, workstreamID)];
    }

    /**
     * @dev This function returns the evaluation submitted by a user for a workstream
     * @param user The address of the user
     * @param workstreamID The ID of the workstream
     * @return evaluation The Evaluation struct containing the user's evaluation
     */
    function getEvaluation(address user, uint256 workstreamID) external view returns (Evaluation memory evaluation) {
        evaluation = evaluations[_userWorkstreamIndex(user, workstreamID)];
    }

    /**
     * @dev This function returns the Workstream struct for a given workstream ID
     * @param workstreamID The ID of the workstream
     * @return workstream The Workstream struct for the given workstream ID
     */
    function getWorkstream(uint256 workstreamID) external view returns (Workstream memory workstream) {
        workstream = workstreams[workstreamID];
    }

    /**
     * @dev This function returns the available rewards for a user in a given token
     * @param user The address of the user
     * @param token The address of the token
     * @return availableRewards The amount of rewards available to the user in the given token
     */
    function getUserRewards(address user, address token) external view returns (uint256 availableRewards) {
        availableRewards = userBalances[user][token];
    }

    /**
     * @dev This function returns the available rewards for a workstream in a given token
     * @param workstreamID The ID of the workstream
     * @param token The address of the token
     * @return availableRewards The amount of rewards available to the workstream in the given token
     */
    function getWorkstreamRewards(uint256 workstreamID, address token)
        external
        view
        returns (uint256 availableRewards)
    {
        availableRewards = workstreamBalances[workstreamID][token];
    }

    /**
     * @dev Returns the state of the specified workstream as a string
     * @param workstreamID The ID of the workstream
     * @notice The returned string will be one of the following: "Started", "Evaluation", "Closed"
     * @return A string representing the state of the workstream
     */
    function readWorkstreamState(uint256 workstreamID) external view returns (string memory) {
        WorkstreamState temp = workstreams[workstreamID].state;
        if (temp == WorkstreamState.Started) return "Started";
        if (temp == WorkstreamState.Evaluation) return "Evaluation";
        if (temp == WorkstreamState.Closed) return "Closed";

        return "";
    }

    /**
     * @dev Returns the URI for a given token ID
     * @param tokenId The ID of the token
     * @return The URI for the given token ID
     */
    function uri(uint256 tokenId)
        public
        view
        override(ERC1155Upgradeable, ERC1155URIStorageUpgradeable)
        returns (string memory)
    {
        return ERC1155URIStorageUpgradeable.uri(tokenId);
    }

    /**
     * @dev Mints FUX tokens to the caller
     * @notice This function can only be called once per address
     * @dev Emits a FuxClaimed event upon successful minting
     * @dev Throws a TokensAlreadyMinted error if the caller has already minted FUX tokens
     */
    function mintFux() public {
        if (isFuxer[msg.sender]) revert TokensAlreadyMinted();

        isFuxer[msg.sender] = true;
        _mint(msg.sender, FUX_TOKEN_ID, 100, "");

        emit FuxClaimed(msg.sender);
    }

    /**
     * @dev Creates a new workstream and mints FUX tokens to the coordinator
     * @param name The name of the workstream
     * @param _contributors An array of addresses to add as contributors to the workstream
     * @param coordinatorCommitment The amount of FUX tokens the coordinator is committing to the workstream
     * @param deadline The deadline for the workstream
     * @param rewardsTokens An array of addresses representing the reward tokens for the workstream
     * @param rewards An array of reward amounts corresponding to the reward tokens
     * @param metadataUri The URI for the workstream metadata
     * @dev Emits a WorkstreamMinted event upon successful creation of the workstream
     * @dev Emits a ContributorsAdded event upon successful addition of contributors to the workstream
     * @dev Throws a NotAllowed error if the workstream is not in the Started state
     */
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

        setWorkstreamURI(workstreamID, metadataUri);

        emit ContributorsAdded(workstreamID, _contributors);
        emit WorkstreamMinted(workstreamID, deadline, rewardsTokens, rewards, metadataUri);
    }

    /**
     * @dev Adds contributors to a workstream
     * @param workstreamID The ID of the workstream
     * @param _contributors An array of addresses to add as contributors to the workstream
     * @notice This function can only be called by the coordinator of the workstream
     * @dev Emits a ContributorsAdded event upon successful addition of contributors to the workstream
     * @dev Throws a NotAllowed error if the workstream is not in the Started state
     */
    function addContributors(uint256 workstreamID, address[] calldata _contributors)
        external
        onlyCoordinator(workstreamID)
    {
        if (workstreams[workstreamID].state != WorkstreamState.Started) revert NotAllowed();

        _addContributors(workstreamID, _contributors);
        emit ContributorsAdded(workstreamID, _contributors);
    }

    /**
     * @dev Commits FUX tokens to a workstream
     * @param workstreamID The ID of the workstream
     * @param fuxGiven The amount of FUX tokens to commit
     * @notice This function can only be called by a contributor to the workstream
     * @dev Emits a FuxGiven event upon successful commitment of FUX tokens
     * @dev Throws a NotContributor error if the caller is not a contributor to the workstream
     * @dev Throws an InvalidInput error if the current commitment equals the new commitment
     */
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

    /**
     * @dev Submits an evaluation for a workstream
     * @param workstreamID The ID of the workstream
     * @param _contributors An array of addresses representing the contributors being evaluated
     * @param ratings An array of ratings corresponding to the contributors being evaluated
     * @notice This function can only be called by a contributor to the workstream
     * @dev Emits an EvaluationSubmitted event upon successful submission of an evaluation
     * @dev Throws a NotContributor error if the caller is not a contributor to the workstream
     * @dev Throws a NotAllowed error if the caller has not committed any FUX tokens to the workstream
     * @dev Throws an InvalidInput error if the length of the _contributors array does not match the length of the ratings array, or if the sum of the ratings is not equal to 100
     */
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

    /**
     * @dev Finalizes a workstream and distributes rewards to contributors
     * @param workstreamID The ID of the workstream
     * @param _contributors An array of addresses representing the contributors to the workstream
     * @param vFuxGiven An array of vFUX tokens to be distributed to the contributors
     * @notice This function can only be called by the coordinator of the workstream
     * @dev Emits a WorkstreamClosed event upon successful closure of the workstream
     * @dev Throws a NotAllowed error if the workstream does not exist or is not in the Closed state
     */
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

    /**
     * @dev Allows a user to claim their rewards for a given token
     * @param token The address of the token to claim rewards for
     * @notice This function can only be called by the user who earned the rewards
     * @dev Emits a RewardsClaimed event upon successful claiming of rewards
     */
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

    /**
     * @dev Adds contributors to a workstream
     * @param workstreamID The ID of the workstream
     * @param _contributors An array of addresses to add as contributors
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

    /**
     * @dev Creates a new workstream
     * @param name The name of the workstream
     * @param deadline The deadline for the workstream
     * @param rewardToken An array of addresses representing the reward tokens for the workstream
     * @param rewards An array of values representing the rewards for the workstream
     * @return The ID of the newly created workstream
     */
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

    /**
     * @dev Reserves funds for a workstream
     * @param _contributors An array of addresses representing the contributors to the workstream
     * @param _vFux An array of values representing the percentage of funds to allocate to each contributor
     * @param _rewardToken The address of the reward token for the workstream
     * @param _totalFunds The total amount of funds to reserve
     * @param _workstreamID The ID of the workstream
     */
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

    /**
     * @dev Returns FUX tokens to contributors
     * @param _contributors An array of addresses representing the contributors to the workstream
     * @param workstreamID The ID of the workstream
     */
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

    /**
     * @dev Pays out vFUX tokens to contributors
     * @param _contributors An array of addresses representing the contributors to the workstream
     * @param vFuxGiven An array of values representing the percentage of vFUX tokens to allocate to each contributor
     */
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

    /**
     * @dev Calculates the total value of an array of uint256 values
     * @param values An array of uint256 values
     * @return total The total value of the array
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

    /**
     * @dev Checks that the caller is not included in the list of contributors
     * @param _contributors An array of addresses representing the contributors to a workstream
     * @dev Throws a NotAllowed error if the caller is included in the list of contributors
     */
    function _noSelfFuxing(address[] memory _contributors) internal view {
        uint256 size = _contributors.length;
        for (uint256 i = 0; i < size;) {
            if (_contributors[i] == msg.sender) revert NotAllowed();
            unchecked {
                ++i;
            }
        }
    }

    /**
     * @dev Returns the index of a user's workstream
     * @param user The address of the user
     * @param workstreamID The ID of the workstream
     * @return index The index of the user's workstream
     */
    function _userWorkstreamIndex(address user, uint256 workstreamID) internal view returns (uint256 index) {
        index = userWorkstreamIndex[user][workstreamID];
    }

    /**
     * CONFIGURATION FUNCTIONS
     */

    /**
     * @dev Sets the URI for a token
     * @param tokenID The ID of the token
     * @param newuri The new URI for the token
     * @dev Throws an AccessControlError if the caller does not have the URI_SETTER_ROLE
     */
    function setURI(uint256 tokenID, string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(tokenID, newuri);
    }

    /**
     * @dev Sets the URI for a workstream.
     * @param workstreamID The ID of the workstream to update.
     * @param newuri The new URI for the workstream.
     */
    function setWorkstreamURI(uint256 workstreamID, string memory newuri) public onlyCoordinator(workstreamID) {
        workstreamURIs[workstreamID] = newuri;
        emit UpdatedWorkstreamURI(workstreamID, newuri);
    }

    /**
     * @dev Authorizes an upgrade to a new implementation contract
     * @param newImplementation The address of the new implementation contract
     * @dev Throws an AccessControlError if the caller does not have the UPGRADER_ROLE
     */

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}

    /**
     * BLOCK TRANSFER FUNCTIONS
     */

    /**
     * @dev Disallows the transfer of FUX tokens between users or other contracts
     * @notice _from_ The address of the sender
     * @notice _to_ The address of the recipient
     * @notice _id_ The ID of the token being transferred
     * @notice _amount_ The amount of tokens being transferred
     * @notice _data_ Additional data with no specified format
     * @dev Throws a NotAllowed error
     */
    function safeTransferFrom(
        address, /* from */
        address, /* to */
        uint256, /* id */
        uint256, /* amount */
        bytes memory /* data */
    ) public pure override {
        revert NotAllowed();
    }

    /**
     * @dev Disallows the batch transfer of FUX tokens between users or other contracts
     * @notice _from_ The address of the sender
     * @notice _to_ The address of the recipient
     * @notice _ids_ An array of IDs of the tokens being transferred
     * @notice _amounts_ An array of amounts of tokens being transferred
     * @notice _data_ Additional data with no specified format
     * @dev Throws a NotAllowed error
     */
    function safeBatchTransferFrom(
        address, /* from */
        address, /* to */
        uint256[] memory, /* ids */
        uint256[] memory, /* amounts */
        bytes memory /* data */
    ) public pure virtual override {
        revert NotAllowed();
    }

    /**
     * MODIFIERS
     */

    /**
     * @dev Throws a NotCoordinator error if the caller is not the coordinator of the specified workstream
     * @param workstreamID The ID of the workstream
     */
    modifier onlyCoordinator(uint256 workstreamID) {
        if (workstreams[workstreamID].creator != msg.sender) revert NotCoordinator();
        _;
    }

    /**
     * @dev Throws a NotAllowed error if the specified workstream is closed or does not exist
     * @param workstreamID The ID of the workstream
     */
    modifier isActiveWorkstream(uint256 workstreamID) {
        Workstream storage workstream = workstreams[workstreamID];
        if (workstream.state == WorkstreamState.Closed || !workstream.exists) revert NotAllowed();
        _;
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

    function onERC1155Received(
        address, /* _operator */
        address, /* _from */
        uint256, /* _id */
        uint256, /* _value */
        bytes calldata /* _data */
    ) external pure returns (bytes4) {
        return ERC1155_ACCEPTED;
    }

    function onERC1155BatchReceived(
        address, /* _operator */
        address, /* _from */
        uint256[] calldata, /* _ids */
        uint256[] calldata, /* _values */
        bytes calldata /* _data */
    ) external pure returns (bytes4) {
        return ERC1155_BATCH_ACCEPTED;
    }
}
