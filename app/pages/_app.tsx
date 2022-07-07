import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Web3LoginProvider } from "../contexts/Web3LoginProvider";
import { urls } from "../utils/constants";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { RGThemeProvider, Flex, Spacer } from "@raidguild/design-system";
import type { AppProps } from "next/app";

const graphClient = new ApolloClient({
  uri: urls.graphUrl,

  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RGThemeProvider>
      <Web3LoginProvider>
        <ApolloProvider client={graphClient}>
          <Flex
            direction="column"
            align="center"
            minH="100vh"
            w="100%"
            bg={"gray.800"}
          >
            <Header />
            <Component {...pageProps} />
            <Spacer />

            <Footer />
          </Flex>
        </ApolloProvider>
      </Web3LoginProvider>
    </RGThemeProvider>
  );
}

export default MyApp;
