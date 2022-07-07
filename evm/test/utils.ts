import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { ethers } from "hardhat";

const mineDays = async (amount: number) => {
  const currentBlock = await ethers.provider.getBlock(ethers.provider.getBlockNumber());
  await ethers.provider.send("evm_mine", [currentBlock.timestamp + 3600 * 24 * amount]);
  return await ethers.provider.getBlock(ethers.provider.getBlockNumber());
};

const checkStakingRewards = async (staking: Contract, address: string, rewardAmount: string, margin = 1) => {
  expect(Number(ethers.utils.formatEther(await staking.getStakingReward(address))).toFixed()).to.be.closeTo(
    BigNumber.from(rewardAmount),
    margin,
  );
};

export { mineDays, checkStakingRewards };
