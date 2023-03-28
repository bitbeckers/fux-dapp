import { UserDocument } from "../../../.graphclient";
import User from "../User";
import {
  Box,
  Flex,
  HStack,
  Link,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useQuery } from "urql";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { useCustomToasts } from "../../../hooks/toast";
import { contractAddresses, contractABI } from "../../../utils/constants";

const FuxOverview: React.FC<{}> = ({}) => {
  const { address } = useAccount();

  const { error: errorToast, success: successToast } = useCustomToasts();
  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "mintFux",
  });
  const {
    data: tx,
    isLoading,
    isSuccess,
    write,
  } = useContractWrite({
    ...config,
    onError(e) {
      errorToast(e);
    },
    onSuccess(tx) {
      successToast("Minted FUX", `FUX minted to ${address}`);
      console.log(tx);
    },
  });

  const [result, reexecuteQuery] = useQuery({
    query: UserDocument,
    variables: {
      address: address?.toLowerCase() || "",
    },
  });

  const { data, fetching, error } = result;

  const fuxBalance = data?.user?.balances?.find(
    (balance) => balance.token.name === "FUX"
  )?.amount;

  const vFuxBalance = data?.user?.balances?.find(
    (balance) => balance.token.name === "vFUX"
  )?.amount;

  return (
    <HStack
      w={"100%"}
      bg="#221527"
      justifyContent="space-around"
      align="center"
      pb={"2em"}
    >
      {!address || fetching ? undefined : (
        <Flex flexWrap="wrap" direction={['column', null, "row"]} w="100%" alignItems="center" justifyContent="center">
          <Flex maxW="1200px" mx="auto" flexWrap="wrap" direction={['column', null, "row"]}>
            <Box w="100%">
              <User address={address} displayAvatar={true} />
            </Box>
            <Stat py={"1em"}>
              <StatLabel>FUX Available</StatLabel>
              <StatNumber fontFamily="mono" fontSize="lg" fontWeight="100" bg="#301A3A" p={3} my={2} w="10em">{`${
                fuxBalance ? fuxBalance : "..."
              } / 100 FUX`}</StatNumber>
              {fuxBalance ? (
                <></>
              ) : (
                <StatHelpText color="#BF7AF0">
                  <Link onClick={() => write?.()}>Claim FUX</Link>
                </StatHelpText>
              )}
            </Stat>
            <Stat py={"1em"}>
              <StatLabel>vFUX Earned</StatLabel>
              <StatNumber fontFamily="mono" fontSize="lg" fontWeight="100" p={3} my={2} bg="#301A3A" w="10em">{`
                ${vFuxBalance ? vFuxBalance : "0"}`}</StatNumber>
              <NextLink href="/history" passHref>
                <StatHelpText color="#BF7AF0">
                  <Link>View history</Link>
                </StatHelpText>
              </NextLink>
            </Stat>
          </Flex>
        </Flex>
      )}
    </HStack>
  );
};

export default FuxOverview;
