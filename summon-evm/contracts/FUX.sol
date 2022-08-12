// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";

contract FUX is ERC1155, AccessControl, ERC1155Supply, ERC1155URIStorage {
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 public constant FUX_TOKEN_ID = 0;

    event WorkstreamMinted(uint256 id, string metadataUri);
    event ContributorAdded(uint256 id, address contributor);

    struct Workstream {
        address creator;
        string name;
        bool exists;
    }

    mapping(uint256 => Workstream) public workstreams;
    mapping(uint256 => address[]) public contributors;

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

    function mintFux() public {
        require(balanceOf(msg.sender, FUX_TOKEN_ID) == 0, "Already got your FUX");
        _mint(msg.sender, FUX_TOKEN_ID, 100, "");
    }

    function mintWorkstream(
        uint256 id,
        string memory name,
        string memory metadataUri
    ) public {
        require(workstreams[id].exists == false, "Workstream exists for given ID");
        _setURI(id, metadataUri);
        _mint(msg.sender, id, 1, "");
        workstreams[id] = Workstream(msg.sender, name, true);
        contributors[id].push(msg.sender);
        emit WorkstreamMinted(id, metadataUri);
        emit ContributorAdded(id, msg.sender);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        string memory uri,
        bytes memory data
    ) public onlyRole(MINTER_ROLE) {
        _mintBatch(to, ids, amounts, data);
    }

    function addContributor(uint256 workstreamId, address contributor) public {
        require(workstreams[workstreamId].exists, "Workstream does not exists");
        require(workstreams[workstreamId].creator == msg.sender, "msg.sender is not the creator");

        contributors[workstreamId].push(contributor);
        emit ContributorAdded(workstreamId, contributor);
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

    function supportsInterface(bytes4 interfaceId) public view override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
