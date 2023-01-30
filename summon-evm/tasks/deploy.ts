import { task } from "hardhat/config";

task("deploy", "Deploy contracts and verify").setAction(async ({}, { ethers, upgrades }) => {
  const FUX = await ethers.getContractFactory("FUX");
  const fux = await upgrades.deployProxy(FUX, {
    kind: "uups",
    unsafeAllow: ["constructor"],
  });
  await fux.deployed();
  console.log(`FUX is deployed to proxy address: ${fux.address}`);

  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    try {
      const code = await fux.instance?.provider.getCode(fux.address);
      if (code === "0x") {
        console.log(`${fux.name} contract deployment has not completed. waiting to verify...`);
        await fux.instance?.deployed();
      }
      await hre.run("verify:verify", {
        address: fux.address,
      });
    } catch ({ message }) {
      if ((message as string).includes("Reason: Already Verified")) {
        console.log("Reason: Already Verified");
      }
      console.error(message);
    }
  }
});
