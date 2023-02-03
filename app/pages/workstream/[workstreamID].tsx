import {
  EvaluationFragmentFragment,
  TokenBalanceDocument,
  UserWorkstream,
  WorkstreamByIDDocument,
} from "../../.graphclient";
import CommitFuxModal from "../../components/FUX/CommitFuxModal";
import { ContributorRow } from "../../components/FUX/ContributorRow";
import { useCloseWorkstream } from "../../hooks/resolution";
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
  Flex,
} from "@chakra-ui/react";
import { useWallet } from "@raidguild/quiver";
import { BigNumberish, ethers } from "ethers";
import _ from "lodash";
import { DateTime } from "luxon";
import type { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "urql";

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
  const { address: user } = useWallet();
  const { nativeToken } = useConstants();
  const closeWorkstream = useCloseWorkstream();
  const { workstreamID } = router.query;

  const [result, reexecuteQuery] = useQuery({
    query: WorkstreamByIDDocument,
    variables: {
      workstreamID: (workstreamID as string) || "",
    },
  });

  const { data, fetching, error } = result;
  const _workstream = data?.workstream;

  const fuxGiven = _workstream?.fuxGiven?.find(
    (contributor) => contributor.user.id.toLowerCase() === user?.toLowerCase()
  )?.balance;

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

  const contributors = _workstream?.contributors?.map(
    (contributor) => contributor.user
  );

  const getAverageEvaluations = (evaluations: Evaluation[]) => {
    const merged = _.mergeWith({}, ...evaluations, (objValue, srcValue) =>
      (objValue || []).concat(srcValue)
    );

    console.log("merged: ", merged);
  };

  useEffect(() => {
    if (_workstream?.evaluations) {
      const evaluations = _workstream?.evaluations as Evaluation[];

      getAverageEvaluations(evaluations);
    }
  }, [_workstream]);

  const handleFinalize = async () => {
    const _contributors = contributors?.map((contributor) => contributor.id);
    const _vFux: BigNumberish[] = [];

    if (!_contributors || !_vFux) {
      console.log("invalid input");
      return;
    }

    closeWorkstream(Number(workstreamID), _contributors, _vFux);
  };

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
                workstreamID={+_workstream.id}
                fuxGiven={fuxGiven}
                fuxAvailable={balance ? balance.balance : 0}
              />{" "}
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
              user?.toLowerCase() ? (
                <Button onClick={handleFinalize}>FINALIZE</Button>
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
          <HStack>
            <VStack alignItems={"flex-start"}>
              <Heading size="sm">Coordinator:</Heading>
              <ContributorRow address={_workstream.coordinator?.id || ""} />
            </VStack>
            <VStack alignItems={"flex-start"}>
              <Heading size="sm">Contributors:</Heading>
              <Flex gap="2">
                {_workstream.contributors?.map(({ user }, index) => (
                  <ContributorRow key={index} address={user.id} />
                ))}
              </Flex>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </>
  ) : (
    <Text>{`No workstream found for ID: ${workstreamID}`}</Text>
  );
};

export default Workstream;
