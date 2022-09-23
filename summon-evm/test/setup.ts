import { deployments } from "hardhat";

const setupTest = deployments.createFixture(async ({ deployments, getNamedAccounts, ethers }) => {
  await deployments.fixture(); // ensure you start from a fresh deployments
  const { deployer, owner, user } = await getNamedAccounts();

  // Contracts
  const fux = await ethers.getContract("FUX");

  // Account config
  const setupAddress = async (address: string) => {
    return {
      address,
      fux: await ethers.getContract("FUX", address)
    };
  };

  // Struct
  return {
    fux,
    deployer: await setupAddress(deployer),
    owner: await setupAddress(owner),
    user: await setupAddress(user),
  };
});

export default setupTest;
