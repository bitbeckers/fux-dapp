import * as GraphClient from "../.graphclient";
import Header from "../components/Header";
import Fonts from "../fonts";
import { theme } from "../theme";
import "./index.css";
import { ChakraProvider, Flex, Spacer, VStack } from "@chakra-ui/react";
import { graphExchange } from "@graphprotocol/client-urql";
import {
  connectorsForWallets,
  darkTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import type { AppProps } from "next/app";
import {
  createClient as createGraphClient,
  Provider as GraphProvider,
} from "urql";
import { createClient, configureChains, goerli, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { useEffect } from "react";

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
  autoConnect: false,
  connectors,
  provider,
});

const client = createGraphClient({
  url: "http://localhost:4000/graphql",
  exchanges: [graphExchange(GraphClient)],
});

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    wagmiClient.autoConnect();
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <WagmiConfig client={wagmiClient}>
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
          <GraphProvider value={client}>
            <Flex direction="column" align="center" minH="100vh" w="100%">
              <Header />
              <VStack pb={75} w="100%">
                <Component {...pageProps} />
              </VStack>
              <Spacer />
            </Flex>
          </GraphProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default MyApp;
