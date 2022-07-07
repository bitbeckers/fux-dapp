import { expect } from "chai";
import { ethers } from "hardhat";

import setupTest from "../setup";

export function shouldBehaveLikeStakingPoolRBAC(): void {
  it("Support admin role", async function () {
    const { owner, user, staking, deployer } = await setupTest();

    const DEFAULT_ADMIN_ROLE = "0x0000000000000000000000000000000000000000000000000000000000000000"; //DEFAULT ADMIN ROLE IS 0x00

    expect(await staking.hasRole(DEFAULT_ADMIN_ROLE, owner.address)).to.be.true;
    expect(await staking.hasRole(DEFAULT_ADMIN_ROLE, deployer.address)).to.be.false;

    await expect(deployer.staking.grantRole(DEFAULT_ADMIN_ROLE, user.address)).to.be.revertedWith(
      `AccessControl: account ${deployer.address.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`,
    );

    await expect(owner.staking.grantRole(DEFAULT_ADMIN_ROLE, user.address))
      .to.emit(staking, "RoleGranted")
      .withArgs(DEFAULT_ADMIN_ROLE, user.address, owner.address);
  });

  it("Support config role", async function () {
    const { owner, user, staking } = await setupTest();

    const CONFIG_ROLE = ethers.utils.id("CONFIG_ROLE");

    expect(await staking.hasRole(CONFIG_ROLE, owner.address)).to.be.true;
    expect(await staking.hasRole(CONFIG_ROLE, user.address)).to.be.false;

    await expect(user.staking.pause()).to.be.revertedWith(
      `AccessControl: account ${user.address.toLowerCase()} is missing role ${CONFIG_ROLE}`,
    );

    await expect(owner.staking.pause()).to.emit(staking, "Paused").withArgs(owner.address);

    await expect(user.staking.unpause()).to.be.revertedWith(
      `AccessControl: account ${user.address.toLowerCase()} is missing role ${CONFIG_ROLE}`,
    );

    await expect(owner.staking.unpause()).to.emit(staking, "Unpaused").withArgs(owner.address);
  });

  it("Supports a role admin", async function () {
    const { owner, user, staking } = await setupTest();

    const CONFIG_ROLE = ethers.utils.id("CONFIG_ROLE");
    const DEFAULT_ADMIN_ROLE = "0x0000000000000000000000000000000000000000000000000000000000000000"; //DEFAULT ADMIN ROLE IS 0x00

    expect(await staking.getRoleAdmin(CONFIG_ROLE)).to.be.eq(DEFAULT_ADMIN_ROLE);
  });
}
