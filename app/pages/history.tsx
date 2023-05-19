import {
  WorkstreamContributor,
  WorkstreamsByUserDocument,
} from "../.graphclient";
import FuxOverview from "../components/FUX/FuxOverview";
import WorkstreamCard from "../components/FUX/WorkstreamCard";
import {
  Box,
  Flex,
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
    query: WorkstreamsByUserDocument,
    variables: {
      contributor: user?.toLowerCase() || "",
    },
  });

  const { data, fetching, error } = result;

  const workstreams =
    data?.workstreamContributors as Partial<WorkstreamContributor>[];

  return (
    <Box>
      <Flex w="100vw">
        <FuxOverview />
      </Flex>
      <Flex direction={"column"} mx="auto" maxW="800px" p={[6, null, 12]}>
        <Heading py={12}>Workstream History</Heading>

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
            {workstreams && workstreams.length > 0 ? (
              <Accordion w={"100%"} allowToggle={true}>
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
      </Flex>
    </Box>
  );
};

export default History;
