import {
  Workstream,
} from "../../.graphclient";
import CommitFuxModal from "../../components/CommitFuxModal";
import { ContributorOverview } from "../../components/ContributorOverview";
import {
  Box,
  VStack,
  Text,
  Heading,
  Button,
  Link,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Spinner,
} from "@chakra-ui/react";
import { BigNumber, ethers } from "ethers";
import _ from "lodash";
import { DateTime } from "luxon";
import type { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { CloseButton } from "../../components/CloseButton";
import TokenBalance from "../../components/TokenBalance";
import { useGraphClient } from "../../hooks/useGraphClient";
import { calculateRelative, parseEvaluations } from "../../utils/helpers";

const Workstream: NextPage = () => {
  const router = useRouter();
  const { address: user } = useAccount();
  const { workstreamID } = router.query;
  const { sdk } = useGraphClient();

  const {isLoading: workstreamLoading, data: workstream} = useQuery({
    queryKey: ["workstream", workstreamID],
    queryFn: () => sdk.WorkstreamByID({ id: workstreamID as string }),
    refetchInterval: 5000,
  });

  const {data: userBalances} = useQuery({
    queryKey: ["userBalances", user?.toLowerCase()],
    queryFn: () => sdk.BalancesByUser({ address: user?.toLowerCase() }),
    refetchInterval: 5000,
  });

  if (workstreamLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="white.500"
        size="xl"
      />
    );
  }


  const _workstream = workstream?.workstreamContributors?.[0]?.workstream;
  const contributors = _workstream?.contributors;
  const contributorAddresses = contributors?.map((contributor) => {return contributor.contributor.id}) ?? []

  const contributor = _workstream?.contributors?.find(
    (cont) => cont.contributor.id.toLowerCase() === user?.toLowerCase()
  );

  let fuxGiven = contributor?.commitment;

  if (!fuxGiven) {
    fuxGiven = BigNumber.from("0");
  }


  const fuxAvailable = userBalances?.userBalances.find((balance) => balance.token?.name === "FUX")?.amount

  if (!fuxAvailable) {
    fuxGiven = BigNumber.from("0");
  }

  return workstreamID && _workstream ? (
    <>
      <VStack mx="auto" maxW={"1200px"} w="100%">
        <Flex direction="column" py={12}>
          <Text size="xs">Workstream</Text>
          <Heading size={["md", null, "lg"]}>{`${
            _workstream?.name || "No name found"
          }`}</Heading>
          <Text>
            Deadline: {
                _workstream.deadline
                  ? DateTime.fromSeconds(
                      +_workstream.deadline
                    ).toLocaleString()
                  : ""
              }
            </Text>
        </Flex>

        <Flex direction={'column'} align={['center', null, 'center']} flexWrap="wrap" gap={2}>
          <Text>Workstream funds available</Text>
          {_workstream.funding?.map(funding => <TokenBalance key={funding.token.id} token={funding.token} amount={funding.amount} />)}
        </Flex>
        
        <Flex direction={['column', null, 'column']} gap={"1em"}>
          <Flex direction={['column', null, 'row']} align={['center', null, 'center']} flexWrap="wrap">
            <Stat w="160px" mr={4}>
              <StatLabel>FUX Committed</StatLabel>
              <StatNumber bg="#301A3A" p={2} mt={2} fontFamily="mono" fontSize="md" fontWeight="100">{`
                ${fuxGiven ? fuxGiven : "0"} FUX`}</StatNumber>
            </Stat>
            <Box w="160px" mt={8}>
              <CommitFuxModal
                workstreamID={BigNumber.from(workstreamID)}
                fuxGiven={fuxGiven}
                fuxAvailable={fuxAvailable}
              />
            </Box>
          </Flex>
          <Flex direction={['column', null, 'row']} align={['center', null, 'end']} flexWrap="wrap" gap={"1em"}>
            <NextLink
              href={{
                pathname: "/evaluate/[workstreamID]",
                query: { workstreamID },
              }}
              passHref
            >
              <Button p={2} mt={[3, null, 0]} w="160px">
                <Link>EVALUATE</Link>
              </Button>
            </NextLink>
            {_workstream.coordinator?.id.toLowerCase() ===
            user?.toLowerCase() ? (
             <>
              <NextLink
              href={{
                pathname: "/finalize/[workstreamID]",
                query: { workstreamID },
              }}
              passHref
            >
              <Button p={2} mt={[3, null, 0]} w="160px">
                <Link>FINALIZE</Link>
              </Button>
            </NextLink>
            
           <CloseButton workstreamId={workstreamID as string} contributors={contributorAddresses} disabled={false}/>
             </> 
            ) : undefined}
          </Flex>
        </Flex>
        <Box p={[6, null, 12]}>
          <ContributorOverview workstream={_workstream as Partial<Workstream>}  />
        </Box>
      </VStack>
    </>
  ) : (
    <Text>{`No workstream found for ID: ${workstreamID}`}</Text>
  );
};

export default Workstream;
