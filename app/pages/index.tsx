import { UserByAddressDocument } from "../.graphclient";
import ConnectWallet from "../components/ConnectWallet";
import {
  Box,
  Button,
  Flex,
  VStack,
  Text,
  Link,
  Spinner,
  Spacer,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import NextLink from "next/link";
import { useQuery } from "urql";
import { useAccount } from "wagmi";

const Home: NextPage = () => {
  const { address } = useAccount();
  const [result] = useQuery({
    query: UserByAddressDocument,
    variables: {
      address: address?.toLowerCase() || "",
    },
  });
  const { data, fetching, error } = result;

  const claimLink = (
    <Flex direction={"column"} gap={2}>
      <Text fontWeight="500">Get started.</Text>
      <NextLink href="/start" passHref>
        <Button p={"1em"} maxW={"xs"}>
          <Link>Enter</Link>
        </Button>
      </NextLink>
    </Flex>
  );

  const workstreamLink = (
    <Flex direction={"column"} gap={2}>
      <Text fontWeight="500">View your workstreams.</Text>
      <NextLink href="/workstreams" passHref>
        <Button p={"1em"} maxW={"xs"}>
          <Link>Workstreams</Link>
        </Button>
      </NextLink>
    </Flex>
  );

  const connectWallet = (
    <Flex direction={"column"} gap={2}>
      <Text fontWeight="500">Let&apos;s get connected.</Text>
      <ConnectWallet />
    </Flex>
  );

  return (
    <Flex
      direction={["column", null, "row"]}
      mx="auto"
      maxW="1200px"
      p={[6, null, 12]}
    >
      <Flex direction={"column"} minW={"50%"}>
        <Text fontSize={["2xl", null, "3xl"]} fontWeight="900">
          How many FUX do you give?
        </Text>
        <Text fontSize={["lg", null, "xl"]} my={3}>
          Gain perspective on how to allocate your attention based on perceived
          value created, as evaluated by your peers.
        </Text>
        <Spacer />
        {fetching ? (
          <Spinner size="md" />
        ) : address ? (
          data?.user?.fuxer ? (
            workstreamLink
          ) : (
            claimLink
          )
        ) : (
          connectWallet
        )}
      </Flex>
      <Box minW={"50%"} pl={[0, null, 12]} pt={[12, null, 0]}>
        <VStack gap={3} align="left">
          <Text textAlign="left" my={3} fontWeight="900">
            The FUX flywheel
          </Text>
          <Text>1. CREATE Workstream(s) and invite contributors</Text>
          <Text>
            2. GIVE FUX: Contributors stake their attention into workstreams.
          </Text>
          <Text>
            3. GET vFUX: Peer to Peer evaluations of perceived value created.
          </Text>
          <Text>
            <i>... Repeat</i>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Home;
