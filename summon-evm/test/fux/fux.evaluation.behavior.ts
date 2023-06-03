import { expect } from "chai";
import { DateTime } from "luxon";

import { setupTest } from "../setup";
import { getDefaultValues } from "../utils";

export function shouldBehaveLikeFuxEvaluation(): void {
  describe("Evaluation", function () {
    const { name, deadline, coordinatorCommitment, rewardTokens, rewardAmounts, metadataURI } = getDefaultValues();

    it("only allows workstream coordinator to set the workstream to Evaluation so that no contributors can be added", async function () {
      const { fux, deployer, owner, user } = await setupTest();

      const contractWithUser = fux.connect(user);
      const contractWithDeployer = fux.connect(deployer);

      const id = 1;
      await contractWithUser.mintFux();

      await expect(
        contractWithUser.updateContributors(id, [user.address, owner.address], true),
      ).to.be.revertedWithCustomError(fux, "InvalidInput");

      await expect(
        contractWithUser.mintWorkstream(
          name,
          [user.address, deployer.address, user.address],
          coordinatorCommitment,
          deadline,
          rewardTokens,
          rewardAmounts,
          metadataURI,
        ),
      )
        .to.emit(fux, "WorkstreamMinted")
        .withArgs(id, deadline, rewardTokens, rewardAmounts, 0, metadataURI);

      // Ensure that only the coordinator can set the workstream to Evaluation
      await expect(contractWithDeployer.updateContributors(id, [owner.address], true)).to.be.revertedWithCustomError(
        fux,
        "NotCoordinator",
      );

      await expect(contractWithUser.updateContributors(id, [owner.address], true))
        .to.emit(fux, "ContributorsUpdated")
        .withArgs(id, [owner.address], true),
        // Set the workstream to Evaluation
        await expect(contractWithUser.setWorkstreamToEvaluation(id)).to.emit(fux, "StateUpdated").withArgs(id, 1);

      // Ensure that no contributors can be added after the workstream is set to Evaluation
      await expect(contractWithUser.updateContributors(id, [user.address], true)).to.be.revertedWithCustomError(
        fux,
        "NotAllowed",
      );
      await expect(contractWithDeployer.updateContributors(id, [user.address], true)).to.be.revertedWithCustomError(
        fux,
        "NotCoordinator",
      );
    });

    it("allows workstream contributor to submit evaluations", async function () {
      const { fux, deployer, owner, user } = await setupTest();

      const contractWithUser = fux.connect(user);
      const contractWithDeployer = fux.connect(deployer);
      const contractWithOwner = fux.connect(owner);

      const id = 1;

      await contractWithUser.mintFux();
      await contractWithDeployer.mintFux();
      await contractWithOwner.mintFux();

      // Ensure that only the coordinator can set the workstream to Evaluation
      await expect(
        contractWithUser.updateContributors(id, [user.address, owner.address], true),
      ).to.be.revertedWithCustomError(fux, "InvalidInput");

      await expect(
        contractWithUser.mintWorkstream(
          name,
          [user.address, deployer.address, owner.address],
          coordinatorCommitment,
          deadline,
          rewardTokens,
          rewardAmounts,
          metadataURI,
        ),
      )
        .to.emit(fux, "WorkstreamMinted")
        .withArgs(id, deadline, rewardTokens, rewardAmounts, 0, metadataURI);

      await contractWithDeployer.commitToWorkstream(1, 11);
      await contractWithOwner.commitToWorkstream(1, 22);

      // Remove owner from contributors
      await expect(contractWithUser.updateContributors(id, [owner.address], false))
        .to.emit(fux, "ContributorsUpdated")
        .withArgs(id, [owner.address], false);

      // Set the workstream to Evaluation
      await expect(contractWithUser.setWorkstreamToEvaluation(id)).to.emit(fux, "StateUpdated").withArgs(id, 1);

      // Ensure that non-contributors cannot submit evaluations
      await expect(contractWithDeployer.submitEvaluation(id, [user.address], [100])).to.not.be.reverted;
      await expect(contractWithUser.submitEvaluation(id, [deployer.address], [100])).to.not.be.reverted;
      await expect(contractWithOwner.submitEvaluation(id, [user.address], [100])).to.be.reverted;
    });
  });
}
