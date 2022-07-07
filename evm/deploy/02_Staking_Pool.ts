import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre; // we get the deployments and getNamedAccounts which are provided by hardhat-deploy.
  const { deploy } = deployments; // The deployments field itself contains the deploy function.

  const { deployer, owner } = await getNamedAccounts(); // Fetch the accounts. These can be configured in hardhat.config.ts as explained above.

  await deployments.get("ERC20_Token");

  const token = await ethers.getContract("ERC20_Token");

  //args [address owner, address _stakeToken]
  await deploy("Staking_Pool", {
    from: deployer,
    args: [owner, token.address],
    log: true,
  });
};

export default deploy;
deploy.tags = ["local", "staging"];
