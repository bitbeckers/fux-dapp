import { WorkstreamRow } from "../components/FUX/WorkstreamRow";
import { useWorkstreams } from "../hooks/workstream";
import { VStack, Button, Text, Box, Divider, Grid } from "@chakra-ui/react";
import type { NextPage } from "next";
import FuxOverview from "../components/FUX/FuxOverview";
import WorkstreamModal from "../components/FUX/WorkstreamModal";

const Commitment: NextPage = () => {
  const { workstreams } = useWorkstreams();

  const workstreamRows = workstreams
    ? workstreams.map((workstream, index) => (
        <WorkstreamRow workstream={workstream} key={index} />
      ))
    : undefined;
    
  return (
    <VStack spacing={8} w={"100%"}>
      <FuxOverview />
      <WorkstreamModal />
      <Divider />

      <Grid w="30%" gap={4} templateColumns="repeat(10, 1fr)">
        {workstreamRows}
      </Grid>
    </VStack>
  );
};

export default Commitment;
