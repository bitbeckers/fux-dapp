import { expect } from "chai";

import setupTest from "../setup";
import { shouldBehaveLikeERC721NFT } from "./nft.behavior";

describe("Unit tests", function () {
  describe("ERC721 NFTs", function () {
    it("is a basic ERC721 instance", async () => {
      const { nft } = await setupTest();
      expect(await nft.name()).to.be.eq("MockNFT");
      expect(await nft.symbol()).to.be.eq("MFT");
      expect(await nft.baseUri()).to.be.eq(
        "https://gateway.pinata.cloud/ipfs/QmaUK792RLARk4y3yZww1tnvu5GGAXdVqKYVr76dwrHVfp/",
      );
    });

    shouldBehaveLikeERC721NFT();
  });
});
