import * as GraphClient from "../.graphclient";
import Header from "../components/Header";
import { theme } from "../theme";
import { chains, wagmiClient } from "../utils/wagmi";
import { ChakraProvider, Flex, Spacer } from "@chakra-ui/react";
import { graphExchange } from "@graphprotocol/client-urql";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { createClient, Provider as GraphProvider } from "urql";
import { WagmiConfig } from "wagmi";

const client = createClient({
  url: "http://localhost:4000/graphql",
  exchanges: [graphExchange(GraphClient)],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
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
              <Component {...pageProps} />
              <Spacer />
            </Flex>
          </GraphProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default MyApp;
