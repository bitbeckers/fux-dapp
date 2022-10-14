import { expect } from "chai";
import { DateTime } from "luxon";

import setupTest from "../setup";

export function shouldBehaveLikeFuxWorkstream(): void {
  it("allows anyone to mint a workstream", async function () {
    const { fux, deployer, owner, user } = await setupTest();

    await expect(
      user.fux.mintWorkstream(
        "Test",
        [deployer.address, owner.address],
        DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
      ),
    )
      .to.emit(fux, "WorkstreamMinted")
      .withArgs(0, "http://example.com");

    await expect(
      user.fux.mintWorkstream(
        "Test",
        [deployer.address, owner.address],
        DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
      ),
    )
      .to.emit(fux, "WorkstreamMinted")
      .withArgs(1, "http://example.com");
  });

  it("allows workstream contributor to commit FUX", async function () {
    const { fux, deployer, owner, user } = await setupTest();

    const workstream = await user.fux.mintWorkstream(
      "Test",
      [user.address],
      DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
    );

    await expect(user.fux.commitToWorkstream(0, 50)).to.be.revertedWith("NotEnoughFux()");

    await user.fux.mintFux();

    await expect(user.fux.commitToWorkstream(0, 50)).to.emit(fux, "FuxGiven");
    expect(await user.fux.balanceOf(user.address, 0)).to.be.eq(50);
    expect(await user.fux.getWorkstreamCommitment(user.address, 0)).to.be.eq(50);

    await owner.fux.mintFux();

    await expect(owner.fux.commitToWorkstream(0, 50)).to.be.revertedWith("NotContributor()");

    await user.fux.addContributors(0, [owner.address]);

    await expect(owner.fux.commitToWorkstream(0, 50)).to.emit(fux, "FuxGiven");
    expect(await owner.fux.balanceOf(owner.address, 0)).to.be.eq(50);
    expect(await owner.fux.getWorkstreamCommitment(owner.address, 0)).to.be.eq(50);
  });

  it("allows workstream contributor to update committed FUX", async function () {
    const { fux, deployer, owner, user } = await setupTest();

    const workstream = await user.fux.mintWorkstream(
      "Test",
      [user.address],
      DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
    );

    await user.fux.mintFux();
    await user.fux.commitToWorkstream(0, 50);
    expect(await user.fux.getWorkstreamCommitment(user.address, 0)).to.be.eq(50);
    expect(await user.fux.balanceOf(user.address, 0)).to.be.eq(50);

    await expect(user.fux.commitToWorkstream(0, 50)).to.be.revertedWith("Same amount of FUX");
    await expect(user.fux.commitToWorkstream(0, 20)).to.emit(fux, "FuxGiven").withArgs(user.address, 0, 20);
    expect(await user.fux.getWorkstreamCommitment(user.address, 0)).to.be.eq(20);
    expect(await user.fux.balanceOf(user.address, 0)).to.be.eq(80);

    await expect(user.fux.commitToWorkstream(0, 60)).to.emit(fux, "FuxGiven").withArgs(user.address, 0, 60);
    expect(await user.fux.getWorkstreamCommitment(user.address, 0)).to.be.eq(60);
    expect(await user.fux.balanceOf(user.address, 0)).to.be.eq(40);
  });

  it("allows workstream contributor to withdraw FUX", async function () {
    const { fux, deployer, owner, user } = await setupTest();

    const workstream = await user.fux.mintWorkstream(
      "Test",
      [user.address],
      DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
    );

    await user.fux.mintFux();

    await expect(user.fux.withdrawFromWorkstream(0)).to.be.revertedWith("NotEnoughFux()");

    await user.fux.commitToWorkstream(0, 50);

    expect(await user.fux.getWorkstreamCommitment(user.address, 0)).to.be.eq(50);
    expect(await user.fux.balanceOf(user.address, 0)).to.be.eq(50);

    await expect(owner.fux.withdrawFromWorkstream(0)).to.be.revertedWith("NotContributor()");
    await expect(user.fux.withdrawFromWorkstream(0)).to.emit(fux, "FuxWithdraw").withArgs(user.address, 0, 50);
    expect(await user.fux.balanceOf(user.address, 0)).to.be.eq(100);

    await expect(user.fux.withdrawFromWorkstream(0)).to.be.revertedWith("NotEnoughFux()");
  });
}
