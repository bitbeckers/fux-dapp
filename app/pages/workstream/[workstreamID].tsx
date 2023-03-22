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
  VStack,
  Text,
  Heading,
  HStack,
  ButtonGroup,
  Button,
  Link,
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

type Evaluation = {
  creator: {
    id: string;
  };
  contributors: [
    {
      id: string;
    }
  ];
  ratings: BigNumberish[];
};

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
      <VStack w={"100%"}>
        <VStack w={"70%"} maxW={"700px"}>
          <HStack paddingTop={"2em"} paddingBottom={"2em"}>
            <Heading size={"md"}>{`Workstream: ${
              _workstream?.name || "No name found"
            }`}</Heading>
          </HStack>
          <HStack>
            <ButtonGroup>
              <CommitFuxModal
                workstreamID={BigNumber.from(_workstream.id)}
                fuxGiven={fuxGiven}
                fuxAvailable={fuxAvailable}
              />
              <NextLink
                href={{
                  pathname: "/evaluate/[workstreamID]",
                  query: { workstreamID },
                }}
                passHref
              >
                <Button p={"1em"}>
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
                <Button p={"1em"}>
                  <Link>FINALIZE</Link>
                </Button>
              </NextLink>
              ) : undefined}
            </ButtonGroup>
          </HStack>
          <HStack>
            <Stat p={"1em"}>
              <StatLabel>Commitment</StatLabel>
              <StatNumber bg="#301A3A" pl={"5"} w="8em">{`
                ${fuxGiven ? fuxGiven : "0"} FUX`}</StatNumber>
            </Stat>
            <Stat p={"1em"}>
              <StatLabel>Deadline</StatLabel>
              <StatNumber bg="#301A3A" pl={"5"} w="8em">{`
                ${
                  _workstream.deadline
                    ? DateTime.fromSeconds(
                        +_workstream.deadline
                      ).toLocaleString()
                    : ""
                }`}</StatNumber>
            </Stat>
            <Stat p={"1em"}>
              <StatLabel>Funding</StatLabel>
              <StatNumber bg="#301A3A" pl={"5"} w="8em">{`
                ${
                  _workstream.funding
                    ? Number(
                        ethers.utils.formatEther(_workstream.funding)
                      ).toPrecision(2)
                    : ""
                } ${nativeToken}`}</StatNumber>
            </Stat>
          </HStack>
          <ContributorOverview workstream={_workstream as Partial<Workstream>} />
        </VStack>
      </VStack>
    </>
  ) : (
    <Text>{`No workstream found for ID: ${workstreamID}`}</Text>
  );
};

export default Workstream;
