import { expect } from "chai";
import { DateTime } from "luxon";

import setupTest from "../setup";

export function shouldBehaveLikeFuxResolution(): void {
  it("allows workstream creator to resolve workstream", async function () {
    const { fux, owner, user } = await setupTest();

    await owner.fux.mintWorkstream(
      "Test",
      [user.address, owner.address],
      DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
    );

    await user.fux.mintFux();
    await owner.fux.mintFux();
    await user.fux.commitToWorkstream(0, 60);
    await owner.fux.commitToWorkstream(0, 40);
    await owner.fux.mintVFux(0);

    expect(await fux.balanceOf(user.address, 1)).to.be.eq(0);
    expect(await fux.balanceOf(user.address, 0)).to.be.eq(40);
    expect(await fux.balanceOf(owner.address, 1)).to.be.eq(100);
    expect(await fux.balanceOf(owner.address, 0)).to.be.eq(60);

    expect(await fux.getWorkstreamCommitment(user.address, 0)).to.be.eq(60);
    expect(await fux.getWorkstreamCommitment(owner.address, 0)).to.be.eq(40);

    await expect(user.fux.resolveValueEvaluation(0, [user.address], [100])).to.be.revertedWith("NotApprovedOrOwner()");

    await expect(owner.fux.resolveValueEvaluation(0, [user.address], [100]))
      .to.emit(fux, "EvaluationResolved")
      .withArgs(0);

    expect(await fux.balanceOf(user.address, 1)).to.be.eq(100);
    expect(await fux.balanceOf(user.address, 0)).to.be.eq(100);
    expect(await fux.balanceOf(owner.address, 1)).to.be.eq(0);
    expect(await fux.balanceOf(owner.address, 0)).to.be.eq(100);

    expect(await fux.getWorkstreamCommitment(user.address, 0)).to.be.eq(0);
    expect(await fux.getWorkstreamCommitment(owner.address, 0)).to.be.eq(0);
  });
}
