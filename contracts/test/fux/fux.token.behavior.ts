import { expect } from "chai";

import { setupTest } from "../setup";
import { getConstants } from "../utils";

export function shouldBehaveLikeFuxToken(): void {
  describe("FuxToken", function () {
    const { TOKENS } = getConstants();

    it("allows anyone to mint FUX once", async function () {
      // Set up the test environment
      const { fux, user } = await setupTest();
      const contractWithUser = fux.connect(user);

      // Mint FUX tokens for the user
      await expect(contractWithUser.mintFux()).to.emit(fux, "FuxClaimed").withArgs(user.address);

      // Attempt to mint FUX tokens again (which should fail)
      await expect(contractWithUser.mintFux()).to.be.revertedWithCustomError(fux, "TokensAlreadyMinted");

      // Check that the user's balance has been updated
      expect(await fux.balanceOf(user.address, TOKENS.FUX.FUX_TOKEN_ID)).to.be.eq("100");
    });

    it("does not allow transfer or batch transfer of FUX tokens", async function () {
      // Set up the test environment
      const { fux, user, owner } = await setupTest();
      const contractWithUser = fux.connect(user);

      // Mint FUX tokens for the user
      await expect(contractWithUser.mintFux()).to.emit(fux, "FuxClaimed").withArgs(user.address);

      // Attempt to transfer FUX tokens to the owner (which should fail)
      await expect(
        contractWithUser.safeTransferFrom(user.address, owner.address, TOKENS.FUX.FUX_TOKEN_ID, 1, []),
      ).to.be.revertedWithCustomError(fux, "NotAllowed");

      // Attempt to batch transfer FUX tokens to the owner (which should fail)
      await expect(
        contractWithUser.safeBatchTransferFrom(user.address, owner.address, [TOKENS.FUX.FUX_TOKEN_ID, 1], [10, 10], []),
      ).to.be.revertedWithCustomError(fux, "NotAllowed");

      //TODO double check on no alternative way to burn
    });
  });
}
