import { ethers } from "hardhat";

export const mineDays = async (amount: number) => {
  const currentBlock = await ethers.provider.getBlock(ethers.provider.getBlockNumber());
  await ethers.provider.send("evm_mine", [currentBlock.timestamp + 3600 * 24 * amount]);
  return await ethers.provider.getBlock(ethers.provider.getBlockNumber());
};

export const getDefaultSigners = async () => {
  const defaultSigners = await ethers.getSigners();
  return {
    deployer: defaultSigners[0],
    owner: defaultSigners[1],
    user: defaultSigners[2],
    anon: defaultSigners[3],
  };
};

export const getConstants = () => {
  const TOKENS = {
    FUX: {
      FUX_TOKEN_ID: 1,
      FUX_TOKEN_URI: "https://fuxdao.com/fux.json",
      FUX_TOKEN_NAME: "FUX",
      FUX_TOKEN_SYMBOL: "FUX",
    },
    VFUX: {
      VFUX_TOKEN_ID: 2,
      VFUX_TOKEN_URI: "https://fuxdao.com/vfux.json",
      VFUX_TOKEN_NAME: "vFUX",
      VFUX_TOKEN_SYMBOL: "vFUX",
    },
  } as const;

  return { TOKENS };
};
