import { WorkstreamByIDDocument } from "../../.graphclient";
import { FinalizeForm } from "../../components/FUX/FinalizeForm";
import User from "../../components/FUX/User";
import ValueHeader from "../../components/FUX/ValueHeader";
import {
  VStack,
  Text,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  Heading,
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
    query: WorkstreamByIDDocument,
    variables: {
      id: (workstreamID as string) || "",
    },
  });

  const { data, fetching, error } = result;
  const _workstream = data?.workstream;

  //TODO Merge evaluations into averages
  // const getAverageEvaluations = (evaluations: Evaluation[]) => {
  //   const merged = _.mergeWith(
  //     {},
  //     ...evaluations,
  //     (objValue: any, srcValue: any) => (objValue || []).concat(srcValue)
  //   );

  //   console.log("merged: ", merged);
  // };

  // useEffect(() => {
  //   if (_workstream?.evaluations) {
  //     const evaluations = _workstream?.evaluations as Evaluation[];

  //     getAverageEvaluations(evaluations);
  //   }
  // }, [_workstream]);

  // const handleFinalize = async () => {
  //   const _contributors = contributors?.map((contributor) => contributor.id);
  //   const _vFux: BigNumberish[] = [];

  //   if (!_contributors || !_vFux || _vFux.length === 0) {
  //     console.log("invalid input");
  //     return;
  //   }

  //   // closeWorkstream(Number(workstreamID), _contributors, _vFux);
  // };

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
          <FinalizeForm workstream={_workstream} />
        </VStack>
      </VStack>
    </>
  ) : (
    <Text>{`No workstream found for ID: ${workstreamID}`}</Text>
  );
};

export default Resolve;
