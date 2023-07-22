import { expect } from "chai";
import { ethers } from "hardhat";

import { setupTest } from "../setup";
import { getConstants, getDefaultValues } from "../utils";

export function shouldBehaveLikeFuxSBT(): void {
  describe("FuxSBT", function () {

    it("allows anyone to mint SBT once", async function () {
      // Set up the test environment
      const { fux, user } = await setupTest();
      const contractWithUser = fux.connect(user);
      // Mint FUX SBT for the user

      await expect(contractWithUser.mintFux()).to.emit(fux, "FuxSBTMinted").withArgs(user.address, 2);
      // Attempt to mint FUX tokens again (which should fail)
      await expect(contractWithUser.mintFux()).to.be.revertedWithCustomError(fux, "TokensAlreadyMinted");
      // Check that the user's balance has been updated
      expect(await fux.balanceOf(user.address, 2)).to.be.eq("1");
    });

    it("does not allow transfer or batch transfer of FUX SBT", async function () {
      // Set up the test environment
      const { fux, user, owner } = await setupTest();
      const contractWithUser = fux.connect(user);

      // Mint FUX tokens and SBT for the user
      await expect(contractWithUser.mintFux()).to.emit(fux, "FuxSBTMinted").withArgs(user.address, 2);

      // Attempt to transfer FUX SBT to the owner (which should fail)
      await expect(
        contractWithUser.safeTransferFrom(user.address, owner.address, 2, 1, []),
      ).to.be.revertedWithCustomError(fux, "NotAllowed");

      // Attempt to batch transfer FUX tokens to the owner (which should fail)
      await expect(
        contractWithUser.safeBatchTransferFrom(user.address, owner.address, [2, 1], [10, 10], []),
      ).to.be.revertedWithCustomError(fux, "NotAllowed");

      //TODO double check on no alternative way to burn
    });
    
    it("should have an initial URI set", async function () {
    // Set up the test environment
    const { fux, user, owner } = await setupTest();
    const contractWithUser = fux.connect(user);

    // Mint FUX tokens and SBT for the user
    await expect(contractWithUser.mintFux()).to.emit(fux, "FuxSBTMinted").withArgs(user.address, 2);

    // Decode the URI
    const decodedData = Buffer.from((await fux.uri(2)).split(',')[1], 'base64');
    const jsonObject = JSON.parse(decodedData.toString());

    // For a new user they should have 0 vFux, 0 active workstreams, 0 completed workstreams, and 0 committed FUX tokens
    await expect(jsonObject.image).to.be.eq(`ipfs://QmNXwWzzZGvS3sp9JChSArdrZ7p8eo7QjBiW499yBBXRD3?vfux=0&currentwork=0&completework=0&percentage=0&address=${user.address.toLowerCase()}`);
    
  });

  it("should have an updated URI when committed to a workstream", async function () {
    // Set up the test environment
    const { fux, owner, user } = await setupTest();
    const { TOKENS } = getConstants();
    const { name, deadline, coordinatorCommitment, rewardTokens, rewardAmounts, metadataURI } = getDefaultValues();

    const contractWithUser = fux.connect(user);

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
    // Decode the URI
    const decodedData = Buffer.from((await fux.uri(2)).split(',')[1], 'base64');
    const jsonObject = JSON.parse(decodedData.toString());

    // The user should now have 0 vFux, 1 active workstreams, 0 completed workstreams, and 50 available FUX tokens
    await expect(jsonObject.image).to.be.eq(`ipfs://QmNXwWzzZGvS3sp9JChSArdrZ7p8eo7QjBiW499yBBXRD3?vfux=0&currentwork=1&completework=0&percentage=50&address=${user.address.toLowerCase()}`);
    
  });
  });

  
}
