import {
  Workstream,
  Maybe,
  User,
  FuxGiven,
  WorkstreamFuxDocument,
} from "../.graphclient";
import FuxOverview from "../components/FUX/FuxOverview";
import WorkstreamModal from "../components/FUX/WorkstreamModal";
import { WorkstreamRow } from "../components/FUX/WorkstreamRow";
import { VStack, Divider, Grid, Text } from "@chakra-ui/react";
import { useWallet } from "@raidguild/quiver";
import type { NextPage } from "next";
import { useQuery } from "urql";

export type WorkstreamResponse = {
  workstream: Pick<
    Workstream,
    "id" | "name" | "resolved" | "funding" | "deadline"
  > & {
    contributors?: Maybe<Array<{ user: Pick<User, "id"> }>>;
    coordinator?: Maybe<Pick<User, "id">>;
  };
};

export type FuxResponse = Pick<FuxGiven, "balance"> & {
  workstream: Pick<Workstream, "id">;
};

const History: NextPage = () => {
  const { address } = useWallet();

  const [result, reexecuteQuery] = useQuery({
    query: WorkstreamFuxDocument,
    variables: {
      id: address?.toLowerCase() || "",
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
            ? data?.userWorkstreams.map((workstream, index) => (
                <WorkstreamRow
                  workstream={workstream}
                  fuxGiven={data.fuxGivens.find(
                    (fux) => fux.workstream.id === workstream.workstream.id
                  )}
                  fuxAvailable={undefined}
                  showInactive={false}
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
