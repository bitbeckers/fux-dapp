import { expect } from "chai";
import { ethers } from "ethers";

import setupTest from "../setup";

export function shouldBehaveLikeFuxWorkstream(): void {
  it("is open to be minted by anyone", async function () {
    const { fux, deployer, owner, user } = await setupTest();

    const id = 0;
    const metadataUri = "http://example.com";
    const name = "mockStream";

    expect(await user.fux.mintWorkstream(id, name, metadataUri))
      .to.emit(fux, "WorkstreamMinted")
      .withArgs(id, metadataUri);

    await expect(user.fux.mintWorkstream(id, name, metadataUri)).to.be.revertedWith(
      "Workstream exists for given ID",
    );
  });
}
