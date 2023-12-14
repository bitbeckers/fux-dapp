import Header from "../components/Header";
import Fonts from "../fonts";
import { theme } from "../theme";
import { assertExists } from "../utils/helpers";
import "./index.css";
import { ChakraProvider, Flex, Spacer, VStack } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import type { AppProps } from "next/app";
import { goerli } from "viem/chains";
import { WagmiConfig, createConfig, mainnet } from "wagmi";

const ALCHEMY_API_KEY = assertExists(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY);
const WC_PROJECT_ID = assertExists(process.env.NEXT_PUBLIC_WC_PROJECT_ID);

const chains = [goerli, mainnet];

const wagmiConfig = createConfig(
  getDefaultConfig({
    chains,

    // Required API Keys
    alchemyId: ALCHEMY_API_KEY, // or infuraId
    walletConnectProjectId: WC_PROJECT_ID,

    // Required
    appName: "FUX",

    // Optional
    appDescription: "FUX",
    appUrl: "https://fux.gg", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={wagmiConfig}>
          <ConnectKitProvider>
            <Flex direction="column" align="center" minH="100vh" w="100%">
              <Header />
              <VStack w="100%" minW="100vw">
                <Component {...pageProps} />
              </VStack>
              <Spacer />
            </Flex>
          </ConnectKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
