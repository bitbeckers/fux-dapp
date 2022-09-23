import ConnectWallet from "../ConnectWallet";
import {
  Stack,
  Heading,
  Link,
  Spacer,
} from "@chakra-ui/react";
import NextLink from "next/link";

const Header: React.FC<{}> = () => {
  return (
    <Stack
      direction={["column", "row"]}
      as="nav"
      w="100%"
      p="5"
      justify="space-around"
      align="center"
      bg="#221527"
    >
      <NextLink href="/" passHref>
        <Link p="10">
          <Heading fontSize="4xl">FUX</Heading>
        </Link>
      </NextLink>
      <NextLink href="/workstreams" passHref>
        <Link>
          <Heading fontSize="lg">MY WORKSTREAMS</Heading>
        </Link>
      </NextLink>
      <NextLink href="/profile" passHref>
        <Link>
          <Heading fontSize="lg">MY PROFILE</Heading>
        </Link>
      </NextLink>

      <Spacer />

      <ConnectWallet />
    </Stack>
  );
};

export default Header;
