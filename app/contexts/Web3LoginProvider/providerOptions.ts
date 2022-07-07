import { NetworkConfig } from "@raidguild/quiver";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { IProviderOptions } from "web3modal";

export const NETWORKS: NetworkConfig = {
  "0x1": {
    chainId: "0x1",
    name: "Mainnet",
    symbol: "ETH",
    explorer: "https://etherscan.io/",
    rpc: "https://mainnet.infura.io/v3/e039ebf983d0477ca69a543b1c62101a",
  },
  "0x3": {
    chainId: "0x3",
    name: "Ropsten",
    symbol: "ETH",
    explorer: "https://ropsten.etherscan.io/",
    rpc: "https://ropsten.infura.io/v3/e039ebf983d0477ca69a543b1c62101a",
  },
  "0x539": {
    chainId: "0x539",
    name: "Hardhat",
    symbol: "ETH",
    explorer: "http://localhost:1234/",
    rpc: "http://localhost:8545",
  },
  // POLYGON MUMBAI
  "0x13881": {
    chainId: "0x13881",
    name: "Mumbai",
    symbol: "MATIC",
    explorer: "https://mumbai.polygonscan.com/",
    rpc: "https://rpc-mumbai.maticvigil.com/",
  },
};

export const providerOptions: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: NETWORKS["0x1"].rpc,
        3: NETWORKS["0x3"].rpc,
        1337: NETWORKS["0x539"].rpc,
        80001: NETWORKS["0x13881"].rpc,
      },
    },
  },
};

export const WEB3_MODAL_OPTIONS = {
  cacheProvider: true,
  providerOptions,
  theme: "dark",
};

export const DEFAULT_CHAIN_ID = "0x539";
