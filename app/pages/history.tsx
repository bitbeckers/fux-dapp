import FuxOverview from "../components/FUX/FuxOverview";
import WorkstreamModal from "../components/FUX/WorkstreamModal";
import { WorkstreamRow } from "../components/FUX/WorkstreamRow";
import { useGetWorkstreamIDs } from "../hooks/workstream";
import { VStack, Divider, Grid } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import type { NextPage } from "next";

const History: NextPage = () => {
  const workstreamIDs = useGetWorkstreamIDs();

  return (
    <VStack spacing={8} w={"100%"}>
      <FuxOverview />
      <WorkstreamModal />
      <Divider />

      <Grid w="40%" gap={2} templateColumns="repeat(16, 1fr)">
        {workstreamIDs
          ? workstreamIDs.map((id: BigNumber, index: number) => (
              <WorkstreamRow
                workstreamID={id.toNumber()}
                showInactive={true}
                key={index}
              />
            ))
          : undefined}
      </Grid>
    </VStack>
  );
};

export default History;
