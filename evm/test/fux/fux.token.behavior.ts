import { expect } from "chai";
import { ethers } from "ethers";

import setupTest from "../setup";

export function shouldBehaveLikeFuxToken(): void {
  it("is open to be minted once by anyone", async function () {
    const { fux, user } = await setupTest();

    expect(await user.fux.mintFux())
      .to.emit(fux, "TransferSingle")
      .withArgs("0x0000000000000000000000000000000000000000", user.address, "100");
    await expect(user.fux.mintFux()).to.be.revertedWith("Already got your FUX");
  });
}
