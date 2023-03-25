import ConnectWallet from "../ConnectWallet";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const Header: React.FC<{}> = () => {
  return (
    <Flex
      direction={"row"}
      as="nav"
      w="100%"
      p={"2em"}
      justify="space-between"
      align="center"
      bg="plum.900"
      flexWrap="wrap"
    >
      <Box w={["50%", null, "25%"]} order={"0"}>
        <NextLink href="/" passHref>
          <Link>
            <Heading fontSize="4xl" fontWeight="900" fontFamily="">
              FUX
            </Heading>
          </Link>
        </NextLink>
      </Box>
      <Flex
        order={[2, null, 1]}
        my={[6, null, 0]}
        direction={"row"}
        align={"center"}
        justify={"center"}
        w={["100%", null, "50%"]}
      >
        <NextLink href="/workstreams" passHref>
          <Link mr={6}>
            <Text fontSize="lg" color="primary.600">
              WORKSTREAMS
            </Text>
          </Link>
        </NextLink>
        <NextLink href="/history" passHref>
          <Link>
            <Text fontSize="lg" color="primary.600">
              HISTORY
            </Text>
          </Link>
        </NextLink>
      </Flex>
      <Box w={["50%", null, "25%"]} order={[1, null, 2]} ml="auto">
        {/* <ClaimRewards /> */}
        <ConnectWallet />
      </Box>
    </Flex>
  );
};

export default Header;
