import { ethers, upgrades } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre;
  const { save, get } = deployments;

  try {
    const exists = await get("FUX");
    if (exists && hre.network.name !== "hardhat") {
      console.log("Already deployed FUX");
    }
  } catch {
    const FUX = await ethers.getContractFactory("FUX");
    const proxy = await upgrades.deployProxy(FUX, {
      kind: "uups",
    });
    console.log("Deployed FUX + Proxy: " + proxy.address);

    const artifact = await deployments.getExtendedArtifact("FUX");
    const proxyDeployments = {
      address: proxy.address,
      ...artifact,
    };

    await save("FUX", proxyDeployments);
  }
};

export default deploy;
deploy.tags = ["local", "staging"];
