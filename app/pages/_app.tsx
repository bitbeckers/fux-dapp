import Header from "../components/Header";
import Fonts from "../fonts";
import { theme } from "../theme";
import "./index.css";
import { ChakraProvider, Flex, Spacer, VStack } from "@chakra-ui/react";
import {
  darkTheme,
  RainbowKitProvider,
  connectorsForWallets,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { createClient, configureChains, WagmiConfig } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
const WC_PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID;

export const { chains, provider } = configureChains(
  [goerli, mainnet],
  [alchemyProvider({ apiKey: ALCHEMY_API_KEY! }), publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: "FUX Dapp",
  projectId: WC_PROJECT_ID!,
  chains,
});

const connectors = connectorsForWallets([...wallets]);

export const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    wagmiClient.autoConnect();
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <QueryClientProvider client={queryClient}>
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
            <Flex direction="column" align="center" minH="100vh" w="100%">
              <Header />
              <VStack pb={75} w="100%" minW="100vw">
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
