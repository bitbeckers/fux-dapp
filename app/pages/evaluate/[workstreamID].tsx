import { StartEvaluation } from "../../components/FUX/StartEvaluation";
import User from "../../components/FUX/User";
import ValueHeader from "../../components/FUX/ValueHeader";
import { ValueReviewForm } from "../../components/FUX/ValueReviewForm";
import { useGraphClient } from "../../hooks/graphSdk";
import {
  VStack,
  Text,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  Divider,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

const Evaluate: NextPage = () => {
  const { address } = useAccount();
  const router = useRouter();
  const { workstreamID } = router.query;
  const { sdk } = useGraphClient();

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

  console.log(_workstream);
  const getForm = (ws: Partial<typeof _workstream>) => {
    if (!ws?.status) return <Text>Workstream not found</Text>;

    if (!ws?.status) return <Text>Workstream status not found</Text>;

    if (ws?.status && ws.status !== "Closed")
      return <ValueReviewForm workstream={ws} />;
    if (ws?.status && ws.status === "Closed")
      return <Text>Workstream is resolved</Text>;
  };

  const form = getForm(_workstream);

  return _workstream ? (
    <>
      <VStack w={"100%"}>
        <ValueHeader name={_workstream?.name ? _workstream.name : undefined} />
        <VStack w={"100%"} maxW={"800px"}>
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
          {_workstream.coordinator?.id.toLowerCase() ===
            address?.toLowerCase() && (
            <>
              <StartEvaluation workstream={_workstream} />
              <Divider />
            </>
          )}
          {form}
        </VStack>
      </VStack>
    </>
  ) : (
    <Text>{`No workstream found for ID: ${workstreamID}`}</Text>
  );
};

export default Evaluate;
