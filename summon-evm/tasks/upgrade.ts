import { task } from "hardhat/config";

task("upgrade", "Upgrade implementation contract and verify")
  .addParam("proxy", "Provider proxy address")
  .setAction(async ({ proxy }, { ethers, upgrades }) => {
    const FUX = await ethers.getContractFactory("FUX");

    // Validate (redundant?)
    console.log("Validating upgrade..");
    await upgrades.validateUpgrade(proxy, FUX).then(() => console.log("Valid upgrade. Deploying.."));

    // Upgrade
    const fuxUpgrade = await upgrades.upgradeProxy(proxy, FUX, {
      kind: "uups",
      unsafeAllow: ["constructor"],
    });
    await fuxUpgrade.deployed();
    console.log(`FUX at proxy address ${fuxUpgrade.address} was upgraded`);

    try {
      const code = await fuxUpgrade.instance?.provider.getCode(fuxUpgrade.address);
      if (code === "0x") {
        console.log(`${fuxUpgrade.name} contract upgrade has not completed. waiting to verify...`);
        await fuxUpgrade.instance?.deployed();
      }
      await hre.run("verify:verify", {
        address: fuxUpgrade.address,
      });
    } catch ({ message }) {
      if ((message as string).includes("Reason: Already Verified")) {
        console.log("Reason: Already Verified");
      }
      console.error(message);
    }
  });
