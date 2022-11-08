import Header from "../components/Header";
import { Web3LoginProvider } from "../contexts/Web3LoginProvider";
import { theme } from "../theme";
import { ChakraProvider, Flex, Spacer } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { createClient, Provider } from "urql";
import { graphExchange } from '@graphprotocol/client-urql'
import * as GraphClient from '../.graphclient'


const client = createClient({
  url: "http://localhost:4000/graphql",
  exchanges: [graphExchange(GraphClient)],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Web3LoginProvider>
        <Provider value={client}>
          <Flex direction="column" align="center" minH="100vh" w="100%">
            <Header />
            <Component {...pageProps} />
            <Spacer />
          </Flex>
        </Provider>
      </Web3LoginProvider>
    </ChakraProvider>
  );
}

export default MyApp;
