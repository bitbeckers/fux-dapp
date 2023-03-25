import {
  WorkstreamContributor,
  WorkstreamsByUserDocument,
} from "../.graphclient";
import FuxOverview from "../components/FUX/FuxOverview";
import WorkstreamCard from "../components/FUX/WorkstreamCard";
import WorkstreamModal from "../components/FUX/WorkstreamModal";
import {
  Flex,
  Divider,
  Accordion,
  Heading,
  Spacer,
  Spinner,
  Box,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useQuery } from "urql";
import { useAccount } from "wagmi";

const History: NextPage = () => {
  const { address: user } = useAccount();

  const [result, reexecuteQuery] = useQuery({
    query: WorkstreamsByUserDocument,
    variables: {
      contributor: user?.toLowerCase() || "",
    },
  });

  const { data, fetching, error } = result;

  const workstreams =
    data?.workstreamContributors as Partial<WorkstreamContributor>[];

  return (
    <Flex direction={"column"} gap={"1em"} w={"100%"}>
      <FuxOverview />

      <Heading py={12} margin={"auto"} textAlign={"center"}>
        Workstream History <WorkstreamModal onCloseAction={reexecuteQuery} />
      </Heading>

      <Divider />

      {fetching ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="white.500"
          size="xl"
          margin={"auto"}
        />
      ) : (
        <Box margin={"auto"} p={"1em"}>
          {workstreams && workstreams.length > 0 ? (
            <Accordion minW={[160, null, 768]} allowToggle={true}>
              {workstreams.map((workstream, index) => (
                <WorkstreamCard workstream={workstream} key={index} />
              ))}
            </Accordion>
          ) : (
            <Heading size="md" justifyContent={"center"}>
              No closed workstreams. Start committing!
            </Heading>
          )}
        </Box>
      )}
    </Flex>
  );
};

export default History;
