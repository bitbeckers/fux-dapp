import { expect } from "chai";
import { DateTime } from "luxon";

import setupTest from "../setup";

export function shouldBehaveLikeFuxContributor(): void {
  it("allows workstream owner to invite contributor", async function () {
    const { fux, deployer, owner, user } = await setupTest();

    const id = 0;
    const metadataUri = "http://example.com";
    const name = "mockStream";
    const deadline = DateTime.now().plus({ days: 7 }).toSeconds().toFixed();

    await user.fux.mintFux();

    await expect(user.fux.addContributors(id, [user.address, owner.address])).to.be.revertedWith(
      "NonExistentWorkstream()",
    );

    await expect(user.fux.mintWorkstream(name, [user.address, deployer.address, user.address], 10, deadline))
      .to.emit(fux, "WorkstreamMinted")
      .withArgs(id, 0, deadline, metadataUri);

    await expect(deployer.fux.addContributors(id, [owner.address])).to.be.revertedWith("NotApprovedOrOwner()");

    await expect(user.fux.addContributors(id, [owner.address]))
      .to.emit(fux, "ContributorsAdded")
      .withArgs(id, [owner.address]);

    //TODO can user see workstream
  });

  it("allows workstream owner to close solo workstream", async function () {
    const { fux, user } = await setupTest();

    const id = 0;
    const metadataUri = "http://example.com";
    const name = "mockStream";
    const deadline = DateTime.now().plus({ days: 7 }).toSeconds().toFixed();

    await user.fux.mintFux();

    await expect(user.fux.mintWorkstream(name, [user.address], 10, deadline))
      .to.emit(fux, "WorkstreamMinted")
      .withArgs(id, 0, deadline, metadataUri);

    await expect(await user.fux.resolveSoloWorkstream(0)).to.emit(fux, "WorkstreamClosed");
  });
}
