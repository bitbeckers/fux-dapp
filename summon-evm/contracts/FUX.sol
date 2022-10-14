// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Receiver.sol";

import "hardhat/console.sol";

error NonTransferableFux();
error NotContributor();
error NotEnoughFux();
error NotEnoughVFux();
error TokensAlreadyMinted();
error EvaluationAlreadySubmitted();
error NonExistentWorkstream();
error NotApprovedOrOwner();
error InvalidInput(string inputVar);

contract FUX is ERC1155, ERC1155Supply, ERC1155URIStorage, ERC1155Receiver, AccessControl {
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 public constant FUX_TOKEN_ID = 0;
    uint256 public constant VFUX_TOKEN_ID = 1;
    uint256 internal counter = 0;

    bytes4 internal constant ERC1155_ACCEPTED = 0xf23a6e61;
    bytes4 internal constant ERC1155_BATCH_ACCEPTED = 0xbc197c81;

    event FuxClaimed(address user);
    event VFuxClaimed(address user, uint256 workstreamID);
    event FuxGiven(address user, uint256 workstreamId, uint256 amount);
    event FuxWithdraw(address user, uint256 workstreamId, uint256 amount);

    event WorkstreamMinted(uint256 id, string metadataUri);
    event ContributorsAdded(uint256 id, address[] contributors);

    event EvaluationSubmitted(uint256 workstreamID, address contributor);
    event EvaluationResolved(uint256 workstreamID);

    struct Workstream {
        string name;
        address creator;
        address[] contributors;
        uint256[] evaluations;
        uint256 deadline;
        bool exists;
    }

    struct Evaluation {
        address[] contributors;
        uint8[] ratings;
        bool exists;
    }

    mapping(uint256 => Workstream) internal workstreams;
    mapping(address => uint256[]) internal contributorWorkstreams; //TODO find, replace, pop to keep updated
    mapping(address => mapping(uint256 => uint8)) internal contributorCommitments;
    mapping(address => mapping(uint256 => Evaluation)) internal valueEvaluations;
    mapping(address => mapping(uint256 => uint8)) internal vFuxAvailable;
    mapping(address => bool) internal isFuxer;
    mapping(address => mapping(uint256 => bool)) internal isContributor;

    constructor() ERC1155("") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(URI_SETTER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function uri(uint256 tokenId) public view override(ERC1155, ERC1155URIStorage) returns (string memory) {
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

    function getVFuxForEvaluation(uint256 workstreamID) public view returns (uint8 vFux) {
        vFux = vFuxAvailable[msg.sender][workstreamID];
    }

    function mintFux() public {
        if (isFuxer[msg.sender]) revert TokensAlreadyMinted();
        _mint(msg.sender, FUX_TOKEN_ID, 100, "");
        emit FuxClaimed(msg.sender);
        isFuxer[msg.sender] = true;
    }

    function mintVFux(uint256 workstreamID) public {
        if (!_isContributor(msg.sender, workstreamID)) revert NotContributor();
        if (vFuxAvailable[msg.sender][workstreamID] > 0) revert TokensAlreadyMinted();
        if (getWorkstreamCommitment(msg.sender, workstreamID) == 0) revert NotEnoughFux();
        if (getValueEvaluation(msg.sender, workstreamID).exists) revert EvaluationAlreadySubmitted();

        _mint(msg.sender, VFUX_TOKEN_ID, 100, "");
        vFuxAvailable[msg.sender][workstreamID] = uint8(100);
        emit VFuxClaimed(msg.sender, workstreamID);
    }

    function mintWorkstream(
        string memory name,
        address[] calldata contributors,
        uint256 deadline
    ) public {
        if (contributors.length == 0) revert InvalidInput("contributors");
        uint256 workstreamID = counter;
        Workstream memory _workstream;
        _workstream.name = name;
        _workstream.creator = msg.sender;
        _workstream.deadline = deadline;
        _workstream.contributors = new address[](0);
        _workstream.exists = true;
        workstreams[workstreamID] = _workstream;

        addContributors(workstreamID, contributors);

        emit WorkstreamMinted(workstreamID, "http://example.com");
        counter = counter + 1;
    }

    //TODO more efficient state changes
    function addContributors(uint256 workstreamId, address[] calldata contributors) public {
        if (!workstreams[workstreamId].exists) revert NonExistentWorkstream();
        if (workstreams[workstreamId].creator != msg.sender) revert NotApprovedOrOwner();
        uint256 contributorsLength = contributors.length;
        for (uint256 i = 0; i < contributorsLength; i++) {
            address contributor = contributors[i];
            contributorWorkstreams[contributor].push(workstreamId);
            workstreams[workstreamId].contributors.push(contributor);
            isContributor[contributor][workstreamId] = true;
        }
        emit ContributorsAdded(workstreamId, contributors);
    }

    function commitToWorkstream(uint256 workstreamID, uint8 fuxGiven) public {
        if (balanceOf(msg.sender, FUX_TOKEN_ID) < fuxGiven) revert NotEnoughFux();
        if (!_isContributor(msg.sender, workstreamID)) revert NotContributor();
        uint8 currentFux = contributorCommitments[msg.sender][workstreamID];

        require(currentFux != fuxGiven, "Same amount of FUX");

        if (currentFux < fuxGiven) {
            _safeTransferFrom(msg.sender, address(this), FUX_TOKEN_ID, fuxGiven - currentFux, "");
        }
        if (currentFux > fuxGiven) {
            _safeTransferFrom(address(this), msg.sender, FUX_TOKEN_ID, currentFux - fuxGiven, "");
        }

        contributorCommitments[msg.sender][workstreamID] = fuxGiven;
        emit FuxGiven(msg.sender, workstreamID, fuxGiven);
    }

    function withdrawFromWorkstream(uint256 workstreamID) public {
        if (!_isContributor(msg.sender, workstreamID)) revert NotContributor();

        uint256 fuxGiven = contributorCommitments[msg.sender][workstreamID];
        if (fuxGiven == 0) revert NotEnoughFux();
        contributorCommitments[msg.sender][workstreamID] = 0;
        _safeTransferFrom(address(this), msg.sender, FUX_TOKEN_ID, fuxGiven, "");
        emit FuxWithdraw(msg.sender, workstreamID, fuxGiven);
    }

    function submitValueEvaluation(
        uint256 workstreamID,
        address[] memory contributors,
        uint8[] memory vFuxGiven
    ) public {
        if (!_isContributor(msg.sender, workstreamID)) revert NotContributor();
        if (getWorkstreamCommitment(msg.sender, workstreamID) == 0) revert NotEnoughFux();
        if (getVFuxForEvaluation(workstreamID) == 0) revert NotEnoughVFux();
        if (contributors.length == 0 || contributors.length != vFuxGiven.length)
            revert InvalidInput("contributors, vFuxGiven");
        _noSelfFuxing(contributors);

        _depositAllVFux(vFuxGiven, workstreamID);

        valueEvaluations[msg.sender][workstreamID] = Evaluation(contributors, vFuxGiven, true);

        emit EvaluationSubmitted(0, msg.sender);
    }

    function resolveValueEvaluation(
        uint256 workstreamID,
        address[] memory contributors,
        uint8[] memory vFuxGiven
    ) public {
        Workstream storage workstream = workstreams[workstreamID];
        if (!workstream.exists) revert NonExistentWorkstream();
        if (msg.sender != workstream.creator) revert NotApprovedOrOwner();
        if (getWorkstreamCommitment(msg.sender, workstreamID) == 0) revert NotEnoughFux();
        if (getVFuxForEvaluation(workstreamID) == 0) revert NotEnoughVFux();
        if (contributors.length == 0 || contributors.length != vFuxGiven.length)
            revert InvalidInput("contributors, vFuxGiven");

        valueEvaluations[msg.sender][workstreamID] = Evaluation(contributors, vFuxGiven, true);

        _payVFux(contributors, vFuxGiven, workstreamID);

        emit EvaluationResolved(0);
        workstream.exists = false;
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

    function _noSelfFuxing(address[] memory contributors) internal view {
        uint256 size = contributors.length;
        for (uint256 i = 0; i < size; i++) {
            if (contributors[i] == msg.sender) revert InvalidInput("sender is contributor");
        }
    }

    function _depositAllVFux(uint8[] memory vFuxGiven, uint256 workstreamID) internal {
        uint256 size = vFuxGiven.length;
        uint8 total = 0;
        for (uint256 i = 0; i < size; i++) {
            total += vFuxGiven[i];
        }

        if (total != vFuxAvailable[msg.sender][workstreamID]) revert NotEnoughFux();
        _safeTransferFrom(msg.sender, address(this), VFUX_TOKEN_ID, 100, "");
    }

    function _payVFux(
        address[] memory contributors,
        uint8[] memory vFuxGiven,
        uint256 workstreamID
    ) internal {
        uint256 size = vFuxGiven.length;
        uint8 total = 0;
        for (uint256 i = 0; i < size; i++) {
            total += vFuxGiven[i];
            _safeTransferFrom(msg.sender, contributors[i], VFUX_TOKEN_ID, vFuxGiven[i], "");
        }

        if (total != vFuxAvailable[msg.sender][workstreamID]) revert NotEnoughFux();
    }

    function _isContributor(address contributor, uint256 workstreamID) internal view returns (bool) {
        return isContributor[contributor][workstreamID];
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, ERC1155Receiver, AccessControl)
        returns (bool)
    {
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
