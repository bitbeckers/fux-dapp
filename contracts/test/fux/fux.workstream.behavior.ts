import { expect } from "chai";
import { ethers } from "hardhat";

import { setupTest } from "../setup";
import { getConstants, getDefaultValues } from "../utils";

export function shouldBehaveLikeFuxWorkstream(): void {
  const { TOKENS } = getConstants();
  describe("Workstream", () => {
    it("allows any fuxxer to mint a workstream", async function () {
      const { fux, deployer, owner, user } = await setupTest();
      const { name, deadline, coordinatorCommitment, rewardTokens, rewardAmounts, metadataURI } = getDefaultValues();

      const contractWithUser = fux.connect(user);

      // Test that minting a workstream fails without FUX tokens
      await expect(
        contractWithUser.mintWorkstream(
          name,
          [user.address, deployer.address, owner.address],
          coordinatorCommitment,
          deadline,
          rewardTokens,
          rewardAmounts,
          metadataURI,
        ),
      ).to.be.revertedWith("ERC1155: insufficient balance for transfer");

      // Mint FUX tokens
      await contractWithUser.mintFux();

      // Test that minting a workstream succeeds with FUX tokens and no funding
      await expect(
        contractWithUser.mintWorkstream(
          name,
          [user.address, deployer.address, owner.address],
          coordinatorCommitment,
          deadline,
          rewardTokens,
          rewardAmounts,
          metadataURI,
        ),
      )
        .to.emit(fux, "WorkstreamMinted")
        .withArgs(1, deadline, rewardTokens, rewardAmounts, 0, metadataURI);

      const funding = ethers.utils.parseEther("1");

      // Test that minting a workstream succeeds with FUX tokens and funding
      await expect(
        contractWithUser.mintWorkstream(
          name,
          [user.address, deployer.address, owner.address],
          coordinatorCommitment,
          deadline,
          rewardTokens,
          rewardAmounts,
          metadataURI,
          { value: funding },
        ),
      )
        .to.emit(fux, "WorkstreamMinted")
        .withArgs(2, deadline, rewardTokens, rewardAmounts, funding, metadataURI);
    });

    it("allows workstream contributors to commit FUX tokens", async function () {
      // Set up the test environment
      const { fux, owner, user } = await setupTest();
      const { TOKENS } = getConstants();
      const { name, deadline, coordinatorCommitment, rewardTokens, rewardAmounts, metadataURI } = getDefaultValues();

      const contractWithUser = fux.connect(user);
      const contractWithOwner = fux.connect(owner);

      // Mint FUX tokens for the user
      await contractWithUser.mintFux();

      // Mint a workstream for the user
      const contributors = [user.address];

      await contractWithUser.mintWorkstream(
        name,
        contributors,
        coordinatorCommitment,
        deadline,
        rewardTokens,
        rewardAmounts,
        metadataURI,
      ),
        // Commit FUX tokens to the workstream as the user
        await expect(contractWithUser.commitToWorkstream(1, 50)).to.emit(fux, "FuxGiven");

      // Check that the user's balance and commitment have been updated
      expect(await contractWithUser.balanceOf(user.address, TOKENS.FUX.FUX_TOKEN_ID)).to.be.eq(50);
      expect(await contractWithUser.getCommitment(user.address, 1)).to.be.eq(50);

      // Mint FUX tokens for the owner
      await contractWithOwner.mintFux();

      // Attempt to commit FUX tokens to the workstream as the owner (who is not a contributor)
      await expect(contractWithOwner.commitToWorkstream(1, 50)).to.be.revertedWithCustomError(fux, "NotContributor");

      // Add the owner as a contributor to the workstream
      await contractWithUser.updateContributors(1, [owner.address], true);

      // Commit FUX tokens to the workstream as the owner (now a contributor)
      await expect(contractWithOwner.commitToWorkstream(1, 50)).to.emit(fux, "FuxGiven");

      // Check that the owner's balance and commitment have been updated
      expect(await contractWithOwner.balanceOf(owner.address, TOKENS.FUX.FUX_TOKEN_ID)).to.be.eq(50);
      expect(await contractWithOwner.getCommitment(owner.address, 1)).to.be.eq(50);
    });

    it("allows workstream contributor to update committed FUX", async function () {
      // Set up the test environment
      const { fux, user, deployer, owner } = await setupTest();
      const { name, deadline, coordinatorCommitment, rewardTokens, rewardAmounts, metadataURI } = getDefaultValues();

      const contractWithUser = fux.connect(user);

      // Mint FUX tokens for the user
      await contractWithUser.mintFux();

      // Mint a workstream for the user
      await contractWithUser.mintWorkstream(
        name,
        [user.address, deployer.address, owner.address],
        coordinatorCommitment,
        deadline,
        rewardTokens,
        rewardAmounts,
        metadataURI,
      );

      // Commit FUX tokens to the workstream as the user
      await contractWithUser.commitToWorkstream(1, 50);

      // Check that the user's balance and commitment have been updated
      expect(await contractWithUser.getCommitment(user.address, 1)).to.be.eq(50);
      expect(await contractWithUser.balanceOf(user.address, TOKENS.FUX.FUX_TOKEN_ID)).to.be.eq(50);

      // Attempt to commit more FUX tokens than the user has to the workstream (which should fail)
      await expect(contractWithUser.commitToWorkstream(1, 50)).to.be.revertedWithCustomError(fux, "InvalidInput");

      // Commit fewer FUX tokens to the workstream as the user
      await expect(contractWithUser.commitToWorkstream(1, 20)).to.emit(fux, "FuxGiven").withArgs(user.address, 1, 20);

      // Check that the user's balance and commitment have been updated
      expect(await contractWithUser.getCommitment(user.address, 1)).to.be.eq(20);
      expect(await contractWithUser.balanceOf(user.address, TOKENS.FUX.FUX_TOKEN_ID)).to.be.eq(80);

      // Commit more FUX tokens to the workstream as the user
      await expect(contractWithUser.commitToWorkstream(1, 60)).to.emit(fux, "FuxGiven").withArgs(user.address, 1, 60);

      // Check that the user's balance and commitment have been updated
      expect(await contractWithUser.getCommitment(user.address, 1)).to.be.eq(60);
      expect(await contractWithUser.balanceOf(user.address, TOKENS.FUX.FUX_TOKEN_ID)).to.be.eq(40);
    });

    it("allows workstream contributor to withdraw FUX", async function () {
      // Set up the test environment
      const { fux, owner, user, deployer } = await setupTest();
      const { name, deadline, coordinatorCommitment, rewardTokens, rewardAmounts, metadataURI } = getDefaultValues();

      const contractWithUser = fux.connect(user);
      const contractWithOwner = fux.connect(owner);

      // Mint FUX tokens for the user and owner
      await contractWithUser.mintFux();
      await contractWithOwner.mintFux();

      // Mint a workstream for the user
      await contractWithUser.mintWorkstream(
        name,
        [user.address, deployer.address, owner.address],
        coordinatorCommitment,
        deadline,
        rewardTokens,
        rewardAmounts,
        metadataURI,
      );
      // Commit FUX tokens to the workstream as the user
      await expect(contractWithUser.commitToWorkstream(1, 0)).to.not.be.reverted;
      await contractWithUser.commitToWorkstream(1, 50);

      // Commit FUX tokens to the workstream as the owner
      await expect(contractWithOwner.commitToWorkstream(1, 11)).to.not.be.reverted;

      // Check that the user's balance and commitment have been updated
      expect(await contractWithUser.getCommitment(user.address, 1)).to.be.eq(50);
      expect(await contractWithUser.balanceOf(user.address, TOKENS.FUX.FUX_TOKEN_ID)).to.be.eq(50);

      // Remove the owner as a contributor to the workstream
      await contractWithUser.updateContributors(1, [owner.address], false);

      // Attempt to commit FUX tokens to the workstream as the owner
      await expect(contractWithOwner.commitToWorkstream(1, 11)).to.be.revertedWithCustomError(fux, "NotContributor");

      // Withdraw FUX tokens from the workstream as the owner
      await expect(contractWithOwner.withdrawFromWorkstream(1))
        .to.be.emit(fux, "FuxWithdrawn")
        .withArgs(owner.address, TOKENS.FUX.FUX_TOKEN_ID, 11);

      // Attempt to withdraw FUX tokens from the workstream again (which should fail)
      await expect(contractWithOwner.withdrawFromWorkstream(1)).to.be.revertedWithCustomError(fux, "InvalidInput");
    });
  });
}
