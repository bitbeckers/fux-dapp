import { expect } from "chai";
import { DateTime } from "luxon";

import { setupTest } from "../setup";
import { getConstants, getDefaultValues } from "../utils";

export const shouldBehaveLikeFuxCanFinalize = () => {
  describe("FuxCanFinalize", () => {
    const { TOKENS } = getConstants();
    const { name, deadline, coordinatorCommitment, rewardTokens, rewardAmounts, metadataURI } = getDefaultValues();

    it("allows workstream coordinator to finalize workstream", async function () {
      // Set up the test environment
      const { fux, owner, user, anon } = await setupTest();

      const contractWithUser = fux.connect(user);
      const contractWithOwner = fux.connect(owner);

      // Mint FUX tokens for the owner
      await contractWithOwner.mintFux();

      // Create a new workstream
      const contributors = [user.address, owner.address, anon.address];
      await contractWithOwner.mintWorkstream(
        name,
        contributors,
        coordinatorCommitment,
        deadline,
        rewardTokens,
        rewardAmounts,
        metadataURI,
      );
      // Mint FUX tokens for the user
      await contractWithUser.mintFux();

      // Commit FUX tokens to the workstream
      await contractWithUser.commitToWorkstream(1, 60);

      // Check that the balances have been updated correctly

      expect(await fux.balanceOf(owner.address, TOKENS.FUX.FUX_TOKEN_ID)).to.be.eq(90);
      expect(await fux.balanceOf(owner.address, TOKENS.VFUX.VFUX_TOKEN_ID)).to.be.eq(0);
      expect(await fux.balanceOf(user.address, TOKENS.FUX.FUX_TOKEN_ID)).to.be.eq(40);
      expect(await fux.balanceOf(user.address, TOKENS.VFUX.VFUX_TOKEN_ID)).to.be.eq(0);
      expect(await fux.balanceOf(anon.address, TOKENS.FUX.FUX_TOKEN_ID)).to.be.eq(0);
      expect(await fux.balanceOf(anon.address, TOKENS.VFUX.VFUX_TOKEN_ID)).to.be.eq(0);

      // Check that the commitments have been updated correctly
      expect(await fux.getCommitment(user.address, 1)).to.be.eq(60);
      expect(await fux.getCommitment(owner.address, 1)).to.be.eq(10);
      expect(await fux.getCommitment(anon.address, 1)).to.be.eq(0);

      // Attempt to finalize the workstream as a non-coordinator (which should fail)
      await expect(contractWithUser.finalizeWorkstream(1, [user.address], [100])).to.be.revertedWithCustomError(
        fux,
        "NotCoordinator",
      );

      // Finalize the workstream as the coordinator
      await expect(contractWithOwner.finalizeWorkstream(1, [user.address], [100]))
        .to.emit(fux, "WorkstreamClosed")
        .withArgs(1, [user.address], [100]);

      // Check that the balances have been updated correctly
      expect(await fux.balanceOf(user.address, TOKENS.FUX.FUX_TOKEN_ID)).to.be.eq(100);
      expect(await fux.balanceOf(user.address, TOKENS.VFUX.VFUX_TOKEN_ID)).to.be.eq(100);
      expect(await fux.balanceOf(owner.address, TOKENS.FUX.FUX_TOKEN_ID)).to.be.eq(100);
      expect(await fux.balanceOf(owner.address, TOKENS.VFUX.VFUX_TOKEN_ID)).to.be.eq(0);

      // Check that the commitments have been updated correctly
      expect(await fux.getCommitment(user.address, 1)).to.be.eq(0);
      expect(await fux.getCommitment(owner.address, 1)).to.be.eq(0);
    });

    it("allows workstream coordinator to close workstream without evaluation", async function () {
      const { fux, owner, user } = await setupTest();
      const contractWithUser = fux.connect(user);
      const contractWithOwner = fux.connect(owner);

      await contractWithUser.mintFux();
      await contractWithOwner.mintFux();

      const contributors = [user.address, owner.address];

      await contractWithUser.mintWorkstream(
        name,
        contributors,
        coordinatorCommitment,
        deadline,
        rewardTokens,
        rewardAmounts,
        metadataURI,
      );

      await contractWithOwner.commitToWorkstream(1, 42);

      // Check the initial balances and commitments
      expect(await fux.balanceOf(user.address, TOKENS.VFUX.VFUX_TOKEN_ID)).to.be.eq(0);
      expect(await fux.balanceOf(user.address, TOKENS.FUX.FUX_TOKEN_ID)).to.be.eq(100 - coordinatorCommitment);
      expect(await fux.balanceOf(owner.address, TOKENS.VFUX.VFUX_TOKEN_ID)).to.be.eq(0);
      expect(await fux.balanceOf(owner.address, TOKENS.FUX.FUX_TOKEN_ID)).to.be.eq(100 - 42);
      expect(await fux.getCommitment(user.address, 1)).to.be.eq(coordinatorCommitment);
      expect(await fux.getCommitment(owner.address, 1)).to.be.eq(42);

      // Attempt to finalize the workstream as a non-coordinator (which should fail)
      await expect(contractWithOwner.closeWorkstream(1, [user.address])).to.be.revertedWithCustomError(
        fux,
        "NotCoordinator",
      );

      // Finalize the workstream as the coordinator
      await expect(contractWithUser.closeWorkstream(1, [owner.address]))
        .to.emit(fux, "WorkstreamClosed")
        .withArgs(1, [owner.address], [undefined]);

      // Check the final balances and commitments
      expect(await fux.balanceOf(user.address, TOKENS.VFUX.VFUX_TOKEN_ID)).to.be.eq(0);
      expect(await fux.balanceOf(user.address, TOKENS.FUX.FUX_TOKEN_ID)).to.be.eq(100);
      expect(await fux.balanceOf(owner.address, TOKENS.VFUX.VFUX_TOKEN_ID)).to.be.eq(0);
      expect(await fux.balanceOf(owner.address, TOKENS.FUX.FUX_TOKEN_ID)).to.be.eq(100);
      expect(await fux.getCommitment(user.address, 1)).to.be.eq(0);
      expect(await fux.getCommitment(owner.address, 1)).to.be.eq(0);
    });
  });
};
