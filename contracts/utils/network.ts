export function nodeUrl(chain: string): string {
  let uri = "";

  switch (chain) {
    case "hardhat":
      uri = "http://localhost:8545";
      break;
    case "localhost":
      uri = "http://127.0.0.1:8545";
      break;
    default:
      const infuraApiKey = process.env.INFURA_API_KEY;
      if (!infuraApiKey) {
        throw new Error("Please set your INFURA_API_KEY in a .env file");
      }
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
  if (!mnemonic) {
    return "test test test test test test test test test test test junk";
  }
  return mnemonic;
}

export function accounts(networkName: string): { mnemonic: string } {
  return { mnemonic: getMnemonic(networkName) };
}
