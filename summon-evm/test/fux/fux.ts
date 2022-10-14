import { expect } from "chai";

import setupTest from "../setup";
import { shouldBehaveLikeFuxContributor } from "./fux.contributor.behavior";
import { shouldBehaveLikeFuxEvaluation } from "./fux.evaluation.behavior";
import { shouldBehaveLikeFuxToken } from "./fux.token.behavior";
import { shouldBehaveLikeFuxWorkstream } from "./fux.workstream.behavior";

describe("Unit tests", function () {
  describe("ERC1155 Token", function () {
    it("is a basic ERC1155 token", async () => {
      const { fux } = await setupTest();

      // The ERC-165 identifier for this interface is 0xd9b67a26.
      expect(await fux.supportsInterface("0xd9b67a26")).to.be.true;
      expect(await fux.uri(0)).to.be.eq("");
    });

    shouldBehaveLikeFuxToken();
    shouldBehaveLikeFuxWorkstream();
    shouldBehaveLikeFuxContributor();
    shouldBehaveLikeFuxEvaluation();
  });
});
