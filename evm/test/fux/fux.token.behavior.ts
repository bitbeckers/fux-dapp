import { expect } from "chai";
import { ethers } from "ethers";

import setupTest from "../setup";

export function shouldBehaveLikeFuxToken(): void {
  it("is open to be minted for anyone", async function () {
    const { fux, deployer, owner, user } = await setupTest();

    expect(await user.fux.mintFux()).to.emit(fux, "TransferSingle").withArgs("0x0000000000000000000000000000000000000000", user.address, "100");
    ;
  });
}
