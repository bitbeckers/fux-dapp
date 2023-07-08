import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import { config as dotenvConfig } from "dotenv";
import "hardhat-abi-exporter";
import "hardhat-contract-sizer";
import { HardhatUserConfig } from "hardhat/config";
import { HardhatNetworkUserConfig, NetworkUserConfig } from "hardhat/types";
import { resolve } from "path";
import "solidity-docgen";

import "./tasks";
import { accounts, nodeUrl } from "./utils/network";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const chainIds = {
  hardhat: 1337,
  localhost: 1337,
  mainnet: 1,
  "polygon-mainnet": 137,
  "polygon-mumbai": 80001,
  goerli: 5,
};

function getChainConfig(chain: keyof typeof chainIds): NetworkUserConfig {
  if (chain === "hardhat") {
    return {
      accounts: {
        count: 10,
        ...accounts(chain),
        path: "m/44'/60'/0'/0",
      },
      chainId: chainIds[chain],
    };
  }

  if (chain === "localhost") {
    return {
      accounts: {
        count: 10,
        ...accounts(chain),
        path: "m/44'/60'/0'/0",
      },
      chainId: chainIds[chain],
      url: nodeUrl(chain),
    };
  }

  return {
    accounts: [process.env.DEPLOY_PK || "0xa2e0097c961c67ec197b6865d7ecea6caffc68ebeb00e6050368c8f67fc9c588"],
    chainId: chainIds[chain],
    url: nodeUrl(chain),
  };
}

const config: HardhatUserConfig = {
  abiExporter: [
    { path: "abis", runOnCompile: true, clear: true },
    {
      path: "../graph/abis",
      runOnCompile: true,
      clear: false,
    },
  ],
  contractSizer: {
    runOnCompile: true,
    strict: true,
  },
  defaultNetwork: "hardhat",
  docgen: { outputDir: "../docs/docs/Solidity" },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY || "",
      polygon: process.env.POLYGONSCAN_API_KEY || "",
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",
      goerli: process.env.ETHERSCAN_API_KEY || "",
    },
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 12,
    coinmarketcap: process.env.CMC_API_KEY || "",
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: "./contracts",
  },
  networks: {
    hardhat: {
      ...(getChainConfig("hardhat") as HardhatNetworkUserConfig),
    },
    localhost: getChainConfig("localhost"),
    mainnet: getChainConfig("mainnet"),
    goerli: getChainConfig("goerli"),
    "polygon-mainnet": getChainConfig("polygon-mainnet"),
    "polygon-mumbai": getChainConfig("polygon-mumbai"),
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.13",
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/solidity-template/issues/31
        bytecodeHash: "none",
      },
      // Disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 2500,
      },
    },
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5",
  },
};

export default config;
