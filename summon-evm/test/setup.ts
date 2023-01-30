import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";

import { getDefaultSigners } from "./utils";

const buildFixture = async () => {
  const { deployer, owner, user } = await getDefaultSigners();

  // Contract factory
  const fuxFactory = await ethers.getContractFactory("FUX");
  // Contracts
  const fux = await fuxFactory.connect(owner).deploy();

  // Struct
  return {
    fux,
    deployer,
    owner,
    user,
  };
};

export const setupTest = async () => {
  return await loadFixture(buildFixture);
};
