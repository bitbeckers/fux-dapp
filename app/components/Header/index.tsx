import ConnectWallet from "../ConnectWallet";
import WorkstreamModal from "../WorkstreamModal";
import {
  Box,
  Center,
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
      w={"100%"}
      as="nav"
      p={{ base: 3, lg: 6 }}
      align="center"
      bg="#221527"
      flexWrap="wrap"
      gap={"1em"}
    >
      <Center gap={"3em"} justifyItems={"center"}>
        <NextLink href="/" passHref>
          <Link>
            <Heading fontSize="6xl" fontWeight="900" fontFamily="">
              FUX
            </Heading>
          </Link>
        </NextLink>
        {isSmallScreen ? undefined : (
          <WorkstreamModal onCloseAction={() => {}} />
        )}
      </Center>
      <Flex
        gap={"2em"}
        order={{ base: 0, sm: 1, md: 0 }}
        margin={"auto"}
      >
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
  );
};

export default Header;
