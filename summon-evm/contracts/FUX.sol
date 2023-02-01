// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155ReceiverUpgradeable.sol";

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import "hardhat/console.sol";

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
    event FuxWithdraw(address user, uint256 workstreamId, uint256 amount);

    event WorkstreamMinted(uint256 id, uint256 funds, uint256 deadline, string metadataUri);
    event ContributorsAdded(uint256 id, address[] contributors);

    event EvaluationSubmitted(uint256 workstreamID, address creator, address[] contributors, uint256[] ratings);
    event WorkstreamClosed(uint256 workstreamID);

    event RewardsReserved(address user, uint256 amount);
    event RewardsClaimed(address user, uint256 amount);

    struct Workstream {
        string name;
        address creator;
        address[] contributors;
        uint256[] evaluations;
        uint256 deadline;
        uint256 funds;
        bool exists;
    }

    struct Evaluation {
        address[] contributors;
        uint256[] ratings;
        bool exists;
    }

    mapping(uint256 => Workstream) internal workstreams;
    mapping(address => uint256[]) internal contributorWorkstreams; //TODO find, replace, pop to keep updated
    mapping(address => mapping(uint256 => uint256)) internal contributorCommitments;
    mapping(address => mapping(uint256 => Evaluation)) internal valueEvaluations;
    mapping(address => mapping(uint256 => uint256)) internal vFuxAvailableForWorkstream;
    mapping(address => bool) internal isFuxer;
    mapping(address => mapping(uint256 => bool)) internal isContributor;
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

    function uri(
        uint256 tokenId
    ) public view override(ERC1155Upgradeable, ERC1155URIStorageUpgradeable) returns (string memory) {
        return super.uri(tokenId);
    }

    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    function getWorkstreamIDs(address user) public view returns (uint256[] memory ids) {
        ids = contributorWorkstreams[user];
    }

    function getWorkstreamByID(uint256 workstreamID) public view returns (Workstream memory workstream) {
        workstream = workstreams[workstreamID];
    }

    function getWorkstreamCommitment(address user, uint256 workstreamID) public view returns (uint256 fuxGiven) {
        fuxGiven = contributorCommitments[user][workstreamID];
    }

    function getValueEvaluation(address user, uint256 workstreamID) public view returns (Evaluation memory evaluation) {
        evaluation = valueEvaluations[user][workstreamID];
    }

    function getVFuxForEvaluation(uint256 workstreamID) public view returns (uint256 vFux) {
        vFux = vFuxAvailableForWorkstream[msg.sender][workstreamID];
    }

    function getAvailableBalance(address account) public view returns (uint256 balance) {
        balance = balances[account];
    }

    function mintFux() public {
        if (isFuxer[msg.sender]) revert TokensAlreadyMinted();
        _mint(msg.sender, FUX_TOKEN_ID, 100, "");
        emit FuxClaimed(msg.sender);
        isFuxer[msg.sender] = true;
    }

    function mintVFux(uint256 workstreamID) public {
        if (!_isCoordinator(workstreamID)) revert NotCoordinator();
        if (vFuxAvailableForWorkstream[msg.sender][workstreamID] > 0) revert TokensAlreadyMinted();
        if (getWorkstreamCommitment(msg.sender, workstreamID) == 0) revert NotEnoughFux();
        if (!workstreams[workstreamID].exists) revert NonExistentWorkstream();

        _mint(msg.sender, VFUX_TOKEN_ID, 100, "");
        vFuxAvailableForWorkstream[msg.sender][workstreamID] = uint8(100);
        emit VFuxClaimed(msg.sender, workstreamID);
    }

    function mintWorkstream(
        string memory name,
        address[] calldata contributors,
        uint256 selfFux,
        uint256 deadline
    ) public payable {
        counter += 1;
        uint256 workstreamID = counter;
        Workstream memory _workstream;
        _workstream.name = name;
        _workstream.creator = msg.sender;
        _workstream.deadline = deadline;
        _workstream.exists = true;
        _workstream.funds = msg.value;

        uint256 contributorsLength = contributors.length;
        _workstream.contributors = new address[](contributorsLength);

        for (uint256 i = 0; i < contributorsLength; i++) {
            address contributor = contributors[i];

            //TODO triple accounting?
            isContributor[contributor][workstreamID] = true;
            contributorWorkstreams[contributor].push(workstreamID);
            _workstream.contributors[i] = (contributor);
        }

        emit ContributorsAdded(workstreamID, contributors);

        contributorCommitments[msg.sender][workstreamID] = selfFux;
        workstreams[workstreamID] = _workstream;

        contributorCommitments[msg.sender][workstreamID] = selfFux;
        _safeTransferFrom(msg.sender, address(this), FUX_TOKEN_ID, selfFux, "");
        emit WorkstreamMinted(workstreamID, msg.value, deadline, "");
    }

    //TODO more efficient state changes
    function addContributors(uint256 workstreamId, address[] calldata contributors) public {
        Workstream storage workstream = workstreams[workstreamId];
        if (!workstream.exists) revert NonExistentWorkstream();
        if (workstream.creator != msg.sender) revert NotApprovedOrOwner();
        uint256 contributorsLength = contributors.length;
        for (uint256 i = 0; i < contributorsLength; i++) {
            address contributor = contributors[i];
            contributorWorkstreams[contributor].push(workstreamId);
            workstream.contributors.push(contributor);
            isContributor[contributor][workstreamId] = true;
        }
        emit ContributorsAdded(workstreamId, contributors);
    }

    function commitToWorkstream(uint256 workstreamID, uint256 fuxGiven) public {
        //TODO balanceOf should check the delta
        if (fuxGiven == 0) revert NotEnoughFux();
        if (!_isContributor(msg.sender, workstreamID)) revert NotContributor();
        uint256 currentFux = contributorCommitments[msg.sender][workstreamID];

        require(currentFux != fuxGiven, "Same amount of FUX");

        contributorCommitments[msg.sender][workstreamID] = fuxGiven;

        if (currentFux < fuxGiven) {
            _safeTransferFrom(msg.sender, address(this), FUX_TOKEN_ID, fuxGiven - currentFux, "");
        }
        if (currentFux > fuxGiven) {
            _safeTransferFrom(address(this), msg.sender, FUX_TOKEN_ID, currentFux - fuxGiven, "");
        }

        emit FuxGiven(msg.sender, workstreamID, fuxGiven);
    }

    function withdrawFromWorkstream(uint256 workstreamID) public {
        if (!_isContributor(msg.sender, workstreamID)) revert NotContributor();

        _withdrawFux(workstreamID);
    }

    function submitValueEvaluation(
        uint256 workstreamID,
        address[] memory contributors,
        uint256[] memory ratings
    ) public {
        if (!_isContributor(msg.sender, workstreamID) || !_isCoordinator(workstreamID)) revert NotApprovedOrOwner();
        if (getWorkstreamCommitment(msg.sender, workstreamID) == 0) revert NotEnoughFux();
        if (contributors.length == 0 || contributors.length != ratings.length)
            revert InvalidInput("contributors, vFuxGiven");

        _submitEvaluations(workstreamID, contributors, ratings);
    }

    function resolveValueEvaluation(
        uint256 workstreamID,
        address[] memory contributors,
        uint256[] memory vFuxGiven
    ) public {
        Workstream storage workstream = workstreams[workstreamID];
        if (!workstream.exists) revert NonExistentWorkstream();
        if (!_isCoordinator(workstreamID)) revert NotCoordinator();
        if (getWorkstreamCommitment(msg.sender, workstreamID) == 0) revert NotEnoughFux();
        if (getVFuxForEvaluation(workstreamID) == 0) revert NotEnoughVFux();

        _submitEvaluations(workstreamID, contributors, vFuxGiven);

        _payVFux(contributors, vFuxGiven, workstreamID);

        uint256 funds = workstream.funds;
        if (funds > 0) {
            workstream.funds = 0;
            _reserveFunds(contributors, vFuxGiven, funds);
        }
        _returnFux(contributors, workstreamID);
        _withdrawFux(workstreamID);

        workstream.exists = false;
        emit WorkstreamClosed(workstreamID);
    }

    function resolveSoloWorkstream(uint256 workstreamID) public {
        Workstream storage workstream = workstreams[workstreamID];
        if (!workstream.exists) revert NonExistentWorkstream();
        if (!_isCoordinator(workstreamID)) revert NotCoordinator();
        if (getWorkstreamCommitment(msg.sender, workstreamID) == 0) revert NotEnoughFux();

        if (workstream.contributors.length != 1) revert InvalidInput("Not solo");

        uint256 funds = workstream.funds;

        if (funds > 0) {
            workstream.funds = 0;
            balances[msg.sender] += workstream.funds;
            emit RewardsReserved(workstream.creator, funds);
        }

        _withdrawFux(workstreamID);

        workstream.exists = false;
        emit WorkstreamClosed(workstreamID);
    }

    function _withdrawFux(uint256 workstreamID) internal {
        uint256 commitment = contributorCommitments[msg.sender][workstreamID];
        if (commitment == 0) revert NotEnoughFux();
        contributorCommitments[msg.sender][workstreamID] = 0;
        _safeTransferFrom(address(this), msg.sender, FUX_TOKEN_ID, commitment, "");
        emit FuxWithdraw(msg.sender, workstreamID, commitment);
    }

    function _submitEvaluations(
        uint256 workstreamID,
        address[] memory contributors,
        uint256[] memory ratings
    ) internal {
        if (_getTotal(ratings) != 100) revert InvalidInput("ratings != 100");
        _noSelfFuxing(contributors);

        if (contributors.length == 0 || contributors.length != ratings.length)
            revert InvalidInput("contributors, ratings");

        valueEvaluations[msg.sender][workstreamID] = Evaluation(contributors, ratings, true);

        emit EvaluationSubmitted(workstreamID, msg.sender, contributors, ratings);
    }

    function _noSelfFuxing(address[] memory contributors) internal view {
        uint256 size = contributors.length;
        for (uint256 i = 0; i < size; i++) {
            if (contributors[i] == msg.sender) revert InvalidInput("sender is contributor");
        }
    }

    function _payVFux(address[] memory contributors, uint256[] memory vFuxGiven, uint256 workstreamID) internal {
        uint256 total = _getTotal(vFuxGiven);

        if (total != 100 || total != vFuxAvailableForWorkstream[msg.sender][workstreamID]) revert NotEnoughVFux();
        uint256 size = vFuxGiven.length;

        for (uint256 i = 0; i < size; ++i) {
            _safeTransferFrom(msg.sender, contributors[i], VFUX_TOKEN_ID, vFuxGiven[i], "");
        }
    }

    function _returnFux(address[] memory contributors, uint256 workstreamID) internal {
        uint256 size = contributors.length;
        for (uint256 i = 0; i < size; i++) {
            address contributor = contributors[i];
            uint256 commitment = contributorCommitments[contributor][workstreamID];
            contributorCommitments[contributor][workstreamID] = 0;

            _safeTransferFrom(address(this), contributor, FUX_TOKEN_ID, commitment, "");
        }
    }

    function _reserveFunds(address[] memory contributors, uint256[] memory vFuxGiven, uint256 balance) internal {
        uint256 size = vFuxGiven.length;
        uint256 total = 0;
        for (uint256 i = 0; i < size; ++i) {
            uint256 portion = (vFuxGiven[i] * balance) / 100;
            total += portion;
            balances[contributors[i]] += portion;
            emit RewardsReserved(contributors[i], portion);
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

    function _isContributor(address contributor, uint256 workstreamID) internal view returns (bool) {
        return isContributor[contributor][workstreamID];
    }

    function _isCoordinator(uint256 workstreamID) internal view returns (bool) {
        return workstreams[workstreamID].creator == msg.sender;
    }

    function _getTotal(uint256[] memory values) internal pure returns (uint256 total) {
        uint256 len = values.length;
        for (uint256 i = 0; i < len; i++) {
            total += values[i];
        }
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public pure override {
        revert NonTransferableFux();
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public pure virtual override {
        revert NonTransferableFux();
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

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC1155Upgradeable, ERC1155ReceiverUpgradeable, AccessControlUpgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function onERC1155Received(
        address _operator,
        address _from,
        uint256 _id,
        uint256 _value,
        bytes calldata _data
    ) external pure returns (bytes4) {
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
}
