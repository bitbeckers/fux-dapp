import { expect } from "chai";
import { ethers } from "ethers";

import setupTest from "../setup";

export function shouldBehaveLikeERC20Token(): void {
  it("is ownable", async function () {
    const { token, deployer, owner } = await setupTest();

    expect(await token.owner()).to.not.be.eq(deployer.address);
    expect(await token.owner()).to.be.eq(owner.address);
  });

  it("allows for transfering the ownership", async function () {
    const { token, owner, user } = await setupTest();

    await owner.token.transferOwnership(user.address);

    expect(await token.owner()).to.not.be.eq(owner.address);
    expect(await token.owner()).to.be.eq(user.address);
  });

  it("only allows the owner to mint new tokens", async function () {
    const { token, deployer, user, owner } = await setupTest();

    await expect(deployer.token.mint(user.address, ethers.utils.parseEther("10"))).to.be.revertedWith(
      "Ownable: caller is not the owner",
    );

    await expect(owner.token.mint(user.address, ethers.utils.parseEther("666")))
      .to.emit(token, "Transfer")
      .withArgs("0x0000000000000000000000000000000000000000", user.address, ethers.utils.parseEther("666"));
  });
}
