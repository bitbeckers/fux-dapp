import { expect } from "chai";
import { ethers } from "ethers";

import setupTest from "../setup";

export function shouldBehaveLikeFuxContributor(): void {
  it("allows workstream owner to add contributor", async function () {
    const { fux, deployer, owner, user } = await setupTest();

    const id = 0;
    const metadataUri = "http://example.com";
    const name = "mockStream";

    await expect(user.fux.addContributor(id, owner.address)).to.be.revertedWith("Workstream does not exist");

    expect(await user.fux.mintWorkstream(id, name, metadataUri))
      .to.emit(fux, "WorkstreamMinted")
      .withArgs(id, metadataUri);

    await expect(deployer.fux.addContributor(id, owner.address)).to.be.revertedWith("msg.sender is not the creator");

    expect(await user.fux.addContributor(id, owner.address))
      .to.emit(fux, "ContributorAdded")
      .withArgs(id, owner.address);
  });
}
