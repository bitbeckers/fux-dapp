import ConnectWallet from "../ConnectWallet";
import WorkstreamModal from "../WorkstreamModal";
import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Link,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import NextLink from "next/link";

const Header: React.FC<{}> = () => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      // flex="column"
      w={"100%"}
      as="nav"
      // p={{ base: 3, lg: 6 }}
      // align="center"
      justify="center"
      bg="#221527"
      flexWrap="wrap"
      // gap={"1em"}
    >
      <Flex
        maxW="1200px"
        width="100%"
        direction={{ base: "column", md: "row" }}
        p={{ base: 3, lg: 6 }}
        align="center"
        // justifyContent=""
        flexWrap="wrap"
        gap={"1em"}
      >
        <Center gap={"3em"} justifyItems={"center"}>
          <NextLink href="/" passHref>
            <Link>
              <Heading
                fontSize="6xl"
                fontWeight="900"
                fontFamily=""
                color="primary"
              >
                FUX
              </Heading>
            </Link>
          </NextLink>
          {isSmallScreen ? undefined : (
            <WorkstreamModal onCloseAction={() => {}} />
          )}
        </Center>
        <Flex gap={"2em"} order={{ base: 0, sm: 1, md: 0 }} margin={"auto"}>
          <NextLink href="/workstreams" passHref>
            <Link>
              <Text fontSize="lg" color="primary">
                WORKSTREAMS
              </Text>
            </Link>
          </NextLink>
          <NextLink href="/history" passHref>
            <Link>
              <Text fontSize="lg" color="primary">
                HISTORY
              </Text>
            </Link>
          </NextLink>
        </Flex>
        <ConnectWallet />
      </Flex>
      <Box w="100%" h="1px" bg="gray.200" mt={0} />
    </Flex>
  );
};

export default Header;
