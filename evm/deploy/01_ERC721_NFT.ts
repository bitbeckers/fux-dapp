import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre; // we get the deployments and getNamedAccounts which are provided by hardhat-deploy.
  const { deploy } = deployments; // The deployments field itself contains the deploy function.

  const { deployer, owner } = await getNamedAccounts(); // Fetch the accounts. These can be configured in hardhat.config.ts as explained above.

  //address _owner,
  //uint256 totalCap
  await deploy("ERC721_NFT", {
    from: deployer,
    args: [owner, "https://gateway.pinata.cloud/ipfs/QmaUK792RLARk4y3yZww1tnvu5GGAXdVqKYVr76dwrHVfp/"],
    log: true,
  });
};

export default deploy;
deploy.tags = ["local", "staging"];
