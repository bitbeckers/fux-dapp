import { expect } from "chai";
import { ethers } from "hardhat";
import { DateTime } from "luxon";

import setupTest from "../setup";

export function shouldBehaveLikeFuxWorkstream(): void {
  it("allows any fuxxer to mint a workstream", async function () {
    const { fux, deployer, owner, user } = await setupTest();

    const deadline = DateTime.now().plus({ days: 7 }).toSeconds().toFixed();

    await expect(user.fux.mintWorkstream("Test", [user.address, deployer.address, owner.address], 10, deadline)).to.be.reverted;

    await user.fux.mintFux();

    await expect(user.fux.mintWorkstream("Test", [user.address, deployer.address, owner.address], 10, deadline))
      .to.emit(fux, "WorkstreamMinted")
      .withArgs(0, 0, deadline, "http://example.com");

    const funding = ethers.utils.parseEther("1");

    await expect(
      user.fux.mintWorkstream("Test", [user.address, deployer.address, owner.address], 10, deadline, {
        value: funding,
      }),
    )
      .to.emit(fux, "WorkstreamMinted")
      .withArgs(1, funding, deadline, "http://example.com");
  });

  it("allows workstream contributor to commit FUX", async function () {
    const { fux, owner, user } = await setupTest();

    await user.fux.mintFux();

    await user.fux.mintWorkstream("Test", [user.address], 10, DateTime.now().plus({ days: 7 }).toSeconds().toFixed());

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
    const { fux, user } = await setupTest();

    await user.fux.mintFux();

    await user.fux.mintWorkstream(
      "Test",
      [user.address],
      10,
      DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
    );

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
    const { fux, owner, user } = await setupTest();

    await user.fux.mintFux();

    await user.fux.mintWorkstream(
      "Test",
      [user.address],
      10,
      DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
    );

    await expect(user.fux.withdrawFromWorkstream(0)).to.not.be.reverted;

    await user.fux.commitToWorkstream(0, 50);

    expect(await user.fux.getWorkstreamCommitment(user.address, 0)).to.be.eq(50);
    expect(await user.fux.balanceOf(user.address, 0)).to.be.eq(50);

    await expect(owner.fux.withdrawFromWorkstream(0)).to.be.revertedWith("NotContributor()");
    await expect(user.fux.withdrawFromWorkstream(0)).to.emit(fux, "FuxWithdraw").withArgs(user.address, 0, 50);
    expect(await user.fux.balanceOf(user.address, 0)).to.be.eq(100);

    await expect(user.fux.withdrawFromWorkstream(0)).to.be.revertedWith("NotEnoughFux()");
  });
}
