import { expect } from "chai";
import { DateTime } from "luxon";

import { setupTest } from "../setup";
import { getDefaultValues } from "../utils";

export function shouldBehaveLikeFuxContributor(): void {
  it("allows workstream owner to invite contributor", async function () {
    const { fux, deployer, owner, user } = await setupTest();
    const { name, deadline, coordinatorCommitment, rewardTokens, rewardAmounts, metadataURI } = getDefaultValues();

    const contractWithUser = fux.connect(user);
    const contractWithDeployer = fux.connect(deployer);

    const id = 1;

    await contractWithUser.mintFux();

    await expect(
      contractWithUser.updateContributors(id, [user.address, owner.address], true),
    ).to.be.revertedWithCustomError(fux, "InvalidInput");

    const contributors = [user.address, deployer.address, owner.address];
    expect(
      await contractWithUser.mintWorkstream(
        name,
        contributors,
        coordinatorCommitment,
        deadline,
        rewardTokens,
        rewardAmounts,
        metadataURI,
      ),
    )
      .to.emit(fux, "WorkstreamMinted")
      .withArgs(id, 0, deadline, rewardTokens, rewardAmounts, 0, metadataURI);

    await expect(contractWithDeployer.updateContributors(id, [owner.address], true)).to.be.revertedWithCustomError(
      fux,
      "NotCoordinator",
    );

    await expect(contractWithUser.updateContributors(id, [owner.address], true))
      .to.emit(fux, "ContributorsUpdated")
      .withArgs(id, [owner.address], true);
  });

  it("allows workstream owner to remove contributor", async function () {
    const { fux, deployer, owner, user } = await setupTest();
    const { name, deadline, coordinatorCommitment, rewardTokens, rewardAmounts, metadataURI } = getDefaultValues();

    const contractWithUser = fux.connect(user);
    const contractWithDeployer = fux.connect(deployer);

    const id = 1;

    await contractWithUser.mintFux();

    await expect(
      contractWithUser.updateContributors(id, [user.address, owner.address], true),
    ).to.be.revertedWithCustomError(fux, "InvalidInput");

    const contributors = [user.address, deployer.address, owner.address];
    expect(
      await contractWithUser.mintWorkstream(
        name,
        contributors,
        coordinatorCommitment,
        deadline,
        rewardTokens,
        rewardAmounts,
        metadataURI,
      ),
    )
      .to.emit(fux, "WorkstreamMinted")
      .withArgs(id, 0, deadline, rewardTokens, rewardAmounts, metadataURI);

    await expect(contractWithDeployer.updateContributors(id, [owner.address], true)).to.be.revertedWithCustomError(
      fux,
      "NotCoordinator",
    );

    await expect(contractWithUser.updateContributors(id, [owner.address], true))
      .to.emit(fux, "ContributorsUpdated")
      .withArgs(id, [owner.address], true);

    await expect(contractWithUser.updateContributors(id, [owner.address], false))
      .to.emit(fux, "ContributorsUpdated")
      .withArgs(id, [owner.address], false);
  });
}
