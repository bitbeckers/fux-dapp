import { WorkstreamEvaluationsDocument } from "../../.graphclient";
import User from "../../components/FUX/User";
import ValueHeader from "../../components/FUX/ValueHeader";
import { ValueReviewForm } from "../../components/FUX/ValueReviewForm";
import {
  VStack,
  Text,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "urql";
import { useAccount } from "wagmi";

const calculateTimeToDeadline = (timestamp?: number) => {
  if (!timestamp || isNaN(timestamp)) {
    return undefined;
  }

  const now = DateTime.now();
  const deadline = DateTime.fromSeconds(Number(timestamp));

  return deadline
    .diff(now, ["months", "days", "hours", "minutes"])
    .toFormat("d 'days ' h 'hours ' mm 'minutes'");
};

const Resolve: NextPage = () => {
  const router = useRouter();
  const { address: user } = useAccount();
  const { workstreamID } = router.query;

  const [result, reexecuteQuery] = useQuery({
    query: WorkstreamEvaluationsDocument,
    variables: {
      address: user?.toLowerCase() || "",
      workstreamID: (workstreamID as string) || "",
    },
  });

  const { data, fetching, error } = result;
  const _workstream = data?.userWorkstreams.find(
    (uw) => uw.workstream.id === workstreamID
  )?.workstream;

  return _workstream ? (
    <>
      <VStack w={"100%"}>
        <ValueHeader name={_workstream?.name ? _workstream.name : undefined} />
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
          <ValueReviewForm workstream={_workstream} />
        </VStack>
      </VStack>
    </>
  ) : (
    <Text>{`No workstream found for ID: ${workstreamID}`}</Text>
  );
};

export default Resolve;
