import {
  TokenBalanceDocument,
  WorkstreamByIDDocument,
} from "../../.graphclient";
import CommitFuxModal from "../../components/FUX/CommitFuxModal";
import { ContributorRow } from "../../components/FUX/ContributorRow";
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
  const { address } = useAccount();
  const { nativeToken } = useConstants();
  const { workstreamID } = router.query;

  const [result] = useQuery({
    query: WorkstreamByIDDocument,
    variables: {
      workstreamID: workstreamID as string,
    },
  });

  const [fuxBalanceResponse] = useQuery({
    query: TokenBalanceDocument,
    variables: {
      address: address?.toLowerCase() || "",
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

  let fuxGiven = _workstream?.fuxGiven?.find(
    (contributor) =>
      contributor.user.id.toLowerCase() === address?.toLowerCase()
  )?.balance;

  if (!fuxGiven) {
    fuxGiven = BigNumber.from("0");
  }

  const { data: fuxAvailableData } = fuxBalanceResponse;

  const fuxAvailable = fuxAvailableData?.tokenBalances.find(
    (balance) => balance
  )?.balance;

  if (!fuxAvailable) {
    fuxGiven = BigNumber.from("0");
  }

  const contributors = _workstream?.contributors?.map(
    (contributor) => contributor.user
  );

  //TODO Merge evaluations into averages
  // const getAverageEvaluations = (evaluations: Evaluation[]) => {
  //   const merged = _.mergeWith(
  //     {},
  //     ...evaluations,
  //     (objValue: any, srcValue: any) => (objValue || []).concat(srcValue)
  //   );

  //   console.log("merged: ", merged);
  // };

  // useEffect(() => {
  //   if (_workstream?.evaluations) {
  //     const evaluations = _workstream?.evaluations as Evaluation[];

  //     getAverageEvaluations(evaluations);
  //   }
  // }, [_workstream]);

  // const handleFinalize = async () => {
  //   const _contributors = contributors?.map((contributor) => contributor.id);
  //   const _vFux: BigNumberish[] = [];

  //   if (!_contributors || !_vFux || _vFux.length === 0) {
  //     console.log("invalid input");
  //     return;
  //   }

  //   // closeWorkstream(Number(workstreamID), _contributors, _vFux);
  // };

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
                  pathname: "/resolve/[workstreamID]",
                  query: { workstreamID },
                }}
                passHref
              >
                <Button p={"1em"}>
                  <Link>EVALUATE</Link>
                </Button>
              </NextLink>
              {_workstream.coordinator?.id.toLowerCase() ===
              address?.toLowerCase() ? (
                <Button onClick={() => console.log("FINALIZE")}>
                  FINALIZE
                </Button>
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

          <TableContainer>
            <Table size="md">
              <Thead>
                <Tr>
                  <Th>Contributor</Th>
                  <Th isNumeric>FUX Given</Th>
                  <Th isNumeric>vFUX Earned</Th>
                </Tr>
              </Thead>
              <Tbody>
                <ContributorRow
                  address={
                    (_workstream.coordinator?.id as `0x${string}`) || "0x"
                  }
                />
                {_workstream.contributors?.map(({ user }, index) => (
                  <ContributorRow
                    key={index}
                    address={user.id as `0x${string}`}
                  />
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th></Th>
                  <Th></Th>
                  <Th></Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </VStack>
      </VStack>
    </>
  ) : (
    <Text>{`No workstream found for ID: ${workstreamID}`}</Text>
  );
};

export default Workstream;
