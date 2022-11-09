import { WorkstreamEvaluationsDocument } from "../../.graphclient";
import { ContributorRow } from "../../components/FUX/ContributorRow";
import ValueHeader from "../../components/FUX/ValueHeader";
import { ValueResolutionForm } from "../../components/FUX/ValueResolutionForm";
import { ValueReviewForm } from "../../components/FUX/ValueReviewForm";
import { VStack, Text, Heading, HStack } from "@chakra-ui/react";
import { useWallet } from "@raidguild/quiver";
import { DateTime } from "luxon";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "urql";

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
  const { address: user } = useWallet();
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

  console.log("wprlstrea,: ", _workstream?.coordinator?.id);
  console.log("id in objecy: ", _workstream?.id);

  return _workstream ? (
    <>
      <VStack w={"100%"}>
        <ValueHeader />
        <VStack w={"70%"} maxW={"700px"}>
          <HStack paddingTop={"2em"} paddingBottom={"2em"}>
            <ContributorRow address={_workstream.coordinator?.id || ""} />

            <Heading size={"md"}>{`${
              _workstream?.name || "No name found"
            }`}</Heading>
            <Text>
              {_workstream?.deadline
                ? `${calculateTimeToDeadline(
                    _workstream.deadline
                  )} left to resolve`
                : "Deadline unknown"}
            </Text>
          </HStack>
          {user?.toLowerCase() ===
          _workstream?.coordinator?.id.toLowerCase() ? (
            <ValueResolutionForm workstream={_workstream} />
          ) : (
            <ValueReviewForm workstream={_workstream} />
          )}
        </VStack>
      </VStack>
    </>
  ) : (
    <Text>{`No workstream found for ID: ${workstreamID}`}</Text>
  );
};

export default Resolve;
