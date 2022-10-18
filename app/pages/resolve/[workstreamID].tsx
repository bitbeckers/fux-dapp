import ValueHeader from "../../components/FUX/ValueHeader";
import { ValueResolutionForm } from "../../components/FUX/ValueResolutionForm";
import { ValueReviewForm } from "../../components/FUX/ValueReviewForm";
import { useValueEvaluation } from "../../hooks/evaluations";
import {
  useMintVFux,
  useVFuxBalanceForWorkstreamEvaluation,
} from "../../hooks/fux";
import { useGetWorkstreamByID } from "../../hooks/workstream";
import { VStack, Text, Heading, HStack, Button, Box } from "@chakra-ui/react";
import { useWallet } from "@raidguild/quiver";
import { BigNumber } from "ethers";
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

  const _workstreamID = Number(workstreamID);

  console.log("Router :", router);
  console.log("Resolve workstreamID: ", workstreamID);

  const workstream = useGetWorkstreamByID(_workstreamID);
  const timeToDeadline = calculateTimeToDeadline(
    workstream?.deadline.toNumber()
  );
  const vFuxAvailable = useVFuxBalanceForWorkstreamEvaluation(_workstreamID);
  const valueEvaluation = useValueEvaluation(user || "", _workstreamID);

  console.log("vFUX Available: ", vFuxAvailable);
  console.log("value evaluation: ", valueEvaluation);

  // TODO check on existing evaluation
  return (
    <>
      <VStack w={"100%"}>
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

          {vFuxAvailable && vFuxAvailable.gt("0") ? (
            user === workstream?.creator ? (
              <ValueResolutionForm workstreamID={_workstreamID} />
            ) : workstream?.creator ? (
              <ValueReviewForm workstreamID={_workstreamID} />
            ) : undefined
          ) : workstreamID ? (
            <Box w="80%" justifyContent="center">
              <Text>Claim 100vFUX to start evaluating your contributors</Text>
              <Button onClick={() => mintVFux(_workstreamID)}>
                Claim 100 vFUX
              </Button>
            </Box>
          ) : undefined}
        </VStack>
      </VStack>
    </>
  );
};

export default Resolve;
