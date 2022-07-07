import { expect } from "chai";
import { BigNumber, utils } from "ethers/lib/ethers";
import { ethers } from "hardhat";

import setupTest from "../setup";
import { checkStakingRewards, mineDays } from "../utils";

export function shouldBehaveLikeStakingPoolRewards(): void {
  describe("Staking rewards", function () {
    it("Can calculate and pay out user rewards", async function () {
      const { staking, user, token, rewardToken } = await setupTest();

      const stakeAmount = utils.parseEther("1000");

      // Approve
      await expect(user.token.approve(staking.address, stakeAmount))
        .to.emit(token, "Approval")
        .withArgs(user.address, staking.address, stakeAmount);

      // Stake
      await expect(user.staking.stake(stakeAmount)).to.emit(staking, "Staked").withArgs(user.address, stakeAmount);

      // Wait
      await mineDays(1);

      // Check
      // Default config is one token per second, 86400 seconds in 1 day
      await checkStakingRewards(staking, user.address, "86400");

      // Wait more
      await mineDays(29);

      // Check and payout
      // Default config is one token per second, 2592000 seconds in 30 days
      await checkStakingRewards(staking, user.address, "2592000");
      await expect(user.staking.claimRewards()).to.emit(rewardToken, "Transfer");

      // A little time expired so the payout is a little higher than 2592300
      expect(Number(ethers.utils.formatEther(await rewardToken.balanceOf(user.address))).toFixed()).to.be.closeTo(
        BigNumber.from("2592000"),
        1,
      );

      // No rewards left to claim
      await checkStakingRewards(staking, user.address, "0");
    });

    it("Supports multiple users in staking pool", async () => {
      const { user, owner, staking, token } = await setupTest();

      const stakeAmountUser = utils.parseEther("1000"); // 1/4 of rewards
      const stakeAmountOwner = utils.parseEther("3000"); // 3/4 of rewards

      // Approval
      await user.token.approve(staking.address, stakeAmountUser);
      await owner.token.approve(staking.address, stakeAmountOwner);

      // Stake
      await user.staking.stake(stakeAmountUser);
      await owner.staking.stake(stakeAmountOwner);

      // Wait
      await mineDays(1);

      // Default config is one token per second, 86400 seconds in 1 day
      await checkStakingRewards(staking, user.address, "21600");
      await checkStakingRewards(staking, owner.address, "64800");

      const additionalStake = utils.parseEther("4000"); // 7/8 of rewards, user gets 1/8
      await owner.token.approve(staking.address, additionalStake);
      await owner.staking.stake(additionalStake);

      await mineDays(1);

      await checkStakingRewards(staking, user.address, "32400", 2);
      await checkStakingRewards(staking, owner.address, "140400", 2);

      // User exits, all rewards go to owner
      await expect(user.staking.withdraw(stakeAmountUser)).to.emit(token, "Transfer");

      await mineDays(1);

      await checkStakingRewards(staking, user.address, "32400", 2);
      await checkStakingRewards(staking, owner.address, "226800", 2);
    });
  });
}
