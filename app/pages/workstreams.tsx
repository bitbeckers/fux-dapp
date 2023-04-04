import {
  TokenBalanceDocument,
  Workstream,
  WorkstreamsByUserDocument,
} from "../.graphclient";
import FuxOverview from "../components/FUX/FuxOverview";
import WorkstreamModal from "../components/FUX/WorkstreamModal";
import { WorkstreamRow } from "../components/FUX/WorkstreamRow";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  VStack,
  Divider,
  Grid,
  GridItem,
  Spinner,
  useBoolean,
  Button,
  IconButton,
  Heading,
  Center,
} from "@chakra-ui/react";
import { BigNumber } from "ethers";
import type { NextPage } from "next";
import React from "react";
import { useQuery } from "urql";
import { useAccount } from "wagmi";

const Workstreams: NextPage = () => {
  const { address: user } = useAccount();
  const [sortFux, setSortFux] = useBoolean();
  const [sortTitle, setSortTitle] = useBoolean();
  const [sortFunding, setSortFunding] = useBoolean();

  const [result, reexecuteQuery] = useQuery({
    query: WorkstreamsByUserDocument,
    variables: {
      contributor: user?.toLowerCase() || "",
    },
  });

  const { data: workstreamsByUser, fetching, error } = result;

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

  const sortedData = workstreamsByUser?.workstreamContributors.sort((a, b) => {
    if (sortFux) {
      let fuxGivenA = a.workstream.contributors?.find(
        (contributor) =>
          contributor.contributor.id.toLowerCase() === user?.toLowerCase()
      )?.commitment;
      let fuxGivenB = b.workstream.contributors?.find(
        (contributor) =>
          contributor.contributor.id.toLowerCase() === user?.toLowerCase()
      )?.commitment;

      console.log("FUX GIVEN A: ", fuxGivenA);
      console.log("FUX GIVEN B: ", fuxGivenB);

      if (!fuxGivenA) {
        fuxGivenA = 0;
      }
      if (!fuxGivenB) {
        fuxGivenB = 0;
      }

      return fuxGivenA < fuxGivenB ? -1 : 1;
    } else if (sortTitle) {
      return (a?.workstream?.name || "") < (b?.workstream?.name || "") ? -1 : 1;
    } else if (sortFunding) {
      let fundingA = BigNumber.from(a.workstream.funding);
      let fundingB = BigNumber.from(b.workstream.funding);

      if (!fundingA) {
        fundingA = BigNumber.from("0");
      }
      if (!fundingB) {
        fundingB = BigNumber.from("0");
      }

      return fundingA.lt(fundingB) ? -1 : 1;
    }
    return 0;
  });

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
            <GridItem colSpan={7}>
              <Button
                onClick={() => {
                  setSortTitle.toggle();
                  setSortFunding.off();
                  setSortFux.off();
                }}
                variant="ghost"
                fontSize={"sm"}
                fontWeight={"normal"}
                textTransform={"uppercase"}
                letterSpacing={"0.1em"}
              >
                Title
                <IconButton
                  aria-label="Sort by FUX"
                  variant="ghost"
                  icon={sortTitle ? <ChevronUpIcon /> : <ChevronDownIcon />}
                />
              </Button>
            </GridItem>
            <GridItem colSpan={4}>
              <Button
                onClick={() => {
                  setSortFunding.toggle();
                  setSortFux.off();
                  setSortTitle.off();
                }}
                variant="ghost"
                fontSize={"sm"}
                fontWeight={"normal"}
                letterSpacing={"0.1em"}
                textTransform={"uppercase"}
              >
                Funding
                <IconButton
                  aria-label="Sort by FUX"
                  variant="ghost"
                  icon={sortFunding ? <ChevronUpIcon /> : <ChevronDownIcon />}
                />
              </Button>
            </GridItem>
            <GridItem colSpan={2}>
              <Button
                onClick={() => {
                  setSortFux.toggle();
                  setSortFunding.off();
                  setSortTitle.off();
                }}
                variant="ghost"
                fontSize={"sm"}
                fontWeight={"normal"}
                letterSpacing={"0.1em"}
                textTransform={"uppercase"}
              >
                FUX
                <IconButton
                  aria-label="Sort by FUX"
                  variant="ghost"
                  icon={sortFux ? <ChevronUpIcon /> : <ChevronDownIcon />}
                />
              </Button>
            </GridItem>
            <GridItem colSpan={2} p="0.5em" textAlign={"center"}>
              Actions
            </GridItem>
          </Grid>
          <Grid
            maxW={"800px"}
            mx="auto"
            w="100%"
            gap={2}
            templateColumns="repeat(16, 1fr)"
          >
            {sortedData
              ? sortedData?.map(({ workstream }) =>
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
        </>
      )}
    </VStack>
  );
};

export default Workstreams;
