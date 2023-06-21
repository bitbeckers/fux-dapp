import { task } from "hardhat/config";

task("deploy", "Deploy contracts and verify").setAction(async ({}, { ethers, upgrades }) => {
  const signer = ethers.provider.getSigner();
  const FUX = await ethers.getContractFactory("FUX");
  const fux = await upgrades.deployProxy(FUX, {
    kind: "uups",
    unsafeAllow: ["constructor"],
  });

  console.log(`Deploying to network ${hre.network.name} with address ${await signer.getAddress()}`);

  console.log(`FUX is deployed to proxy address: ${fux.address}`);

  if (!["hardhat", "localhost"].includes(hre.network.name)) {
    console.log(`Verifying contract ${fux.address} on ${hre.network.name}`);

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
