import FuxOverview from "../components/FUX/FuxOverview";
import { useFuxBalance, useMintFux } from "../hooks/fux";
import { VStack, Button, Text, Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Start: NextPage = () => {
  const router = useRouter();
  const claimFux = useMintFux();
  const fuxBalance = useFuxBalance();

  useEffect(() => {
    if (fuxBalance?.gt(0)) {
      router.push("/workstreams");
    }
  }, [fuxBalance, router]);

  console.log("Fuxbalance: ", fuxBalance?.toString());

  return (
    <VStack spacing={8} w={"100%"}>
      <FuxOverview />
      <Box w="80%" justifyContent="center">
        <Text fontSize="4xl">Claim your FUX to get started</Text>
        <Button onClick={() => claimFux()}>Claim 100 FUX</Button>
      </Box>
    </VStack>
  );
};

export default Start;
