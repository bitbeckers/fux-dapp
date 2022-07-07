import { deployments } from "hardhat";

const setupTest = deployments.createFixture(async ({ deployments, getNamedAccounts, ethers }) => {
  await deployments.fixture(); // ensure you start from a fresh deployments
  const { deployer, owner, user } = await getNamedAccounts();

  // Contracts
  const token = await ethers.getContract("ERC20_Token");
  const nft = await ethers.getContract("ERC721_NFT");
  const staking = await ethers.getContract("Staking_Pool");
  
  const rewardTokenAddress = await staking.rewardToken();
  const rewardToken = await ethers.getContractAt("ERC20_Token", rewardTokenAddress);

  // Account config
  const setupAddress = async (address: string) => {
    return {
      address: address,
      token: await ethers.getContract("ERC20_Token", address),
      nft: await ethers.getContract("ERC721_NFT", address),
      staking: await ethers.getContract("Staking_Pool", address),
    };
  };

  // Balances
  const tokenWithOwner = await ethers.getContract("ERC20_Token", owner);
  await tokenWithOwner.mint(user, ethers.utils.parseEther("10000"));
  await tokenWithOwner.mint(owner, ethers.utils.parseEther("10000"));

  // Struct
  return {
    token,
    nft,
    staking,
    rewardToken,
    deployer: await setupAddress(deployer),
    owner: await setupAddress(owner),
    user: await setupAddress(user),
  };
});

export default setupTest;
