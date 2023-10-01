import { FinalizeForm } from "../../components/FinalizeForm";
import TokenBalance from "../../components/TokenBalance";
import User from "../../components/User";
import WorkstreamCard from "../../components/WorkstreamCard";
import { useGraphClient } from "../../hooks/useGraphClient";
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
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Finalize: NextPage = () => {
  const router = useRouter();
  const { sdk } = useGraphClient();

  const { workstreamID } = router.query;

  const {
    isLoading,
    data: workstreams,
    error,
  } = useQuery({
    queryKey: ["workstream", workstreamID],
    queryFn: () => sdk.WorkstreamByID({ id: workstreamID as string }),
    refetchInterval: 5000,
  });

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
          <Heading>{`Finalize ${_workstream?.name}`}</Heading>
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
          {_workstream.status !== "Closed" ? (
            <FinalizeForm workstream={_workstream} />
          ) : (
            <>
              <Heading>Workstream not active</Heading>
              <WorkstreamCard workstream={_workstream} />
            </>
          )}
        </VStack>
      </VStack>
    </>
  ) : (
    <Text>{`No workstream found for ID: ${workstreamID}`}</Text>
  );
};

export default Finalize;
