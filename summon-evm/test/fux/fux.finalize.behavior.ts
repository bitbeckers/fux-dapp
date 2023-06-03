import { expect } from "chai";
import { DateTime } from "luxon";

import { setupTest } from "../setup";
import { getConstants } from "../utils";

export const shouldBehaveLikeFuxCanFinalize = () => {
  describe("FuxCanFinalize", () => {
    const { TOKENS } = getConstants();

    it("allows workstream coordinator to finalize workstream", async function () {
      // Set up the test environment
      const { fux, owner, user, anon } = await setupTest();
      const contractWithUser = fux.connect(user);
      const contractWithOwner = fux.connect(owner);

      // Mint FUX tokens for the owner
      await contractWithOwner.mintFux();

      // Create a new workstream
      await contractWithOwner.mintWorkstream(
        "Test",
        [user.address, anon.address],
        10,
        DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
        [],
        [],
        "",
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

      // Attempt to finalize the workstream as a non-coordinator (which should fail)
      await expect(contractWithOwner.finalizeWorkstream(1, [user.address], [100])).to.be.revertedWithCustomError(
        fux,
        "NotAllowed",
      );

      // Finalize the workstream as the coordinator
      await expect(contractWithOwner.finalizeWorkstream(1, [user.address], [100]))
        .to.emit(fux, "WorkstreamClosed")
        .withArgs(1);

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

      await contractWithOwner.mintFux();
      await contractWithUser.mintWorkstream(
        "Test",
        [user.address, owner.address],
        10,
        DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
        [TOKENS.FUX.FUX_TOKEN_ID.toString()],
        [],
        "",
      );

      await contractWithUser.mintFux();
      await contractWithUser.commitToWorkstream(1, 60);

      // Check the initial balances and commitments
      expect(await fux.balanceOf(user.address, TOKENS.VFUX.VFUX_TOKEN_ID)).to.be.eq(0);
      expect(await fux.balanceOf(user.address, TOKENS.FUX.FUX_TOKEN_ID)).to.be.eq(0);
      expect(await fux.balanceOf(owner.address, TOKENS.VFUX.VFUX_TOKEN_ID)).to.be.eq(0);
      expect(await fux.balanceOf(owner.address, TOKENS.FUX.FUX_TOKEN_ID)).to.be.eq(40);
      expect(await fux.getCommitment(user.address, 1)).to.be.eq(60);
      expect(await fux.getCommitment(owner.address, 1)).to.be.eq(10);

      // Attempt to finalize the workstream as a non-coordinator (which should fail)
      await expect(contractWithUser.finalizeWorkstream(1, [user.address], [100])).to.be.revertedWithCustomError(
        fux,
        "NotCoordinator",
      );

      // Finalize the workstream as the coordinator
      await expect(contractWithOwner.finalizeWorkstream(1, [user.address], [100]))
        .to.emit(fux, "WorkstreamClosed")
        .withArgs(1);

      // Check the final balances and commitments
      expect(await fux.balanceOf(user.address, TOKENS.VFUX.VFUX_TOKEN_ID)).to.be.eq(0);
      expect(await fux.balanceOf(user.address, TOKENS.FUX.FUX_TOKEN_ID)).to.be.eq(100);
      expect(await fux.balanceOf(owner.address, TOKENS.VFUX.VFUX_TOKEN_ID)).to.be.eq(0);
      expect(await fux.balanceOf(owner.address, TOKENS.FUX.FUX_TOKEN_ID)).to.be.eq(0);
      expect(await fux.getCommitment(user.address, 1)).to.be.eq(0);
      expect(await fux.getCommitment(owner.address, 1)).to.be.eq(0);
    });
  });
};
