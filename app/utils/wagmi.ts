import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createClient } from "wagmi";
import { goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

export const { chains, provider } = configureChains(
  [goerli],
  [alchemyProvider({ apiKey: ALCHEMY_API_KEY! }), publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [metaMaskWallet({ chains }), walletConnectWallet({ chains })],
  },
  {
    groupName: "Others",
    wallets: [injectedWallet({ chains }), rainbowWallet({ chains })],
  },
]);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
