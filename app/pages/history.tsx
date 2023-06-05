import { WorkstreamContributor } from "../.graphclient";
import FuxOverview from "../components/FUX/FuxOverview";
import WorkstreamCard from "../components/FUX/WorkstreamCard";
import { useGraphClient } from "../hooks/graphSdk";
import {
  Box,
  Flex,
  Accordion,
  Heading,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useAccount } from "wagmi";

const History: NextPage = () => {
  const { address: user } = useAccount();
  const { sdk } = useGraphClient();

  const { isLoading, data, error } = useQuery({
    queryKey: ["workstreams", user?.toLowerCase()],
    queryFn: () =>
      sdk.WorkstreamsByContributor({ address: user?.toLowerCase() || "" }),
    refetchInterval: 10000,
  });

  const workstreams =
    data?.workstreamContributors as Partial<WorkstreamContributor>[];

  return (
    <Box>
      <Flex w="100vw">
        <FuxOverview />
      </Flex>
      <Flex direction={"column"} mx="auto" maxW="800px" p={[6, null, 12]}>
        <Heading py={12}>Workstream History</Heading>

        {isLoading ? (
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
