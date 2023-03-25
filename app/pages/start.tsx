import { UserDocument } from "../.graphclient";
import ConnectWallet from "../components/ConnectWallet";
import FuxOverview from "../components/FUX/FuxOverview";
import { useCustomToasts } from "../hooks/toast";
import { contractAddresses, contractABI } from "../utils/constants";
import { VStack, Button, Text, Center } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "urql";
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";

const Start: NextPage = () => {
  const router = useRouter();
  const { address } = useAccount();
  const toast = useCustomToasts();

  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "mintFux",
  });

  const { data: tx, write } = useContractWrite({
    ...config,
    onError(e) {
      toast.error(e);
    },
    onSuccess(tx) {
      toast.success("Minting FUX", `Sending FUX to ${address}`);
      console.log(tx);
    },
  });

  const [result] = useQuery({
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
            <Button onClick={() => write?.()}>Claim 100 FUX</Button>
          </VStack>
        </Center>
      ) : (
        <ConnectWallet />
      )}
    </VStack>
  );
};

export default Start;
