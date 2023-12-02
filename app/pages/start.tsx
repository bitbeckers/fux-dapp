import ConnectWallet from "../components/ConnectWallet";
import FuxOverview from "../components/FuxOverview";
import { useBlockTx } from "../hooks/useBlockTx";
import { useCustomToasts } from "../hooks/useCustomToasts";
import { useGraphClient } from "../hooks/useGraphClient";
import { contractAddresses, contractABI } from "../utils/constants";
import { VStack, Button, Text, Center } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";

const Start: NextPage = () => {
  const router = useRouter();
  const { address } = useAccount();
  const toast = useCustomToasts();
  const { sdk } = useGraphClient();
  const { checkChain } = useBlockTx();

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

  const { isLoading, data } = useQuery({
    queryKey: ["userByAddress", address?.toLowerCase() || ""],
    queryFn: () => sdk.UserByAddress({ address: address?.toLowerCase() || "" }),
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (data?.user?.fuxer) {
      router.push("/workstreams");
    }
  }, [data, router]);

  const handleClaim = () => {
    if (checkChain()) {
      write?.();
    }
  };

  return (
    <VStack spacing={8} w={"100%"}>
      <FuxOverview address={address} />
      {address ? (
        <Center w="80%" justifyContent="center">
          <VStack>
            <Text fontSize="4xl">Claim your FUX to get started</Text>
            <Button onClick={handleClaim}>Claim 100 FUX</Button>
          </VStack>
        </Center>
      ) : (
        <ConnectWallet />
      )}
    </VStack>
  );
};

export default Start;
