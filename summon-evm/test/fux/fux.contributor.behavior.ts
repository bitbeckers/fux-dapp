import { expect } from "chai";
import { DateTime } from "luxon";

import { setupTest } from "../setup";

export function shouldBehaveLikeFuxContributor(): void {
  it("allows workstream owner to invite contributor", async function () {
    const { fux, deployer, owner, user } = await setupTest();

    const contractWithUser = fux.connect(user);
    const contractWithDeployer = fux.connect(deployer);

    const id = 1;
    const metadataUri = "";
    const name = "mockStream";
    const deadline = DateTime.now().plus({ days: 7 }).toSeconds().toFixed();

    await contractWithUser.mintFux();

    await expect(contractWithUser.addContributors(id, [user.address, owner.address])).to.be.revertedWithCustomError(
      fux,
      "NonExistentWorkstream",
    );

    await expect(contractWithUser.mintWorkstream(name, [user.address, deployer.address, user.address], 10, deadline))
      .to.emit(fux, "WorkstreamMinted")
      .withArgs(id, 0, deadline, metadataUri);

    await expect(contractWithDeployer.addContributors(id, [owner.address])).to.be.revertedWithCustomError(
      fux,
      "NotApprovedOrOwner",
    );

    await expect(contractWithUser.addContributors(id, [owner.address]))
      .to.emit(fux, "ContributorsAdded")
      .withArgs(id, [owner.address]);

    //TODO can user see workstream
  });

  it("allows workstream owner to close solo workstream", async function () {
    const { fux, user } = await setupTest();

    const contractWithUser = fux.connect(user);

    const id = 1;
    const metadataUri = "";
    const name = "mockStream";
    const deadline = DateTime.now().plus({ days: 7 }).toSeconds().toFixed();

    await contractWithUser.mintFux();

    await expect(contractWithUser.mintWorkstream(name, [user.address], 10, deadline))
      .to.emit(fux, "WorkstreamMinted")
      .withArgs(id, 0, deadline, metadataUri);

    await expect(contractWithUser.resolveSoloWorkstream(1)).to.emit(fux, "WorkstreamClosed");
  });
}
