import FuxOverview from "../components/FUX/FuxOverview";
import WorkstreamModal from "../components/FUX/WorkstreamModal";
import { useFux } from "../hooks/fux";
import { useWorkstreams } from "../hooks/workstream";
import { VStack, Button, Text, Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Start: NextPage = () => {
  const router = useRouter();
  const { currentUser, claimFux } = useFux();
  const { workstreams } = useWorkstreams();

  useEffect(() => {
    if (workstreams) {
      console.log("Routing to workstream commitment");
      router.push("/commitment");
    }
  }, [router, workstreams]);

  return (
    <VStack spacing={8} w={"100%"}>
      <FuxOverview />
      <Box w="80%" justifyContent="center">
        {currentUser?.fux?.available ? (
          <Box>
            <Text fontSize="4xl">
              Add a workstream to start allocation your FUX
            </Text>
            <WorkstreamModal />
          </Box>
        ) : (
          <Box>
            <Text fontSize="4xl">Claim your FUX to get started</Text>
            <Button onClick={claimFux}>
              Claim 100 FUX
            </Button>
          </Box>
        )}
      </Box>
    </VStack>
  );
};

export default Start;
