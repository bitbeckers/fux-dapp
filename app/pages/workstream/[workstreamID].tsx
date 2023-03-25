import {
  TokenBalanceDocument,
  Workstream,
  WorkstreamByIDDocument,
} from "../../.graphclient";
import CommitFuxModal from "../../components/FUX/CommitFuxModal";
import { Contributor } from "../../components/FUX/Contributor";
import { ContributorOverview } from "../../components/FUX/ContributorOverview";
import { useConstants } from "../../utils/constants";
import {
  Box,
  VStack,
  Text,
  Heading,
  HStack,
  ButtonGroup,
  Button,
  Link,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  TableContainer,
  Spinner,
} from "@chakra-ui/react";
import { BigNumber, BigNumberish, ethers } from "ethers";
import _ from "lodash";
import { DateTime } from "luxon";
import type { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "urql";
import { useAccount } from "wagmi";

const Workstream: NextPage = () => {
  const router = useRouter();
  const { address: user } = useAccount();
  const { nativeToken } = useConstants();
  const { workstreamID } = router.query;

  const [result] = useQuery({
    query: WorkstreamByIDDocument,
    variables: {
      id: workstreamID as string,
    },
  });

  const [fuxBalanceResponse] = useQuery({
    query: TokenBalanceDocument,
    variables: {
      address: user?.toLowerCase() || "",
      symbol: "FUX",
    },
  });

  const { data, fetching } = result;

  if (fetching) {
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
  const _workstream = data?.workstream;
  const contributor = _workstream?.contributors?.find(
    (cont) => cont.contributor.id.toLowerCase() === user?.toLowerCase()
  );

  let fuxGiven = contributor?.commitment;

  if (!fuxGiven) {
    fuxGiven = BigNumber.from("0");
  }

  const { data: fuxAvailableData } = fuxBalanceResponse;

  const fuxAvailable = fuxAvailableData?.tokenBalances.find(
    (balance) => balance
  )?.amount;

  if (!fuxAvailable) {
    fuxGiven = BigNumber.from("0");
  }

  const contributors = _workstream?.contributors;

  return _workstream ? (
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
            { _workstream.funding > 0 && (
              <Text>Funding: {
                _workstream.funding
                  ? Number(
                      ethers.utils.formatEther(_workstream.funding)
                    ).toPrecision(2)
                  : ""
              } {nativeToken}
              </Text>
            )}
        </Flex>

        <Flex direction={['column', null, 'column']} gap={"1em"}>
          <Flex direction={['column', null, 'row']} align={['center', null, 'center']} flexWrap="wrap">
            <Stat w="160px">
              <StatLabel>Committed</StatLabel>
              <StatNumber bg="#301A3A" p={3} fontFamily="mono">{`
                ${fuxGiven ? fuxGiven : "0"} FUX`}</StatNumber>
            </Stat>
            <Box w="160px">
              <CommitFuxModal
                workstreamID={BigNumber.from(_workstream.id)}
                fuxGiven={fuxGiven}
                fuxAvailable={fuxAvailable}
              />
            </Box>
          </Flex>
          <Flex direction={['column', null, 'row']} align={['center', null, 'end']} flexWrap="wrap">
            <NextLink
              href={{
                pathname: "/evaluate/[workstreamID]",
                query: { workstreamID },
              }}
              passHref
            >
              <Button p={3} mt={[3, null, 0]} w="120px">
                <Link>EVALUATE</Link>
              </Button>
            </NextLink>
            {_workstream.coordinator?.id.toLowerCase() ===
            user?.toLowerCase() ? (
              <NextLink
              href={{
                pathname: "/finalize/[workstreamID]",
                query: { workstreamID },
              }}
              passHref
            >
              <Button p={3} mt={[3, null, 0]} w="120px">
                <Link>FINALIZE</Link>
              </Button>
            </NextLink>
            ) : undefined}
          </Flex>
        </Flex>
        <Box p={[6, null, 12]}>
          <ContributorOverview workstream={_workstream as Partial<Workstream>} />
        </Box>
      </VStack>
    </>
  ) : (
    <Text>{`No workstream found for ID: ${workstreamID}`}</Text>
  );
};

export default Workstream;
