import { WorkstreamHistoryDocument } from "../.graphclient";
import FuxOverview from "../components/FUX/FuxOverview";
import WorkstreamCard from "../components/FUX/WorkstreamCard";
import WorkstreamModal from "../components/FUX/WorkstreamModal";
import {
  VStack,
  Divider,
  Accordion,
  Heading,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useQuery } from "urql";
import { useAccount } from "wagmi";

const History: NextPage = () => {
  const { address: user } = useAccount();

  const [result, reexecuteQuery] = useQuery({
    query: WorkstreamHistoryDocument,
    variables: {
      address: user?.toLowerCase() || "",
    },
  });

  const { data, fetching, error } = result;

  const workstreams = data?.userWorkstreams || [];

  return (
    <VStack spacing={8} w={"100%"}>
      <FuxOverview />
      <WorkstreamModal onCloseAction={reexecuteQuery} />
      <Divider />

      <Heading>Workstream History</Heading>

      {fetching ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="white.500"
          size="xl"
        />
      ) : (
        <>
          {workstreams.length > 0 ? (
            <Accordion w={"80%"} maxW={"769px"} allowToggle={true}>
              {workstreams.map((workstream, index) => (
                <WorkstreamCard workstream={workstream} key={index} />
              ))}
            </Accordion>
          ) : (
            <Heading size="md" justifyContent={"center"}>
              No closed workstreams. Start committing!
            </Heading>
          )}
        </>
      )}
      <Spacer />
    </VStack>
  );
};

export default History;
