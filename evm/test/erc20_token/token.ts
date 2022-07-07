import { expect } from "chai";
import { ethers, getNamedAccounts } from "hardhat";

import { shouldBehaveLikeERC20Token } from "./token.behavior";

describe("Unit tests", function () {
  describe("ERC20 Token", function () {
    it("is a basic ERC20 token", async () => {
      const { owner } = await getNamedAccounts();
      const tokenFactory = await ethers.getContractFactory("ERC20_Token");
      const tokenInstance = await tokenFactory.deploy(owner);

      expect(await tokenInstance.name()).to.be.eq("MockRaid");
      expect(await tokenInstance.decimals()).to.be.eq(18);
      expect(await tokenInstance.symbol()).to.be.eq("MRD");
      expect(await tokenInstance.totalSupply()).to.be.eq(0);
    });

    shouldBehaveLikeERC20Token();
  });
});
