import { defaultChain } from "../../utils/constants";
import ClaimRewards from "../ClaimRewards";
import ConnectWallet from "../ConnectWallet";
import {
  Button,
  Stack,
  Heading,
  Link,
  Spacer,
  ButtonGroup,
} from "@chakra-ui/react";
import { useWallet } from "@raidguild/quiver";
import NextLink from "next/link";

const NetworkButton = () => {
  const { switchNetwork, isConnected, chainId } = useWallet();
  if (!isConnected || chainId === defaultChain) {
    return <></>;
  }

  return <Button onClick={() => switchNetwork("0x5")}>Switch to Goerli</Button>;
};

const Header: React.FC<{}> = () => {
  return (
    <Stack
      direction={["column", "row"]}
      as="nav"
      w="100%"
      p="10"
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
      <NextLink href="/history" passHref>
        <Link>
          <Heading fontSize="lg">MY HISTORY</Heading>
        </Link>
      </NextLink>
      <NextLink href="/rewards" passHref>
        <Link>
          <Heading fontSize="lg">MY REWARDS</Heading>
        </Link>
      </NextLink>

      <Spacer />
      <NetworkButton />
      <ButtonGroup>
        <ClaimRewards />
        <ConnectWallet />
      </ButtonGroup>
    </Stack>
  );
};

export default Header;
