import { ethers } from "hardhat";

export const mineDays = async (amount: number) => {
  const currentBlock = await ethers.provider.getBlock(ethers.provider.getBlockNumber());
  await ethers.provider.send("evm_mine", [currentBlock.timestamp + 3600 * 24 * amount]);
  return await ethers.provider.getBlock(ethers.provider.getBlockNumber());
};
