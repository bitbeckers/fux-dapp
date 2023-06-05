import {
  WorkstreamByIDDocument,
  WorkstreamByIDQuery,
  WorkstreamByIDQueryVariables,
} from "../../.graphclient";
import { FinalizeForm } from "../../components/FUX/FinalizeForm";
import { StartEvaluation } from "../../components/FUX/StartEvaluation";
import User from "../../components/FUX/User";
import { useConstants } from "../../utils/constants";
import {
  VStack,
  Text,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { DateTime } from "luxon";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "urql";
import TokenBalance from "../../components/FUX/TokenBalance";

const Finalize: NextPage = () => {
  const router = useRouter();
  const { nativeToken } = useConstants();

  const { workstreamID } = router.query;

  const [queryResult, reexecuteQuery] = useQuery<
    WorkstreamByIDQuery,
    WorkstreamByIDQueryVariables
  >({
    query: WorkstreamByIDDocument,
    variables: {
      id: (workstreamID as string) || "",
    },
  });

  const { data: workstreams, fetching, error } = queryResult;
  const _workstream = workstreams?.workstreamContributors.find(
    ({ workstream }) => workstream?.id === workstreamID
  )?.workstream;

  return _workstream ? (
    <>
      <VStack w={"100%"}>
        <VStack
          w={"100%"}
          bg="#221527"
          justifyContent="center"
          align="center"
          pb={"2em"}
        >
          <Heading>{`Finalize ${
            _workstream.name ?? _workstream.name
          }`}</Heading>
          <Text w={"50%"} textAlign="center">
            Review and close workstream. Contributors will get their FUX back in
            addition to vFUX and any applicable funds.
          </Text>
        </VStack>
        <VStack w={"70%"} maxW={"700px"}>
          <HStack paddingTop={"2em"} paddingBottom={"2em"}>
            <Stat p={"1em"}>
              <StatLabel>Coordinator</StatLabel>
              <StatNumber bg="#301A3A" pl={"5"} w="8em">
                <User
                  address={
                    (_workstream?.coordinator?.id as `0x${string}`) || "0x"
                  }
                  size={"2xl"}
                />
              </StatNumber>
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
          </HStack>
          <Flex
            direction={["column", null, "row"]}
            align={["center", null, "center"]}
            flexWrap="wrap"
          >
            <Text>Workstream funds available</Text>
            {_workstream.funding?.map((funding) => (
              <TokenBalance
                key={funding.token.id}
                token={funding.token}
                amount={funding.amount}
              />
            ))}
          </Flex>
          {_workstream.status === "Started" ? (
            <StartEvaluation workstream={_workstream} />
          ) : _workstream.status === "Evaluation" ? (
            <FinalizeForm workstream={_workstream} />
          ) : (
            <Heading>Workstream not active</Heading>
          )}
        </VStack>
      </VStack>
    </>
  ) : (
    <Text>{`No workstream found for ID: ${workstreamID}`}</Text>
  );
};

export default Finalize;
