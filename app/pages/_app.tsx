import Header from "../components/Header";
import { Web3LoginProvider } from "../contexts/Web3LoginProvider";
import { theme } from "../theme";
import { ChakraProvider, Flex, Spacer } from "@chakra-ui/react";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Web3LoginProvider>
        <Flex direction="column" align="center" minH="100vh" w="100%">
          <Header />
          <Component {...pageProps} />
          <Spacer />
        </Flex>
      </Web3LoginProvider>
    </ChakraProvider>
  );
}

export default MyApp;
