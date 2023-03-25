import {
  TokenBalanceDocument,
  Workstream,
  WorkstreamsByUserDocument,
} from "../.graphclient";
import FuxOverview from "../components/FUX/FuxOverview";
import WorkstreamModal from "../components/FUX/WorkstreamModal";
import { WorkstreamRow } from "../components/FUX/WorkstreamRow";
import { Divider, Grid, GridItem, Spinner, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";
import { useQuery } from "urql";
import { useAccount } from "wagmi";

const Workstreams: NextPage = () => {
  const { address: user } = useAccount();

  const [result, reexecuteQuery] = useQuery({
    query: WorkstreamsByUserDocument,
    variables: {
      contributor: user?.toLowerCase() || "",
    },
  });

  const { data, fetching, error } = result;

  console.log("WorkstreamsByUser: ", data);

  const [fuxBalanceResponse] = useQuery({
    query: TokenBalanceDocument,
    variables: {
      address: user?.toLowerCase() || "",
      symbol: "FUX",
    },
  });

  const { data: fuxAvailableData, fetching: fetchingBalance } =
    fuxBalanceResponse;

  const balance = fuxAvailableData?.tokenBalances.find((balance) => balance);

  return (
    <Flex direction={"column"} gap={"1em"} w={"100%"}>
      <FuxOverview />
      <WorkstreamModal onCloseAction={reexecuteQuery} />
      <Divider />
      {fetching && fetchingBalance ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="white.500"
          size="xl"
          margin={"auto"}
        />
      ) : (
        <Grid
          gap={2}
          templateColumns="repeat(16, 1fr)"
          textTransform={"uppercase"}
          letterSpacing={"0.1em"}
          fontSize="sm"
          p={"1em"}
          maxW={"960px"}
          margin={"auto"}
        >
          <GridItem colSpan={7}>Title</GridItem>
          <GridItem colSpan={4}>Funding</GridItem>
          <GridItem colSpan={2}>FUX</GridItem>
          <GridItem colSpan={3}>Actions</GridItem>

          {data?.workstreamContributors
            ? data?.workstreamContributors.map(({ workstream }) =>
                workstream.status === "Closed" ? undefined : (
                  <WorkstreamRow
                    workstream={workstream as Partial<Workstream>}
                    fuxAvailable={balance?.amount}
                    showInactive={false}
                    key={workstream.id}
                  />
                )
              )
            : undefined}
        </Grid>
      )}
    </Flex>
  );
};

export default Workstreams;
