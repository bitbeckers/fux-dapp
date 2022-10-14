import ValueHeader from "../../components/FUX/ValueHeader";
import { ValueReviewForm } from "../../components/FUX/ValueReviewForm";
import { useValueEvaluation } from "../../hooks/evaluations";
import {
  useMintVFux,
  useVFuxBalanceForWorkstreamEvaluation,
} from "../../hooks/fux";
import { useGetWorkstreamByID } from "../../hooks/workstream";
import { VStack, Text, Heading, HStack, Button, Box } from "@chakra-ui/react";
import { useWallet } from "@raidguild/quiver";
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
  const mintVFux = useMintVFux();
  const { address: user } = useWallet();

  const { workstreamID } = router.query;

  const workstream = useGetWorkstreamByID(+workstreamID!);
  const timeToDeadline = calculateTimeToDeadline(
    workstream?.deadline.toNumber()
  );
  const vFuxAvailable = useVFuxBalanceForWorkstreamEvaluation(+workstreamID!);
  const valueEvaluation = useValueEvaluation(user || "", +workstreamID!);

  console.log("vFUX Available: ", vFuxAvailable);
  console.log("value evaluation: ", valueEvaluation);

  // TODO check on existing evaluation
  return (
    <VStack w={"100%"}>
      <>
        <ValueHeader />
        <VStack w={"70%"} maxW={"700px"}>
          <HStack paddingTop={"2em"} paddingBottom={"2em"}>
            <Heading size={"md"}>{`Workstream: ${
              workstream?.name || "..."
            }`}</Heading>
            <Text>
              {timeToDeadline
                ? `${timeToDeadline} left to resolve`
                : "Deadline unknown"}
            </Text>
          </HStack>

          {vFuxAvailable && vFuxAvailable > 0 ? (
            <ValueReviewForm workstreamID={+workstreamID!} />
          ) : (
            <Box w="80%" justifyContent="center">
              <Text>Claim 100vFUX to start evaluating your contributors</Text>
              <Button onClick={() => mintVFux(+workstreamID!)}>
                Claim 100 vFUX
              </Button>
            </Box>
          )}
        </VStack>
      </>
    </VStack>
  );
};

export default Resolve;
