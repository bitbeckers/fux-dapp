// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {WorkstreamFactory} from "./WorkstreamFactory.sol";

contract WorkstreamNFT is ERC721 {
    address public erc6551Reg;
    address public erc6551Imp;
    address public workstreamFactory;
    address public workstreamImplementation;
    mapping(uint256 => Workstream) public workstreams;

    struct Workstream {
        uint256 coordinationStrategy;
        uint256 commitmentStrategy;
        uint256 fundingStrategy;
        uint256 evaluationStrategy;
    }

    event AccountCreated(address indexed account, address indexed cookieJar, uint256 tokenId);

    constructor(address _erc6551Reg, address _erc6551Imp, address _workstreamFactory, address _workstreamImplementation)
        ERC721("WorkstreamNFT", "WSNFT")
    {
        erc6551Reg = _erc6551Reg;
        erc6551Imp = _erc6551Imp;
        workstreamFactory = _workstreamFactory;
        workstreamImplementation = _workstreamImplementation;
    }

    function mint(address to, uint256 tokenId)
        public
        payable
        returns (address account, address workstreamAccount, uint256 tokenId)
    {
        return _workstreamMint(to, tokenId);
    }

    function _workstreamMint(
        address to,
        uint256 coordinationStrategy,
        uint256 commitmentStrategy,
        uint256 fundingStrategy,
        uint256 evaluationStrategy
    ) internal payable returns (address account, address workstream, uint256 tokenId) {
        _tokenIdCounter.increment();
        tokenId = _tokenIdCounter.current();

        account =
            IRegistry(erc6551Reg).createAccount(erc6551Imp, block.chainid, address(this), tokenId, block.timestamp, "");
        bytes memory initializerParams =
            abi.encode(account, coordinationStrategy, commitmentStrategy, fundingStrategy, evaluationStrategy);
        bytes memory initializer = abi.encodeWithSignature("setUp(bytes)", initializerParams);

        uint256 saltNonce = 1_234_567_890; // hard code saltNonce for now

        workstream =
            WorkstreamFactory(workstreamFactory).createWorkstream(workstreamImplementation, initializer, saltNonce);

        AccountERC6551(payable(account)).setExecutorInit(workstream);

        workstreams[tokenId] = Workstream(coordinationStrategy, commitmentStrategy, fundingStrategy, evaluationStrategy);

        _mint(to, tokenId);

        emit AccountCreated(account, workstream, tokenId);
    }

    function getWorkstream(uint256 tokenId) public view returns (Workstream memory) {
        return workstreams[tokenId];
    }

    /* Returns the json data associated with this token ID
     * param _tokenId the token ID
     */
    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");
        return string(_constructTokenURI(_tokenId));
    }

    function burn(uint256 _tokenId) public {
        require(_isApprovedOrOwner(_msgSender(), _tokenId), "ERC721: caller is not token owner or approved");
        _burn(_tokenId);
    }
}
