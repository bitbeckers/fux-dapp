import { expect } from "chai";
import { DateTime } from "luxon";

import setupTest from "../setup";

export function shouldBehaveLikeFuxWorkstream(): void {
  it("allows anyone to mint a workstream", async function () {
    const { fux, deployer, owner, user } = await setupTest();

    await expect(
      user.fux.mintWorkstream(
        "Test",
        [deployer.address, owner.address],
        DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
      ),
    )
      .to.emit(fux, "WorkstreamMinted")
      .withArgs(0, "http://example.com");

    await expect(
      user.fux.mintWorkstream(
        "Test",
        [deployer.address, owner.address],
        DateTime.now().plus({ days: 7 }).toSeconds().toFixed(),
      ),
    )
      .to.emit(fux, "WorkstreamMinted")
      .withArgs(1, "http://example.com");
  });
}
