import * as dotenv from "dotenv";

dotenv.config();

export function nodeUrl(chain: string): string {
  let uri = "";
  const infuraApiKey = process.env.INFURA_API_KEY || "";

  switch (chain) {
    case "avalanche":
      uri = "https://api.avax.network/ext/bc/C/rpc";
      break;
    case "bsc":
      uri = "https://bsc-dataseed1.binance.org";
      break;
    case "hardhat":
      uri = "http://localhost:8545";
      break;
    case "localhost":
      uri = "http://localhost:8545";
      break;
    default:
      uri = "https://" + chain + ".infura.io/v3/" + infuraApiKey;
  }

  return uri;
}

export function getMnemonic(networkName: string): string {
  if (networkName) {
    const mnemonic = process.env["MNEMONIC_" + networkName.toUpperCase()];
    if (mnemonic && mnemonic !== "") {
      return mnemonic;
    }
  }

  const mnemonic = process.env.MNEMONIC;
  if (!mnemonic || mnemonic === "") {
    return "test test test test test test test test test test test junk";
  }
  return mnemonic;
}

export function accounts(networkName: string): { mnemonic: string } {
  return { mnemonic: getMnemonic(networkName) };
}
