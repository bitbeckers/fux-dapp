import FUX_ABI from "../../contracts/abis/contracts/FUX.sol/FUX.json";
import ERC20_ABI from "../resources/ERC20.json";
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
    {
      name: "NEXT_PUBLIC_WC_PROJECT_ID",
      value: process.env["NEXT_PUBLIC_WC_PROJECT_ID"],
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
  erc20: ERC20_ABI,
};

export const defaultChain = process.env["NEXT_PUBLIC_DEFAULT_CHAIN"];

export const useConstants = () => {
  const { chain } = useNetwork();

  const nativeToken = getNativeToken(chain?.id);

  return {
    nativeToken,
  };
};

const getNativeToken = (chainID?: number) => {
  let symbol = "";
  let name = "";
  switch (chainID) {
    case 1:
      name = "Ethereum";
      symbol = "ETH";
      break;
    case 5:
      name = "Goerli";
      symbol = "gETH";
      break;
    case 1337:
      name = "Localhost";
      symbol = "hhETH";
      break;
    default:
      name = "N/A";
      symbol = "N/A";
  }

  return { name, symbol };
};
