import { expect } from "chai";
import { ethers } from "hardhat";
import { DateTime } from "luxon";

import { setupTest } from "../setup";

export function shouldBehaveLikeFuxWorkstreamFunding(): void {
  it("allows creator to fund a workstream with native token", async function () {
    const { fux, deployer, owner, user } = await setupTest();
    const contractWithUser = fux.connect(user);

    expect(await ethers.provider.getBalance(fux.address)).to.be.eql(ethers.utils.parseEther("0"));

    const deadline = DateTime.now().plus({ days: 7 }).toSeconds().toFixed();
    const funding = ethers.utils.parseEther("10");

    await contractWithUser.mintFux();
    await expect(
      contractWithUser.mintWorkstream("Test", [user.address, deployer.address, owner.address], 10, deadline, {
        value: funding,
      }),
    )
      .to.emit(fux, "WorkstreamMinted")
      .withArgs(1, funding, deadline, "");

    const workstream = await fux.getWorkstreamByID(1);

    expect(workstream.funds).to.be.eql(ethers.utils.parseEther("10"));
    expect(await ethers.provider.getBalance(fux.address)).to.be.eql(ethers.utils.parseEther("10"));
  });

  it("allows creator to allocate contributor funds", async function () {
    const { fux, deployer, owner, user } = await setupTest();
    const contractWithUser = fux.connect(user);
    const contractWithDeployer = fux.connect(deployer);
    const contractWithOwner = fux.connect(owner);

    expect(await ethers.provider.getBalance(fux.address)).to.be.eql(ethers.utils.parseEther("0"));
    await contractWithUser.mintFux();

    await contractWithUser.mintWorkstream(
      "Test",
      [user.address, deployer.address, owner.address],
      10,
      DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
      {
        value: ethers.utils.parseEther("10"),
      },
    );

    await contractWithUser.commitToWorkstream(1, 1);
    await contractWithUser.mintVFux(1);

    await contractWithDeployer.mintFux();
    await contractWithDeployer.commitToWorkstream(1, 50);

    await contractWithOwner.mintFux();
    await contractWithOwner.commitToWorkstream(1, 50);

    await contractWithUser.resolveValueEvaluation(1, [deployer.address, owner.address], [60, 40]);

    expect(await fux.getAvailableBalance(deployer.address)).to.be.eql(ethers.utils.parseEther("6"));
    expect(await fux.getAvailableBalance(owner.address)).to.be.eql(ethers.utils.parseEther("4"));
  });
}
