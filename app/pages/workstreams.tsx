import {
  TokenBalanceDocument,
  Workstream,
  WorkstreamsByUserDocument,
} from "../.graphclient";
import FuxOverview from "../components/FUX/FuxOverview";
import WorkstreamModal from "../components/FUX/WorkstreamModal";
import { WorkstreamRow } from "../components/FUX/WorkstreamRow";
import { VStack, Divider, Grid, GridItem, Spinner } from "@chakra-ui/react";
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
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="white.500"
          size="xl"
        />
      ) : (
        <>
          <Grid
            maxW={"800px"}
            w="100%"
            mx={"auto"}
            gap={2}
            templateColumns="repeat(16, 1fr)"
            textTransform={"uppercase"}
            letterSpacing={"0.1em"}
            fontSize="sm"
          >
            <GridItem colSpan={7}>Title</GridItem>
            <GridItem colSpan={4}>Funding</GridItem>
            <GridItem colSpan={2}>FUX</GridItem>
            <GridItem colSpan={3}>Actions</GridItem>
          </Grid>
          <Grid
            maxW={"800px"}
            mx="auto"
            w="100%"
            gap={2}
            templateColumns="repeat(16, 1fr)"
          >
            {data?.workstreamContributors
              ? data?.workstreamContributors.map(({ workstream }, index) =>
                  workstream.status === "Closed" ? undefined : (
                    <WorkstreamRow
                      workstream={workstream as Partial<Workstream>}
                      fuxAvailable={balance?.amount}
                      showInactive={false}
                      key={index}
                    />
                  )
                )
              : undefined}
          </Grid>
        </>
      )}
    </VStack>
  );
};

export default Workstreams;
