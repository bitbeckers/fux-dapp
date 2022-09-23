import { expect } from "chai";
import { ethers } from "ethers";

import setupTest from "../setup";

export function shouldBehaveLikeFuxToken(): void {
  it("FUX are open to be minted once by anyone", async function () {
    const { fux, user } = await setupTest();

    await expect(user.fux.mintFux())
      .to.emit(fux, "FuxClaimed")
      .withArgs(user.address);
    await expect(user.fux.mintFux()).to.be.revertedWith("Already got your FUX");

    expect(await user.fux.balanceOf(user.address, 0)).to.be.eq("100");
  });
}
