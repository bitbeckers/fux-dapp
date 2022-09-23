import { expect } from "chai";
import { DateTime } from "luxon";

import setupTest from "../setup";

export function shouldBehaveLikeFuxContributor(): void {
  it("allows workstream owner to add contributor", async function () {
    const { fux, deployer, owner, user } = await setupTest();

    const id = 0;
    const metadataUri = "http://example.com";
    const name = "mockStream";

    await expect(user.fux.addContributors(id, [owner.address])).to.be.revertedWith("Workstream does not exist");

    await expect(
      user.fux.mintWorkstream(
        name,
        [deployer.address, user.address],
        DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
      ),
    )
      .to.emit(fux, "WorkstreamMinted")
      .withArgs(id, metadataUri);

    await expect(deployer.fux.addContributors(id, [owner.address])).to.be.revertedWith("msg.sender is not the creator");

    await expect(user.fux.addContributors(id, [owner.address]))
      .to.emit(fux, "ContributorsAdded")
      .withArgs(id, [owner.address]);
  });
}
