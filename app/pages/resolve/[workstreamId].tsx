import { CommitmentForm } from "../../components/FUX/CommitmentForm";
import { ValueForm } from "../../components/FUX/ValueForm";
import WorkstreamHeader from "../../components/FUX/WorkstreamHeader";
import { useWorkstream } from "../../hooks/graph";
import { VStack, Text, Heading, Center } from "@chakra-ui/react";
import { DateTime } from "luxon";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const calculateTimeToDeadline = (workstream?: Partial<Workstream>) => {
  if (workstream?.deadline) {
    const now = DateTime.now();
    const deadline = DateTime.fromSeconds(workstream.deadline);

    return deadline
      .diff(now, ["months", "days", "hours", "minutes"])
      .toFormat("d 'days ' h 'hours ' mm 'minutes'");
  }

  return;
};

const Resolve: NextPage = () => {
  const router = useRouter();
  const { workstreamId } = router.query;
  const [workstream, setWorkstream] = useState<Partial<Workstream>>();

  //TODO actual Graph call
  //   const { loading, workstream: _workstream } = useWorkstream(workstreamId);
  const { workstream: ws } = useWorkstream(workstreamId as string);
  const timeToDeadline = calculateTimeToDeadline(workstream);

  useEffect(() => {
    if (!workstream) {
      setWorkstream(ws);
    }
  }, [workstream, ws]);

  return (
    <VStack w={"100%"}>
      {workstream ? (
        <>
          <WorkstreamHeader
            workstreamTitle={workstream?.name || "No title found"}
          />
          <VStack w={"70%"} maxW={"700px"}>
            {workstream?.commitmentRatingSubmitted ? (
              <>
                <Heading>Rate value added</Heading>
                <Text>
                  {timeToDeadline
                    ? `${timeToDeadline} left to resolve`
                    : "Deadline unknown"}
                </Text>
                <ValueForm workstream={workstream} />
              </>
            ) : (
              <>
                <Heading>Rate commitment realised</Heading>
                <Text>
                  {timeToDeadline
                    ? `${timeToDeadline} left to resolve`
                    : "Deadline unknown"}
                </Text>
                <CommitmentForm workstream={workstream} />
              </>
            )}
          </VStack>
        </>
      ) : undefined}
    </VStack>
  );
};

export default Resolve;
