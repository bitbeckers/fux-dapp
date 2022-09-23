import type { NextPage } from "next";
import { Box, Button, VStack, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";

const Home: NextPage = () => {
  return (
    <VStack
      w={"80%"}
      maxW={"1920px"}
      spacing={8}
      textAlign="center"
      fontSize="xl"
    >
      <Text p={"1em"} fontSize="4xl">
        How many FUX can you give?
      </Text>

      <NextLink href="/start" passHref>
        <Button p={"1em"}>
          <Link>
            Get started
          </Link>
        </Button>
      </NextLink>

      <Box>
        <Text fontSize="md" as="cite">
          “You and everyone you know are going to be dead soon. And in the short
          amount of time between here and there, you have a limited amount of
          fucks to give. Very few, in fact. And if you go around giving a fuck
          about everything and everyone without conscious thought or
          choice—well, then you&aposre going to get fucked.”
        </Text>
        <Text fontSize="sm" fontWeight="bold" p={"2em"}>
          Mark Manson, The Subtle Art of Not Giving a F*ck: A Counterintuitive
          Approach to Living a Good Life
        </Text>
      </Box>
    </VStack>
  );
};

export default Home;
