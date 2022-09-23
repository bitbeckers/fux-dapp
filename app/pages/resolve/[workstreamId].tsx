import { ValueReviewForm } from "../../components/FUX/ValueReviewForm";
import WorkstreamHeader from "../../components/FUX/WorkstreamHeader";
import { useValueEvaluation } from "../../hooks/evaluations";
import { useGetWorkstreamByID } from "../../hooks/workstream";
import { VStack, Text, Heading } from "@chakra-ui/react";
import { DateTime } from "luxon";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const calculateTimeToDeadline = (timestamp: number | undefined) => {
  if (timestamp && !isNaN(timestamp)) {
    const now = DateTime.now();
    const deadline = DateTime.fromSeconds(timestamp);

    return deadline
      .diff(now, ["months", "days", "hours", "minutes"])
      .toFormat("d 'days ' h 'hours ' mm 'minutes'");
  }

  return "...";
};

const Resolve: NextPage = () => {
  const router = useRouter();
  const { workstreamID } = router.query;

  const workstream = useGetWorkstreamByID(Number(workstreamID));
  const timeToDeadline = calculateTimeToDeadline(
    workstream?.deadline.toNumber()
  );
  const valueEvaluation = useValueEvaluation(+workstreamID!);

  return (
    <VStack w={"100%"}>
      <>
        <WorkstreamHeader
          workstreamTitle={workstream?.name || "No title found"}
        />
        <VStack w={"70%"} maxW={"700px"}>
          <Heading>Rate contributor value add</Heading>
          <Text>
            {timeToDeadline
              ? `${timeToDeadline} left to resolve`
              : "Deadline unknown"}
          </Text>
          <ValueReviewForm workstreamID={+workstreamID!} />
        </VStack>
      </>
    </VStack>
  );
};

export default Resolve;
