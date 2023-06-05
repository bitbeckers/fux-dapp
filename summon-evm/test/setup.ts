import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";

import { getDefaultSigners } from "./utils";

const buildFixture = async () => {
  const { deployer, owner, user, anon } = await getDefaultSigners();

  // Contract factory
  const fuxFactory = await ethers.getContractFactory("FUX");
  // Contracts
  const fux = await fuxFactory.connect(deployer).deploy();

  // Struct
  return {
    fux,
    deployer,
    owner,
    user,
    anon,
  };
};

export const setupTest = async () => {
  return await loadFixture(buildFixture);
};
