import { expect } from "chai";
import { ethers } from "hardhat";
import { DateTime } from "luxon";

import { setupTest } from "../setup";

export function shouldBehaveLikeFuxWorkstream(): void {
  it("allows any fuxxer to mint a workstream", async function () {
    const { fux, deployer, owner, user } = await setupTest();
    const contractWithUser = fux.connect(user);

    const deadline = DateTime.now().plus({ days: 7 }).toSeconds().toFixed();

    await expect(contractWithUser.mintWorkstream("Test", [user.address, deployer.address, owner.address], 10, deadline))
      .to.be.reverted;

    await contractWithUser.mintFux();

    await expect(contractWithUser.mintWorkstream("Test", [user.address, deployer.address, owner.address], 10, deadline))
      .to.emit(fux, "WorkstreamMinted")
      .withArgs(1, 0, deadline, "");

    const funding = ethers.utils.parseEther("1");

    await expect(
      contractWithUser.mintWorkstream("Test", [user.address, deployer.address, owner.address], 10, deadline, {
        value: funding,
      }),
    )
      .to.emit(fux, "WorkstreamMinted")
      .withArgs(2, funding, deadline, "");
  });

  it("allows workstream contributor to commit FUX", async function () {
    const { fux, owner, user } = await setupTest();
    const contractWithUser = fux.connect(user);
    const contractWithOwner = fux.connect(owner);

    await contractWithUser.mintFux();

    await contractWithUser.mintWorkstream(
      "Test",
      [user.address],
      10,
      DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
    );

    await expect(contractWithUser.commitToWorkstream(1, 50)).to.emit(fux, "FuxGiven");
    expect(await contractWithUser.balanceOf(user.address, 0)).to.be.eq(50);
    expect(await contractWithUser.getWorkstreamCommitment(user.address, 1)).to.be.eq(50);

    await contractWithOwner.mintFux();

    await expect(contractWithOwner.commitToWorkstream(1, 50)).to.be.revertedWithCustomError(fux, "NotContributor");

    await contractWithUser.addContributors(1, [owner.address]);

    await expect(contractWithOwner.commitToWorkstream(1, 50)).to.emit(fux, "FuxGiven");
    expect(await contractWithOwner.balanceOf(owner.address, 0)).to.be.eq(50);
    expect(await contractWithOwner.getWorkstreamCommitment(owner.address, 1)).to.be.eq(50);
  });

  it("allows workstream contributor to update committed FUX", async function () {
    const { fux, user } = await setupTest();
    const contractWithUser = fux.connect(user);
    await contractWithUser.mintFux();

    await contractWithUser.mintWorkstream(
      "Test",
      [user.address],
      10,
      DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
    );

    await contractWithUser.commitToWorkstream(1, 50);
    expect(await contractWithUser.getWorkstreamCommitment(user.address, 1)).to.be.eq(50);
    expect(await contractWithUser.balanceOf(user.address, 0)).to.be.eq(50);

    await expect(contractWithUser.commitToWorkstream(1, 50)).to.be.revertedWith("Same amount of FUX");
    await expect(contractWithUser.commitToWorkstream(1, 20)).to.emit(fux, "FuxGiven").withArgs(user.address, 1, 20);
    expect(await contractWithUser.getWorkstreamCommitment(user.address, 1)).to.be.eq(20);
    expect(await contractWithUser.balanceOf(user.address, 0)).to.be.eq(80);

    await expect(contractWithUser.commitToWorkstream(1, 60)).to.emit(fux, "FuxGiven").withArgs(user.address, 1, 60);
    expect(await contractWithUser.getWorkstreamCommitment(user.address, 1)).to.be.eq(60);
    expect(await contractWithUser.balanceOf(user.address, 0)).to.be.eq(40);
  });

  it("allows workstream contributor to withdraw FUX", async function () {
    const { fux, owner, user } = await setupTest();
    const contractWithUser = fux.connect(user);
    const contractWithOwner = fux.connect(owner);

    await contractWithUser.mintFux();

    await contractWithUser.mintWorkstream(
      "Test",
      [user.address],
      10,
      DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
    );

    await expect(contractWithUser.withdrawFromWorkstream(1)).to.not.be.reverted;

    await contractWithUser.commitToWorkstream(1, 50);

    expect(await contractWithUser.getWorkstreamCommitment(user.address, 1)).to.be.eq(50);
    expect(await contractWithUser.balanceOf(user.address, 0)).to.be.eq(50);

    await expect(contractWithOwner.withdrawFromWorkstream(1)).to.be.revertedWithCustomError(fux, "NotContributor");
    await expect(contractWithUser.withdrawFromWorkstream(1)).to.emit(fux, "FuxWithdraw").withArgs(user.address, 1, 50);
    expect(await contractWithUser.balanceOf(user.address, 0)).to.be.eq(100);

    await expect(contractWithUser.withdrawFromWorkstream(1)).to.be.revertedWithCustomError(fux, "NotEnoughFux");
  });
}
