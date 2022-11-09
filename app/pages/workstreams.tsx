import {
  TokenBalanceDocument,
  WorkstreamsByUserDocument,
} from "../.graphclient";
import FuxOverview from "../components/FUX/FuxOverview";
import WorkstreamModal from "../components/FUX/WorkstreamModal";
import { WorkstreamRow } from "../components/FUX/WorkstreamRow";
import { VStack, Divider, Grid } from "@chakra-ui/react";
import { useWallet } from "@raidguild/quiver";
import type { NextPage } from "next";
import React from "react";
import { useQuery } from "urql";

const Workstreams: NextPage = () => {
  const { address: user } = useWallet();

  const [result, reexecuteQuery] = useQuery({
    query: WorkstreamsByUserDocument,
    variables: {
      address: user?.toLowerCase() || "",
    },
  });

  const { data, fetching, error } = result;

  const [fuxBalanceResponse, reexecuteBalanceQuery] = useQuery({
    query: TokenBalanceDocument,
    variables: {
      address: user?.toLowerCase() || "",
      symbol: "FUX",
    },
  });

  const {
    data: fuxAvailableData,
    fetching: fetchingBalance,
    error: fuxBalance,
  } = fuxBalanceResponse;

  const balance = fuxAvailableData?.tokenBalances.find((balance) => balance);

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
                  fuxAvailable={balance?.balance}
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

export default Workstreams;
