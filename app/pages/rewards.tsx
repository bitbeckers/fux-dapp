import ClaimRewards from "../components/ClaimRewards";
import FuxOverview from "../components/FUX/FuxOverview";
import { useRewardsBalance } from "../hooks/rewards";
import { VStack, Grid, Heading, Box, HStack, Spacer } from "@chakra-ui/react";
import { ethers } from "ethers";
import type { NextPage } from "next";

const History: NextPage = () => {
  const rewards = useRewardsBalance();

  return (
    <VStack spacing={8} w={"100%"}>
      <FuxOverview />

      <Box>
        <Heading>{`Available rewards:  ${
          ethers.utils.formatEther(rewards?.toString() || "0").toString() ||
          "..."
        }`}</Heading>

        <HStack mt={"3em"}>
          <Heading>Claim</Heading>
          <ClaimRewards />
        </HStack>
      </Box>
    </VStack>
  );
};

export default History;
