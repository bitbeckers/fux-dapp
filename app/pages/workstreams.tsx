import { Workstream } from "../.graphclient";
import FuxOverview from "../components/FuxOverview";
import WorkstreamModal from "../components/WorkstreamModal";
import { WorkstreamRow } from "../components/WorkstreamRow";
import { useGraphClient } from "../hooks/useGraphClient";
import { contractAddresses, contractABI } from "../utils/constants";
import { decodeURI } from "../utils/helpers";
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
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { BigNumber } from "ethers";
import type { NextPage } from "next";
import React from "react";
import { useAccount, useContractRead } from "wagmi";

const Workstreams: NextPage = () => {
  const { address: user } = useAccount();
  const [sortFux, setSortFux] = useBoolean();
  const [sortTitle, setSortTitle] = useBoolean();
  const { sdk } = useGraphClient();

  const { data: workstreamsByUser, isLoading } = useQuery({
    queryKey: ["workstreamsByUser", user?.toLowerCase()],
    queryFn: () =>
      sdk.WorkstreamsByContributor({ address: user?.toLowerCase() }),
    refetchInterval: 5000,
  });

  const { data: balancesByUser } = useQuery({
    queryKey: ["balancesByUser", user?.toLowerCase()],
    queryFn: () => sdk.BalancesByUser({ address: user?.toLowerCase() }),
    refetchInterval: 5000,
  });

  const balance = balancesByUser?.userBalances.find(
    ({ token }) =>
      token.id.toLowerCase() ===
      contractAddresses.fuxContractAddress.toLowerCase()
  )?.amount;

  const fuxID = balancesByUser?.userBalances.find(
    ({ token }) => parseInt(token.tokenID) > 1
  )?.token.tokenID;

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

      if (!fuxGivenA) {
        fuxGivenA = 0;
      }
      if (!fuxGivenB) {
        fuxGivenB = 0;
      }

      return fuxGivenA < fuxGivenB ? -1 : 1;
    } else if (sortTitle) {
      return (a?.workstream?.name || "") < (b?.workstream?.name || "") ? -1 : 1;
    }
    return 0;
  });

  const { data: tokenUri } = useContractRead({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "uri",
    args: [parseInt(fuxID)],
    enabled: !!user,
    watch: true,
  });

  const tokenLink = tokenUri ? decodeURI(tokenUri as string) : undefined;

  return (
    <VStack spacing={8} w={"100%"}>
      <FuxOverview />
      <Divider />
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="white.500"
          size="xl"
        />
      ) : (
        <>
          <Grid gap={2} templateColumns="repeat(16, 1fr)">
            {tokenLink !== undefined ? (
              <GridItem colSpan={5}>
                <iframe
                  src={"https://ipfs.io/ipfs" + tokenLink}
                  width="286.5px"
                  height="415px"
                  frameBorder="0"
                  scrolling="no"
                  style={{ borderRadius: "20px" }}
                ></iframe>
              </GridItem>
            ) : (
              <GridItem colSpan={5}>Loading</GridItem>
            )}
            <GridItem colSpan={11}>
              <Grid
                maxW={"1000px"}
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
                    disabled={true}
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
                      icon={undefined}
                    />
                  </Button>
                </GridItem>
                <GridItem colSpan={2}>
                  <Button
                    onClick={() => {
                      setSortFux.toggle();
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
                maxW={"1000px"}
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
                <GridItem colSpan={16} p="3em" textAlign={"center"}>
                  <WorkstreamModal />
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </>
      )}
    </VStack>
  );
};

export default Workstreams;
