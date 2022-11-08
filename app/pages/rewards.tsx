import ClaimRewards from "../components/ClaimRewards";
import FuxOverview from "../components/FUX/FuxOverview";
import { VStack, Grid, Heading, Box, HStack } from "@chakra-ui/react";
import type { NextPage } from "next";

const History: NextPage = () => {
  return (
    <VStack spacing={8} w={"100%"}>
      <FuxOverview />

      <Box>
        <HStack mt={"3em"}>
          <Heading>Claim</Heading>
          <ClaimRewards />
        </HStack>
      </Box>
    </VStack>
  );
};

export default History;
