import { Box, Button, Flex, VStack, Text, Link } from "@chakra-ui/react";
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
      <Flex direction={['column', null, 'row']} >
        <Box minW={'50%'}>
          <Text fontSize={['2xl', null, '3xl']}>
            How many FUX do you give?
          </Text>
          <Text fontSize={['lg', null, '2xl']} my={3}>Gain perspective on how to allocate your attention based on perceived value created, as evaluated by your peers.</Text>
          <Text mt={3}>Claim FUX to get started.</Text>
          <NextLink href="/start" passHref>
            <Button mt={6} p={"1em"}>
              <Link>Claim FUX</Link>
            </Button>
          </NextLink>
        </Box>
        <Box minW={'50%'} pl={[0, null, 6]} pt={[6, null, 0]}>
          <Text textAlign="left" my={3}>The FUX flyweel</Text>
          <Text>1. Create workstreams/projects and invite contributors</Text>
          <Text>2. GIVE FUX: Contributors stake their attention.</Text>
          <Text>3. GET vFUX: Peer to Peer evaluations of perceived value created.</Text>
          <Text>... Repeat</Text>
        </Box>
      </Flex>

    </VStack>
  );
};

export default Home;
