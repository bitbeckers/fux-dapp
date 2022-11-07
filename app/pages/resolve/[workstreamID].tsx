import { WorkstreamEvaluationsDocument } from "../../.graphclient";
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
  const { address } = useWallet();
  const { workstreamID } = router.query;

  const [result, reexecuteQuery] = useQuery({
    query: WorkstreamEvaluationsDocument,
    variables: {
      address: address?.toLowerCase() || "",
      workstreamID: (workstreamID as string) || "",
    },
  });

  const { data, fetching, error } = result;

  const timeToDeadline = calculateTimeToDeadline(data?.workstream?.deadline);

  console.log("Coordinator: ", data?.workstream?.coordinator?.id);

  const form =
    address?.toLowerCase() ===
    data?.workstream?.coordinator?.id.toLowerCase() ? (
      <ValueResolutionForm workstream={data} />
    ) : (
      <ValueReviewForm workstream={data} />
    );

  // TODO check on existing evaluation
  return data?.workstream?.id && !fetching ? (
    <>
      <VStack w={"100%"}>
        <ValueHeader />
        <VStack w={"70%"} maxW={"700px"}>
          <HStack paddingTop={"2em"} paddingBottom={"2em"}>
            <Heading size={"md"}>{`${
              data.workstream?.name || "No name found"
            }`}</Heading>
            <Text>
              {timeToDeadline
                ? `${timeToDeadline} left to resolve`
                : "Deadline unknown"}
            </Text>
          </HStack>
          {form}
        </VStack>
      </VStack>
    </>
  ) : (
    <Text>{`No workstream found for ID: ${workstreamID}`}</Text>
  );
};

export default Resolve;
