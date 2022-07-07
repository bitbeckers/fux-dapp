import { expect } from "chai";
import { ethers } from "hardhat";

import setupTest from "../setup";
import { shouldBehaveLikeStakingPoolRewards } from "./staking_pool.rewards";
import { shouldBehaveLikeStakingPoolRBAC } from "./staking_pool.roles";

describe("Unit tests", function () {
  describe("Staking pool", function () {
    it("is a basic staking pool", async () => {
      const { staking, token } = await setupTest();
      expect(await staking.stakeToken()).to.be.eq(token.address);
      expect(await staking.rewardToken()).to.be.properAddress;
      expect(await staking.rewardRate()).to.be.eq(ethers.utils.parseEther("1"));
    });

    shouldBehaveLikeStakingPoolRBAC();
    shouldBehaveLikeStakingPoolRewards();
  });
});
