import { ethers, upgrades } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre; // we get the deployments and getNamedAccounts which are provided by hardhat-deploy.
  const { save, get } = deployments; // The deployments field itself contains the deploy function.

  const oldFUX = await get("FUX");
  const newFUX = await ethers.getContractFactory("FUX");
  const updatedFUX = await upgrades.upgradeProxy(oldFUX.address, newFUX);

  const artifact = await deployments.getExtendedArtifact("FUX");
  const proxyDeployments = {
    address: updatedFUX.address,
    ...artifact,
  };

  await save("FUX", proxyDeployments);
  console.log("Updated FUX");
};

export default deploy;
deploy.tags = ["local", "staging"];
