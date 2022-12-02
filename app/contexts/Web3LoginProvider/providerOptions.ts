import { defaultChain } from "../../utils/constants";
import { NetworkConfig } from "@raidguild/quiver";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { IProviderOptions } from "web3modal";

export const NETWORKS: NetworkConfig = {
  // "0x1": {
  //   chainId: "0x1",
  //   name: "Mainnet",
  //   symbol: "ETH",
  //   explorer: "https://etherscan.io/",
  //   rpc: "https://mainnet.infura.io/v3/e039ebf983d0477ca69a543b1c62101a",
  // },
  "0x5": {
    chainId: "0x5",
    name: "Goerli",
    symbol: "ETH",
    explorer: "https://goerli.etherscan.io/",
    rpc: `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  },
  "0x539": {
    chainId: "0x539",
    name: "Hardhat",
    symbol: "ETH",
    explorer: "http://localhost:1234/",
    rpc: "http://localhost:8545",
  },
};

export const providerOptions: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        // 1: NETWORKS["0x1"].rpc,
        5: NETWORKS["0x5"].rpc,
        1337: NETWORKS["0x539"].rpc,
      },
    },
  },
};

export const WEB3_MODAL_OPTIONS = {
  cacheProvider: true,
  providerOptions,
  theme: "dark",
};
