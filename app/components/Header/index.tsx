import ConnectWallet from "../ConnectWallet";
import WorkstreamModal from "../FUX/WorkstreamModal";
import {
  Box,
  Flex,
  Heading,
  Link,
  Spacer,
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
      justify="space-between"
      align="center"
      bg="#221527"
      flexWrap="wrap"
      gap={"1em"}
    >
      <Flex gap={"1em"} direction={["column", "row"]}>
        <NextLink href="/" passHref>
          <Link>
            <Heading fontSize="4xl" fontWeight="900" fontFamily="">
              FUX
            </Heading>
          </Link>
        </NextLink>
        {isSmallScreen ? undefined : (
          <WorkstreamModal onCloseAction={() => {}} />
        )}
      </Flex>
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
  );
};

export default Header;
