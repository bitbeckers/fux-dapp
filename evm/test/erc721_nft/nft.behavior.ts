import { expect } from "chai";

import setupTest from "../setup";

export function shouldBehaveLikeERC721NFT(): void {
  it("is ownable", async function () {
    const { nft, deployer, owner } = await setupTest();

    expect(await nft.owner()).to.not.be.eq(deployer.address);
    expect(await nft.owner()).to.be.eq(owner.address);
  });

  it("allows for transfering the ownership", async function () {
    const { nft, owner, user } = await setupTest();

    await owner.nft.transferOwnership(user.address);

    expect(await nft.owner()).to.not.be.eq(owner.address);
    expect(await nft.owner()).to.be.eq(user.address);
  });

  it("can mint a NFT based on a given ID and only once", async () => {
    const { nft, owner, user } = await setupTest();

    await expect(nft.tokenURI(0)).to.be.reverted;

    await expect(owner.nft.safeMint(user.address, 0, "0.json"))
      .to.emit(nft, "Transfer")
      .withArgs("0x0000000000000000000000000000000000000000", user.address, 0);

    expect(await nft.tokenURI(0)).to.be.eq(
      "https://gateway.pinata.cloud/ipfs/QmaUK792RLARk4y3yZww1tnvu5GGAXdVqKYVr76dwrHVfp/0.json",
    );
    expect(await nft.ownerOf(0)).to.be.eq(user.address);

    await expect(owner.nft.safeMint(user.address, 0, "0.json")).to.be.revertedWith('ERC721: token already minted');
  });
}
