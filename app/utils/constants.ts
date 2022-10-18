import { useWallet } from "@raidguild/quiver";

export const checkEnvVarConfig = () => {
  const requiredEnvVarNames = [
    {
      name: "NEXT_PUBLIC_CONTRACT_ADDRESS_FUX",
      value: process.env["NEXT_PUBLIC_CONTRACT_ADDRESS_FUX"],
    },
    {
      name: "NEXT_PUBLIC_DEFAULT_CHAIN",
      value: process.env["NEXT_PUBLIC_DEFAULT_CHAIN"],
    },
  ];

  requiredEnvVarNames.forEach((envVarConfig) => {
    if (envVarConfig.value === undefined) {
      throw new Error(
        `Environment variable ${envVarConfig.name} is required for starting the application`
      );
    }
  });
};
checkEnvVarConfig();

export const contractAddresses = {
  fuxContractAddress: process.env["NEXT_PUBLIC_CONTRACT_ADDRESS_FUX"]!,
};

export const defaultChain = process.env["NEXT_PUBLIC_DEFAULT_CHAIN"];

export const useConstants = () => {
  const { chainId } = useWallet();

  const nativeToken = getNativeSymbol(chainId || "");

  return {
    nativeToken,
  };
};

const getNativeSymbol = (chainID: string) => {
  let symbol = "";
  switch (chainID) {
    case "0x1":
      symbol = "ETH";
      break;
    case "0x5":
      symbol = "gETH";
      break;
    case "0x539":
      symbol = "hhETH";
      break;
    default:
      symbol = "N/A";
  }

  return symbol;
};
