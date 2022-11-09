import { WorkstreamsByUserDocument } from "../.graphclient";
import FuxOverview from "../components/FUX/FuxOverview";
import WorkstreamModal from "../components/FUX/WorkstreamModal";
import { WorkstreamRow } from "../components/FUX/WorkstreamRow";
import { VStack, Divider, Grid } from "@chakra-ui/react";
import { useWallet } from "@raidguild/quiver";
import type { NextPage } from "next";
import { useQuery } from "urql";

const History: NextPage = () => {
  const { address: user } = useWallet();

  const [result, reexecuteQuery] = useQuery({
    query: WorkstreamsByUserDocument,
    variables: {
      address: user?.toLowerCase() || "",
    },
  });

  const { data, fetching, error } = result;

  return (
    <VStack spacing={8} w={"100%"}>
      <FuxOverview />
      <WorkstreamModal onCloseAction={reexecuteQuery} />
      <Divider />

      {fetching ? (
        "Loading... "
      ) : (
        <Grid w="40%" gap={2} templateColumns="repeat(16, 1fr)">
          {data?.userWorkstreams
            ? data?.userWorkstreams.map(({ workstream }, index) => (
                <WorkstreamRow
                  workstream={workstream}
                  fuxAvailable={undefined}
                  showInactive={true}
                  key={index}
                />
              ))
            : undefined}
        </Grid>
      )}
    </VStack>
  );
};

export default History;
