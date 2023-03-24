import ConnectWallet from "../ConnectWallet";
import { Flex, Heading, Link, Spacer, ButtonGroup } from "@chakra-ui/react";
import NextLink from "next/link";

const Header: React.FC<{}> = () => {
  return (
    <Flex
      direction={"row"}
      as="nav"
      w="100%"
      p={6}
      justify="start"
      align="center"
      bg="#221527"
      flexWrap="wrap"
    >
      <NextLink href="/" passHref>
        <Link mr={12} w={['50%', null, 'auto']}>
          <Heading fontSize="4xl">FUX</Heading>
        </Link>
      </NextLink>
      <Flex direction={'row'} align={'center'} justify={'start'} w={['100%', null, '50%']}>
        <NextLink href="/workstreams" passHref>
          <Link mr={6}>
            <Heading fontSize="lg">MY WORKSTREAMS</Heading>
          </Link>
        </NextLink>
        <NextLink href="/history" passHref>
          <Link w={['50%', null, 'auto']}>
            <Heading fontSize="lg">MY HISTORY</Heading>
          </Link>
        </NextLink>
      </Flex>

      <Spacer />
      <ButtonGroup>
        {/* <ClaimRewards /> */}
        <Spacer />
        <ConnectWallet />
      </ButtonGroup>
    </Flex>
  );
};

export default Header;
