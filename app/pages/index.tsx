import { Box, Button, VStack, Text, Link } from "@chakra-ui/react";
import type { NextPage } from "next";
import NextLink from "next/link";

const Home: NextPage = () => {
  return (
    <VStack
      w={"80%"}
      maxW={"1920px"}
      spacing={8}
      fontSize="xl"
      textAlign="left"
    >
      <Text p={"1em"} fontSize="4xl">
        How many FUX do you give?
      </Text>

      <Text textAlign="left">The FUX flyweel</Text>
      <Text>1. Create workstreams/projects and invite contributors</Text>
      <Text>2. GIVE FUX: Contributors stake their attention.</Text>
      <Text>3. GET vFUX: Peer to Peer evaluations of perceived value created.</Text>
      <Text>... Repeat</Text>
      <Text>Gain perspective on how to allocate your attention based on the value created, as evaluated by your peers within.</Text>

      <Text>Claim FUX to get started.</Text>

      <NextLink href="/start" passHref>
        <Button p={"1em"}>
          <Link>Claim FUX</Link>
        </Button>
      </NextLink>

    </VStack>
  );
};

export default Home;
