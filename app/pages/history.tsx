import { WorkstreamHistoryDocument } from "../.graphclient";
import FuxOverview from "../components/FUX/FuxOverview";
import WorkstreamCard from "../components/FUX/WorkstreamCard";
import WorkstreamModal from "../components/FUX/WorkstreamModal";
import { VStack, Divider, Accordion, Heading, Spacer } from "@chakra-ui/react";
import { useWallet } from "@raidguild/quiver";
import type { NextPage } from "next";
import { useQuery } from "urql";

const History: NextPage = () => {
  const { address: user } = useWallet();

  const [result, reexecuteQuery] = useQuery({
    query: WorkstreamHistoryDocument,
    variables: {
      address: user?.toLowerCase() || "",
    },
  });

  const { data, fetching, error } = result;

  return (
    <VStack spacing={8} w={"100%"}>
      <FuxOverview />
      <WorkstreamModal onCloseAction={reexecuteQuery} />
      <Divider />

      <Heading>Workstream History</Heading>

      {fetching ? (
        "Loading... "
      ) : (
        <Accordion w={"80%"} maxW={"769px"} allowToggle={true}>
          {data?.userWorkstreams.map((workstream, index) => (
            <WorkstreamCard workstream={workstream} key={index} />
          ))}
        </Accordion>
      )}
      <Spacer />
    </VStack>
  );
};

export default History;
