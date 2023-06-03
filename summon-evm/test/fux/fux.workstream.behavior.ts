import { expect } from "chai";
import { ethers } from "hardhat";
import { DateTime } from "luxon";

import { setupTest } from "../setup";
import { getConstants } from "../utils";

export function shouldBehaveLikeFuxWorkstream(): void {
  const { TOKENS } = getConstants();
  it("allows any fuxxer to mint a workstream", async function () {
    const { fux, deployer, owner, user } = await setupTest();
    const contractWithUser = fux.connect(user);

    const deadline = DateTime.now().plus({ days: 7 }).toSeconds().toFixed();

    // Test that minting a workstream fails without FUX tokens
    await expect(
      contractWithUser.mintWorkstream(
        "Test",
        [user.address, deployer.address, owner.address],
        10,
        deadline,
        [],
        [],
        "",
      ),
    ).to.be.revertedWith("FUX: insufficient balance");

    // Mint FUX tokens
    await contractWithUser.mintFux();

    // Test that minting a workstream succeeds with FUX tokens and no funding
    await expect(
      contractWithUser.mintWorkstream(
        "Test",
        [user.address, deployer.address, owner.address],
        10,
        deadline,
        [],
        [],
        "",
      ),
    )
      .to.emit(fux, "WorkstreamMinted")
      .withArgs(1, deadline, [], [], "");

    const funding = ethers.utils.parseEther("1");

    // Test that minting a workstream succeeds with FUX tokens and funding
    await expect(
      contractWithUser.mintWorkstream(
        "Test",
        [user.address, deployer.address, owner.address],
        10,
        deadline,
        [TOKENS.FUX.FUX_TOKEN_ID.toString()],
        [funding],
        "",
        { value: funding },
      ),
    )
      .to.emit(fux, "WorkstreamMinted")
      .withArgs(2, deadline, [TOKENS.FUX.FUX_TOKEN_ID], [funding], "");
  });

  it("allows workstream contributors to commit FUX tokens", async function () {
    // Set up the test environment
    const { fux, owner, user } = await setupTest();
    const contractWithUser = fux.connect(user);
    const contractWithOwner = fux.connect(owner);

    // Mint FUX tokens for the user
    await contractWithUser.mintFux();

    // Mint a workstream for the user
    const deadline = DateTime.now().plus({ days: 7 }).toSeconds().toFixed();
    await contractWithUser.mintWorkstream(
      "Test",
      [user.address],
      10,
      deadline,
      [TOKENS.FUX.FUX_TOKEN_ID.toString()],
      [],
      "",
    );

    // Commit FUX tokens to the workstream as the user
    await expect(contractWithUser.commitToWorkstream(1, 50)).to.emit(fux, "FuxGiven");

    // Check that the user's balance and commitment have been updated
    expect(await contractWithUser.balanceOf(user.address, 1)).to.be.eq(50);
    expect(await contractWithUser.getCommitment(user.address, 1)).to.be.eq(50);

    // Mint FUX tokens for the owner
    await contractWithOwner.mintFux();

    // Attempt to commit FUX tokens to the workstream as the owner (who is not a contributor)
    await expect(contractWithOwner.commitToWorkstream(1, 50)).to.be.revertedWithCustomError(fux, "NotContributor");

    // Add the owner as a contributor to the workstream
    await contractWithUser.addContributors(1, [owner.address]);

    // Commit FUX tokens to the workstream as the owner (now a contributor)
    await expect(contractWithOwner.commitToWorkstream(1, 50)).to.emit(fux, "FuxGiven");

    // Check that the owner's balance and commitment have been updated
    expect(await contractWithOwner.balanceOf(owner.address, 1)).to.be.eq(50);
    expect(await contractWithOwner.getCommitment(owner.address, 1)).to.be.eq(50);
  });

  it("allows workstream contributor to update committed FUX", async function () {
    // Set up the test environment
    const { fux, user } = await setupTest();
    const contractWithUser = fux.connect(user);

    // Mint FUX tokens for the user
    await contractWithUser.mintFux();

    // Mint a workstream for the user
    await contractWithUser.mintWorkstream(
      "Test",
      [user.address],
      10,
      DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
      [TOKENS.FUX.FUX_TOKEN_ID.toString()],
      [],
      "",
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
    const { fux, owner, user } = await setupTest();
    const contractWithUser = fux.connect(user);
    const contractWithOwner = fux.connect(owner);

    // Mint FUX tokens for the user
    await contractWithUser.mintFux();

    // Mint a workstream for the user
    await contractWithUser.mintWorkstream(
      "Test",
      [user.address],
      10,
      DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
      [TOKENS.FUX.FUX_TOKEN_ID.toString()],
      [],
      "",
    );

    // Commit FUX tokens to the workstream as the user
    await expect(contractWithUser.commitToWorkstream(1, 0)).to.not.be.reverted;
    await contractWithUser.commitToWorkstream(1, 50);

    // Check that the user's balance and commitment have been updated
    expect(await contractWithUser.getCommitment(user.address, 1)).to.be.eq(50);
    expect(await contractWithUser.balanceOf(user.address, TOKENS.FUX.FUX_TOKEN_ID)).to.be.eq(50);

    // Attempt to commit FUX tokens to the workstream as the owner (who is not a contributor)
    await expect(contractWithOwner.commitToWorkstream(1, 0)).to.be.revertedWithCustomError(fux, "NotContributor");

    // Add the owner as a contributor to the workstream
    await contractWithUser.addContributors(1, [owner.address]);

    // Withdraw FUX tokens from the workstream as the user
    await expect(contractWithUser.commitToWorkstream(1, 0)).to.emit(fux, "FuxGiven").withArgs(user.address, 1, 0);

    // Check that the user's balance has been updated
    expect(await contractWithUser.balanceOf(user.address, TOKENS.FUX.FUX_TOKEN_ID)).to.be.eq(100);

    // Attempt to withdraw FUX tokens from the workstream again (which should fail)
    await expect(contractWithUser.commitToWorkstream(1, 0)).to.be.revertedWithCustomError(fux, "InvalidInput");
  });
}
