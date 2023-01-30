import { expect } from "chai";
import { DateTime } from "luxon";

import { setupTest } from "../setup";

export function shouldBehaveLikeFuxResolution(): void {
  it("allows workstream coordinator to resolve workstream", async function () {
    const { fux, owner, user } = await setupTest();
    const contractWithUser = fux.connect(user);
    const contractWithOwner = fux.connect(owner);

    await contractWithOwner.mintFux();

    await contractWithOwner.mintWorkstream(
      "Test",
      [user.address, owner.address],
      10,
      DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
    );

    await contractWithUser.mintFux();
    await contractWithUser.commitToWorkstream(1, 60);

    await expect(contractWithOwner.resolveValueEvaluation(1, [user.address], [100])).to.be.revertedWithCustomError(
      fux,
      "NotEnoughVFux",
    );

    await contractWithOwner.mintVFux(1);

    expect(await fux.balanceOf(user.address, 1)).to.be.eq(0);
    expect(await fux.balanceOf(user.address, 0)).to.be.eq(40);
    expect(await fux.balanceOf(owner.address, 1)).to.be.eq(100);
    expect(await fux.balanceOf(owner.address, 0)).to.be.eq(90);

    expect(await fux.getWorkstreamCommitment(user.address, 1)).to.be.eq(60);
    expect(await fux.getWorkstreamCommitment(owner.address, 1)).to.be.eq(10);

    await expect(contractWithUser.resolveValueEvaluation(1, [user.address], [100])).to.be.revertedWithCustomError(
      fux,
      "NotCoordinator",
    );

    await expect(contractWithOwner.resolveValueEvaluation(1, [user.address], [100]))
      .to.emit(fux, "WorkstreamClosed")
      .withArgs(1);

    expect(await fux.balanceOf(user.address, 1)).to.be.eq(100);
    expect(await fux.balanceOf(user.address, 0)).to.be.eq(100);
    expect(await fux.balanceOf(owner.address, 1)).to.be.eq(0);
    expect(await fux.balanceOf(owner.address, 0)).to.be.eq(100);

    expect(await fux.getWorkstreamCommitment(user.address, 1)).to.be.eq(0);
    expect(await fux.getWorkstreamCommitment(owner.address, 1)).to.be.eq(0);
  });
}
