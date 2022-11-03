import { expect } from "chai";
import { ethers } from "hardhat";
import { DateTime } from "luxon";

import setupTest from "../setup";

export function shouldBehaveLikeFuxWorkstreamFunding(): void {
  it("allows creator to fund a workstream with native token", async function () {
    const { fux, deployer, owner, user } = await setupTest();

    expect(await ethers.provider.getBalance(fux.address)).to.be.eql(ethers.utils.parseEther("0"));

    const deadline = DateTime.now().plus({ days: 7 }).toSeconds().toFixed();
    const funding = ethers.utils.parseEther("10");
    await expect(
      user.fux.mintWorkstream("Test", [deployer.address, owner.address], deadline, {
        value: funding,
      }),
    )
      .to.emit(fux, "WorkstreamMinted")
      .withArgs(0, funding, deadline, "http://example.com");

    const workstream = await fux.getWorkstreamByID(0);

    expect(workstream.funds).to.be.eql(ethers.utils.parseEther("10"));
    expect(await ethers.provider.getBalance(fux.address)).to.be.eql(ethers.utils.parseEther("10"));
  });

  it("allows creator to allocate contributor funds", async function () {
    const { fux, deployer, owner, user } = await setupTest();

    expect(await ethers.provider.getBalance(fux.address)).to.be.eql(ethers.utils.parseEther("0"));

    user.fux.mintWorkstream(
      "Test",
      [user.address, deployer.address, owner.address],
      DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
      {
        value: ethers.utils.parseEther("10"),
      },
    );

    await user.fux.mintFux();
    await user.fux.commitToWorkstream(0, 1);
    await user.fux.mintVFux(0);

    await deployer.fux.mintFux();
    await deployer.fux.commitToWorkstream(0, 50);

    await owner.fux.mintFux();
    await owner.fux.commitToWorkstream(0, 50);

    await user.fux.resolveValueEvaluation(0, [deployer.address, owner.address], [60, 40]);

    expect(await fux.getAvailableBalance(deployer.address)).to.be.eql(ethers.utils.parseEther("6"));
    expect(await fux.getAvailableBalance(owner.address)).to.be.eql(ethers.utils.parseEther("4"));
  });
}
