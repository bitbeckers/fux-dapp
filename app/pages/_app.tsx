import Header from "../components/Header";
import Fonts from "../fonts";
import { theme } from "../theme";
import "./index.css";
import { ChakraProvider, Flex, Spacer, VStack } from "@chakra-ui/react";
import {
  darkTheme,
  RainbowKitProvider,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { goerli } from "viem/chains";
import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { SafeConnector } from "wagmi/connectors/safe";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const WC_PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli, mainnet],
  [alchemyProvider({ apiKey: ALCHEMY_API_KEY! }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "FUX Dapp",
  projectId: WC_PROJECT_ID!,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            chains={chains}
            theme={darkTheme({
              accentColor: "#8E4EC6",
              accentColorForeground: "white",
              borderRadius: "none",
              fontStack: "system",
              overlayBlur: "small",
            })}
          >
            <Flex direction="column" align="center" minH="100vh" w="100%">
              <Header />
              <VStack w="100%" minW="100vw">
                <Component {...pageProps} />
              </VStack>
              <Spacer />
            </Flex>
          </RainbowKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
