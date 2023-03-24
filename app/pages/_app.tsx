import * as GraphClient from "../.graphclient";
import Header from "../components/Header";
import { theme } from "../theme";
import Fonts from "../fonts";
import { chains, wagmiClient } from "../utils/wagmi";
import { ChakraProvider, Flex, Spacer, VStack } from "@chakra-ui/react";
import { graphExchange } from "@graphprotocol/client-urql";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { createClient, Provider as GraphProvider } from "urql";
import { WagmiConfig } from "wagmi";
import './index.css';

const client = createClient({
  url: "http://localhost:4000/graphql",
  exchanges: [graphExchange(GraphClient)],
});

function MyApp({ Component, pageProps }: AppProps) {
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
              <VStack pb={50} w="100%">
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
