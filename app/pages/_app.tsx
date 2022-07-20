import Header from "../components/Header";
import { Web3LoginProvider } from "../contexts/Web3LoginProvider";
import { theme } from "../theme";
import { urls } from "../utils/constants";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ChakraProvider, Flex, Spacer } from "@chakra-ui/react";
import type { AppProps } from "next/app";

const graphClient = new ApolloClient({
  uri: urls.graphUrl,

  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Web3LoginProvider>
        <ApolloProvider client={graphClient}>
          <Flex
            direction="column"
            align="center"
            minH="100vh"
            w="100%"
          >
            <Header />
            <Component {...pageProps} />
            <Spacer />
          </Flex>
        </ApolloProvider>
      </Web3LoginProvider>
    </ChakraProvider>
  );
}

export default MyApp;
