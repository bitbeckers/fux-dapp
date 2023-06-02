import { expect } from "chai";

import { setupTest } from "../setup";
import { shouldBehaveLikeFuxContributor } from "./fux.contributor.behavior";
import { shouldBehaveLikeFuxEvaluation } from "./fux.evaluation.behavior";
import { shouldBehaveLikeFuxCanFinalize } from "./fux.finalize.behavior";
import { shouldBehaveLikeFuxToken } from "./fux.token.behavior";
import { shouldBehaveLikeFuxWorkstream } from "./fux.workstream.behavior";
import { shouldBehaveLikeFuxWorkstreamFunding } from "./fux.workstream.funding.behavior";

describe("Unit tests", function () {
  describe("ERC1155 Token", function () {
    it("is a basic ERC1155 token", async () => {
      const { fux } = await setupTest();

      // The ERC-165 identifier for interface EIP1155 is 0xd9b67a26.
      expect(await fux.supportsInterface("0xd9b67a26")).to.be.true;
      expect(await fux.uri(0)).to.be.eq("");

      await expect(fux.initialize()).to.be.revertedWith("Initializable: contract is already initialized");
    });

    shouldBehaveLikeFuxToken();
    shouldBehaveLikeFuxWorkstream();
    shouldBehaveLikeFuxContributor();
    shouldBehaveLikeFuxEvaluation();
    shouldBehaveLikeFuxCanFinalize();
    shouldBehaveLikeFuxWorkstreamFunding();
  });
});
