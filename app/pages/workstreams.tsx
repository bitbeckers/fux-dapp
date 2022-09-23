import FuxOverview from "../components/FUX/FuxOverview";
import WorkstreamModal from "../components/FUX/WorkstreamModal";
import { WorkstreamRow } from "../components/FUX/WorkstreamRow";
import { useFuxBalance } from "../hooks/fux";
import { useGetWorkstreamIDs } from "../hooks/workstream";
import { VStack, Divider, Grid } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import type { NextPage } from "next";

const Workstreams: NextPage = () => {
  const workstreamIDs = useGetWorkstreamIDs();
  const fuxBalance = useFuxBalance();

  return (
    <VStack spacing={8} w={"100%"}>
      <FuxOverview />
      <WorkstreamModal />
      <Divider />

      <Grid w="40%" gap={2} templateColumns="repeat(13, 1fr)">
        {workstreamIDs
          ? workstreamIDs.map((id: BigNumber, index: number) => (
              <WorkstreamRow workstreamID={id.toNumber()} key={index} />
            ))
          : undefined}
      </Grid>
    </VStack>
  );
};

export default Workstreams;
