import { task } from "hardhat/config";

task("deploy", "Deploy contracts and verify").setAction(async ({}, { viem, network, run }) => {
  const fux = await viem.deployContract("FUX");

  console.log(`Deploying to network ${network.name}`);

  console.log(`FUX is deployed to proxy address: ${fux.address}`);

  if (!["hardhat", "localhost"].includes(network.name)) {
    console.log(`Verifying contract ${fux.address} on ${network.name}`);

    try {
      const code = await viem.publicClient.getBytecode(fux.address);
      if (code === "0x") {
        console.log(`${fux.name} contract deployment has not completed. waiting to verify...`);
        await fux.instance?.deployed();
      }
      await run("verify:verify", {
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
