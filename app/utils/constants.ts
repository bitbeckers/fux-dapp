import FUX_ABI from "../../contracts/abis/contracts/FUX.sol/FUX.json";
import { useNetwork } from "wagmi";

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
    {
      name: "NEXT_PUBLIC_ALCHEMY_API_KEY",
      value: process.env["NEXT_PUBLIC_ALCHEMY_API_KEY"],
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
  fuxContractAddress: process.env[
    "NEXT_PUBLIC_CONTRACT_ADDRESS_FUX"
  ]! as `0x${string}`,
};

export const contractABI = {
  fux: FUX_ABI,
};

export const defaultChain = process.env["NEXT_PUBLIC_DEFAULT_CHAIN"];

export const useConstants = () => {
  const { chain } = useNetwork();

  const nativeToken = getNativeSymbol(chain?.id);

  return {
    nativeToken,
  };
};

const getNativeSymbol = (chainID?: number) => {
  let symbol = "";
  switch (chainID) {
    case 1:
      symbol = "ETH";
      break;
    case 5:
      symbol = "gETH";
      break;
    case 1337:
      symbol = "hhETH";
      break;
    default:
      symbol = "N/A";
  }

  return symbol;
};
