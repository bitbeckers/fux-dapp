import { expect } from "chai";
import { ethers, getNamedAccounts } from "hardhat";

import { shouldBehaveLikeFuxToken } from "./fux.token.behavior";
import setupTest from "../setup";
import { shouldBehaveLikeFuxWorkstream } from "./fux.workstream.behavior";
import { shouldBehaveLikeFuxContributor } from "./fux.contributor.behavior";

describe("Unit tests", function () {
  describe("ERC1155 Token", function () {
    it("is a basic ERC1155 token", async () => {
      const { fux } = await setupTest();

      expect(await fux.uri(0)).to.be.eq("");
    });

    shouldBehaveLikeFuxToken();
    shouldBehaveLikeFuxWorkstream();
    shouldBehaveLikeFuxContributor();
  });
});
