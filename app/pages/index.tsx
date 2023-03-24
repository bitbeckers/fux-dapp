import { Box, Button, Flex, VStack, Text, Link } from "@chakra-ui/react";
import type { NextPage } from "next";
import NextLink from "next/link";

const Home: NextPage = () => {
  return (
    <Flex direction={['column', null, 'row']} mx="auto" maxW="1200px" p={[6, null, 12]}>
      <Box minW={'50%'}>
        <Text fontSize={['2xl', null, '3xl']} fontWeight="900">
          How many FUX do you give?
        </Text>
        <Text fontSize={['lg', null, 'xl']} my={3}>Gain perspective on how to allocate your attention based on perceived value created, as evaluated by your peers.</Text>
        {/* { account && fuxBalance && ( */}
          <>
            <Text mt={12} fontWeight="500">Claim FUX to get started.</Text>
            <NextLink href="/start" passHref>
              <Button mt={6} p={"1em"}>
                <Link>Claim FUX</Link>
              </Button>
            </NextLink>
          </>
        {/* )} */}
      </Box>
      <Box minW={'50%'} pl={[0, null, 12]} pt={[12, null, 0]}>
        <VStack gap={3} align="left">
        <Text textAlign="left" my={3} fontWeight="900">The FUX flywheel</Text>
        <Text>1. CREATE Workstream(s) and invite contributors</Text>
        <Text>2. GIVE FUX: Contributors stake their attention into workstreams.</Text>
        <Text>3. GET vFUX: Peer to Peer evaluations of perceived value created.</Text>
        <Text><i>... Repeat</i></Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Home;
