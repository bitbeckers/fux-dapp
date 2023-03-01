import { expect } from "chai";

import { setupTest } from "../setup";

export function shouldBehaveLikeFuxToken(): void {
  it("FUX are open to be minted once by anyone", async function () {
    const { fux, user } = await setupTest();

    const contractWithUser = fux.connect(user);

    await expect(contractWithUser.mintFux()).to.emit(fux, "FuxClaimed").withArgs(user.address);

    await expect(contractWithUser.mintFux()).to.be.revertedWithCustomError(fux, "TokensAlreadyMinted");

    expect(await fux.balanceOf(user.address, 0)).to.be.eq("100");
  });

  it("FUX are not transferable or burnable to other users", async function () {
    const { fux, user, owner } = await setupTest();

    const contractWithUser = fux.connect(user);

    await expect(contractWithUser.mintFux()).to.emit(fux, "FuxClaimed").withArgs(user.address);
    await expect(
      contractWithUser.safeTransferFrom(user.address, owner.address, 0, 1, []),
    ).to.be.revertedWithCustomError(fux, "NotAllowed");

    await expect(
      contractWithUser.safeBatchTransferFrom(user.address, owner.address, [0, 1], [10, 10], []),
    ).to.be.revertedWithCustomError(fux, "NotAllowed");

    //TODO double check on no alternative way to burn
  });
}
