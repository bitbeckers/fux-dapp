import { expect } from "chai";

import setupTest from "../setup";

export function shouldBehaveLikeFuxToken(): void {
  it("FUX are open to be minted once by anyone", async function () {
    const { fux, user } = await setupTest();

    await expect(user.fux.mintFux()).to.emit(fux, "FuxClaimed").withArgs(user.address);
    await expect(user.fux.mintFux()).to.be.revertedWith("TokensAlreadyMinted()");

    expect(await user.fux.balanceOf(user.address, 0)).to.be.eq("100");
  });

  it("FUX are not transferable or burnable to other users", async function () {
    const { fux, user, owner } = await setupTest();

    await expect(user.fux.mintFux()).to.emit(fux, "FuxClaimed").withArgs(user.address);
    await expect(user.fux.safeTransferFrom(user.address, owner.address, 0, 1, [])).to.be.revertedWith(
      "NonTransferableFux()",
    );
    await expect(user.fux.safeBatchTransferFrom(user.address, owner.address, [0, 1], [10, 10], [])).to.be.revertedWith(
      "NonTransferableFux()",
    );
  });
}
