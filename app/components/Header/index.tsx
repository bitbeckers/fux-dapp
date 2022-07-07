import ConnectWallet from "../ConnectWallet";
import { Stack, Heading, HStack, Link, Spacer } from "@raidguild/design-system";
import NextLink from "next/link";

const Header: React.FC<{}> = () => {
  return (
    <Stack
      direction={["column", "row"]}
      as="nav"
      w="80%"
      justify="space-between"
      align="center"
    >
      <NextLink href="/" passHref>
        <Link p="10">
          <Heading fontSize="4xl">RAID</Heading>
        </Link>
      </NextLink>

      <ConnectWallet />
    </Stack>
  );
};

export { Header };
