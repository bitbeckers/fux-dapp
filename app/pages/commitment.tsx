import FuxOverview from "../components/FUX/FuxOverview";
import WorkstreamModal from "../components/FUX/WorkstreamModal";
import { WorkstreamRow } from "../components/FUX/WorkstreamRow";
import { useFux } from "../contexts/FuxProvider";
import { useWorkstreams } from "../hooks/workstream";
import { VStack, Button, Text, Box, Divider, Grid } from "@chakra-ui/react";
import type { NextPage } from "next";

const Commitment: NextPage = () => {
  const { currentUser } = useFux();

  return (
    <VStack spacing={8} w={"100%"}>
      <FuxOverview />
      <WorkstreamModal />
      <Divider />

      <Grid w="30%" gap={4} templateColumns="repeat(10, 1fr)">
        {currentUser?.workstreams
          ? currentUser.workstreams.map((workstream, index) => (
              <WorkstreamRow workstream={workstream} key={index} />
            ))
          : undefined}
      </Grid>
    </VStack>
  );
};

export default Commitment;
