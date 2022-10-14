import { expect } from "chai";
import { DateTime } from "luxon";

import setupTest from "../setup";

export function shouldBehaveLikeFuxEvaluation(): void {
  it("allows workstream contributor to claim vFUX for evaluation", async function () {
    const { fux, deployer, owner, user } = await setupTest();

    await user.fux.mintWorkstream(
      "Test",
      [user.address, owner.address],
      DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
    );

    await user.fux.mintFux();
    await owner.fux.mintFux();
    await user.fux.commitToWorkstream(0, 50);

    await expect(owner.fux.mintVFux(0)).to.be.revertedWith("NotEnoughFux()");
    await expect(deployer.fux.mintVFux(0)).to.be.revertedWith("NotContributor()");

    await expect(user.fux.mintVFux(0)).to.emit(fux, "VFuxClaimed").withArgs(user.address, 0);
    expect(await user.fux.getVFuxForEvaluation(0)).to.be.eq(100);
    await expect(user.fux.mintVFux(0)).to.be.revertedWith("TokensAlreadyMinted()");
  });

  it("allows workstream contributor to submit evaluation using vFUX", async function () {
    const { fux, deployer, owner, user } = await setupTest();

    await user.fux.mintWorkstream(
      "Test",
      [user.address, owner.address],
      DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
    );

    await user.fux.mintFux();
    await owner.fux.mintFux();

    await expect(user.fux.submitValueEvaluation(0, [owner.address], [100])).to.be.revertedWith("NotEnoughFux()");

    await user.fux.commitToWorkstream(0, 50);
    await owner.fux.commitToWorkstream(0, 42);

    await expect(deployer.fux.submitValueEvaluation(0, [owner.address], [100])).to.be.revertedWith("NotContributor()");
    await expect(user.fux.submitValueEvaluation(0, [owner.address], [100])).to.be.revertedWith("NotEnoughVFux()");

    await owner.fux.mintVFux(0);
    await user.fux.mintVFux(0);

    await expect(user.fux.submitValueEvaluation(0, [user.address], [100])).to.be.revertedWith(
      'InvalidInput("sender is contributor")',
    );

    await expect(user.fux.submitValueEvaluation(0, [owner.address], [99])).to.be.revertedWith("NotEnoughFux()");

    await expect(user.fux.submitValueEvaluation(0, [owner.address], [100]))
      .to.emit(fux, "EvaluationSubmitted")
      .withArgs(0, user.address);

    const evaluation = await user.fux.getValueEvaluation(user.address, 0);

    expect(evaluation.contributors).to.be.eql([owner.address]);
    expect(evaluation.ratings).to.be.eql([100]);
  });
}
