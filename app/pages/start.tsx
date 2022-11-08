import { UserDocument } from "../.graphclient";
import ConnectWallet from "../components/ConnectWallet";
import FuxOverview from "../components/FUX/FuxOverview";
import { useMintFux } from "../hooks/fux";
import { VStack, Button, Text, Center } from "@chakra-ui/react";
import { useWallet } from "@raidguild/quiver";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "urql";

const Start: NextPage = () => {
  const router = useRouter();
  const claimFux = useMintFux();
  const { address } = useWallet();

  const [result, reexecuteQuery] = useQuery({
    query: UserDocument,
    variables: {
      address: address?.toLowerCase() || "",
    },
  });

  const { data, fetching, error } = result;

  useEffect(() => {
    if (data?.user?.fuxer) {
      router.push("/workstreams");
    }
  }, [data, router]);

  return (
    <VStack spacing={8} w={"100%"}>
      <FuxOverview />
      {address ? (
        <Center w="80%" justifyContent="center">
          <VStack>
            <Text fontSize="4xl">Claim your FUX to get started</Text>
            <Button onClick={() => claimFux()}>Claim 100 FUX</Button>
          </VStack>
        </Center>
      ) : (
        <ConnectWallet />
      )}
    </VStack>
  );
};

export default Start;
