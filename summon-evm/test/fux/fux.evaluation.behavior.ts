import { expect } from "chai";
import { BigNumber, ethers } from "ethers";
import { DateTime } from "luxon";

import { setupTest } from "../setup";

export function shouldBehaveLikeFuxEvaluation(): void {
  it("only allows workstream coordinator to claim vFUX for evaluation and only when committed", async function () {
    const { fux, owner, user } = await setupTest();
    const contractWithUser = fux.connect(user);

    await contractWithUser.mintFux();

    await contractWithUser.mintWorkstream(
      "Test",
      [user.address, owner.address],
      10,
      DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
    );

    await fux.connect(owner).mintFux();

    await expect(fux.connect(owner).mintVFux(1)).to.be.revertedWithCustomError(fux, "NotCoordinator");

    await contractWithUser.commitToWorkstream(1, 50);

    await expect(contractWithUser.mintVFux(1)).to.emit(fux, "VFuxClaimed").withArgs(user.address, 1);
    expect(await contractWithUser.readWorkstreamState(1)).to.be.eq("Evaluation");
    await expect(contractWithUser.mintVFux(1)).to.be.revertedWithCustomError(fux, "NotAllowed");
  });

  it("allows workstream contributor to submit evaluations", async function () {
    const { fux, deployer, owner, user } = await setupTest();
    const contractWithUser = fux.connect(user);

    await contractWithUser.mintFux();

    await contractWithUser.mintWorkstream(
      "Test",
      [user.address, owner.address],
      10,
      DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
    );

    await fux.connect(owner).mintFux();

    expect(await contractWithUser.balanceOf(user.address, 1)).to.be.eq(0);

    await expect(contractWithUser.submitEvaluation(1, [owner.address], [100])).to.not.be.reverted;

    await fux.connect(owner).commitToWorkstream(1, 42);

    await expect(fux.connect(deployer).submitEvaluation(1, [owner.address], [100])).to.be.revertedWithCustomError(
      fux,
      "NotContributor",
    );

    await expect(contractWithUser.submitEvaluation(1, [owner.address], [100]))
      .to.emit(fux, "EvaluationSubmitted")
      .withArgs(1, user.address, [owner.address], [100]);

    await expect(contractWithUser.submitEvaluation(1, [user.address], [100])).to.be.revertedWithCustomError(
      fux,
      "NotAllowed",
    );

    await expect(contractWithUser.submitEvaluation(1, [owner.address], [99])).to.be.revertedWithCustomError(
      fux,
      "InvalidInput",
    );

    await expect(contractWithUser.submitEvaluation(1, [owner.address], [100]))
      .to.emit(fux, "EvaluationSubmitted")
      .withArgs(1, user.address, [owner.address], [100]);

    const evaluation = await contractWithUser.getEvaluation(user.address, 1);

    expect(evaluation.contributors).to.be.eql([owner.address]);
    expect(evaluation.ratings).to.be.eql([BigNumber.from("100")]);
  });
}
