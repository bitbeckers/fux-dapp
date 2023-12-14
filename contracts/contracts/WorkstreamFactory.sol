// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {ModuleProxyFactory} from "@gnosis.pm/zodiac/contracts/factory/ModuleProxyFactory.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";

import {WorkstreamCore} from "./WorkstreamCore.sol";

contract WorkstreamFactory is Ownable {
    ModuleProxyFactory internal moduleProxyFactory;

    event CreateWorkstream(address workstreamAccount, bytes initializer, string details, string uid);

    /*solhint-disable no-empty-blocks*/
    constructor() {}

    // must be called after deploy to set libraries
    function setProxyFactory(address _moduleProxyFactory) public onlyOwner {
        moduleProxyFactory = ModuleProxyFactory(_moduleProxyFactory);
    }

    /**
     * @dev Deploys a new CookieJar contract using the specified singleton contract and initializer code.
     * @param _singleton The address of the singleton contract to use for the new CookieJar contract.
     * @param _initializer The initialization code for the new CookieJar contract.
     * @param _details A string describing the details of the new CookieJar contract.
     * @param _saltNonce A nonce to use for the salt in the module proxy factory.
     * @return address of the new CookieJar contract.
     */
    function createWorkstream(address _singleton, bytes memory _initializer, uint256 _saltNonce)
        public
        payable
        returns (address)
    {
        WorkstreamCore workstream =
            WorkstreamCore(moduleProxyFactory.deployModule(_singleton, _initializer, _saltNonce));

        emit CreateWorkstream(address(workstream), _initializer, uid);
        return address(workstream);
    }
}
