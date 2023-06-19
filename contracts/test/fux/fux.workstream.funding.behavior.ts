import { expect } from "chai";
import { ethers } from "hardhat";
import { DateTime } from "luxon";

import { setupTest } from "../setup";
import { getDefaultValues } from "../utils";

export function shouldBehaveLikeFuxWorkstreamFunding(): void {
  describe("Workstream Funding", () => {
    const { name, deadline, coordinatorCommitment, rewardTokens, rewardAmounts, metadataURI } = getDefaultValues();

    it("allows creator to fund a workstream with native token", async function () {
      const { fux, deployer, owner, user } = await setupTest();

      const contractWithUser = fux.connect(user);

      expect(await ethers.provider.getBalance(fux.address)).to.be.eql(ethers.utils.parseEther("0"));

      const funding = ethers.utils.parseEther("10");

      await contractWithUser.mintFux();
      const contributors = [user.address, deployer.address, owner.address];
      await expect(
        contractWithUser.mintWorkstream(
          name,
          contributors,
          coordinatorCommitment,
          deadline,
          rewardTokens,
          rewardAmounts,
          metadataURI,
          {
            value: funding,
          },
        ),
      )
        .to.emit(fux, "WorkstreamMinted")
        .withArgs(1, deadline, rewardTokens, rewardAmounts, funding, metadataURI);

      expect(await fux.getWorkstreamRewards(1, ethers.constants.AddressZero)).to.be.eql(ethers.utils.parseEther("10"));
      expect(await ethers.provider.getBalance(fux.address)).to.be.eql(ethers.utils.parseEther("10"));
    });

    it("allows creator to allocate contributor funds", async function () {
      const { fux, deployer, owner, user } = await setupTest();
      const contractWithUser = fux.connect(user);
      const contractWithDeployer = fux.connect(deployer);
      const contractWithOwner = fux.connect(owner);

      expect(await ethers.provider.getBalance(fux.address)).to.be.eql(ethers.utils.parseEther("0"));
      await contractWithUser.mintFux();
      await contractWithDeployer.mintFux();
      await contractWithOwner.mintFux();

      const contributors = [user.address, deployer.address, owner.address];

      await contractWithUser.mintWorkstream(
        name,
        contributors,
        coordinatorCommitment,
        deadline,
        rewardTokens,
        rewardAmounts,
        metadataURI,
        {
          value: ethers.utils.parseEther("10"),
        },
      );

      await contractWithUser.commitToWorkstream(1, 1);
      await contractWithDeployer.commitToWorkstream(1, 50);
      await contractWithOwner.commitToWorkstream(1, 50);

      expect(await fux.getWorkstreamRewards(1, ethers.constants.AddressZero)).to.be.eql(ethers.utils.parseEther("10"));

      await expect(() =>
        contractWithUser.finalizeWorkstream(1, [deployer.address, owner.address], [60, 40]),
      ).to.changeEtherBalances(
        [deployer.address, owner.address],
        [ethers.utils.parseEther("6"), ethers.utils.parseEther("4")],
      );
    });
  });
}
