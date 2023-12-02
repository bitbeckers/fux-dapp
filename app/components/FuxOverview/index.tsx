import { useBlockTx } from "../../hooks/useBlockTx";
import { useCustomToasts } from "../../hooks/useCustomToasts";
import { useGraphClient } from "../../hooks/useGraphClient";
import { contractAddresses, contractABI } from "../../utils/constants";
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
  useBreakpointValue,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { prepareWriteContract, writeContract } from "@wagmi/core";
import NextLink from "next/link";
import React from "react";

const FuxOverview: React.FC<{ address?: `0x${string}` }> = ({ address }) => {
  const { sdk } = useGraphClient();
  const { checkChain } = useBlockTx();
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  const { error: errorToast, success: successToast } = useCustomToasts();

  const handleClaimFux = async () => {
    if (checkChain()) {
      const { request } = await prepareWriteContract({
        address: contractAddresses.fuxContractAddress,
        abi: contractABI.fux,
        functionName: "mintFux",
      });
      const { hash } = await writeContract(request);

      if (hash) {
        successToast(
          "Claiming FUX",
          "Transaction submitted with hash: " + hash
        );
      }
    }
  };

  const { data } = useQuery({
    queryKey: ["userByAddress", address?.toLowerCase()],
    queryFn: () => sdk.UserByAddress({ address: address?.toLowerCase() || "" }),
    refetchInterval: 5000,
    enabled: !!address,
  });

  const fuxBalance = data?.user?.balances?.find(
    ({ token }) => token.name === "FUX"
  )?.amount;

  const vFuxBalance = data?.user?.balances?.find(
    ({ token }) => token.name === "vFUX"
  )?.amount;

  return (
    <HStack
      w={"100%"}
      bg="#221527"
      justifyContent="space-around"
      align="center"
      pb={"2em"}
    >
      {!address ? undefined : (
        <Flex
          flexWrap="wrap"
          direction={["column", null, "row"]}
          w="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Flex
            maxW="1200px"
            mx="auto"
            flexWrap="wrap"
            direction={"row"}
            gap={"2em"}
          >
            {isSmallScreen ? undefined : (
              <User address={address} displayAvatar={true} />
            )}
            <Stat py={"1em"}>
              <StatLabel>FUX Available</StatLabel>
              <StatNumber
                fontFamily="mono"
                fontSize="lg"
                fontWeight="100"
                bg="#301A3A"
                p={3}
                my={2}
                w="10em"
              >{`${fuxBalance ? `${fuxBalance} /100` : "0"} FUX`}</StatNumber>
              {fuxBalance ? (
                <></>
              ) : (
                <StatHelpText color="#BF7AF0">
                  <Link onClick={handleClaimFux}>Claim FUX</Link>
                </StatHelpText>
              )}
            </Stat>
            <Stat py={"1em"}>
              <StatLabel>vFUX Earned</StatLabel>
              <StatNumber
                fontFamily="mono"
                fontSize="lg"
                fontWeight="100"
                p={3}
                my={2}
                bg="#301A3A"
                w="10em"
              >{`
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
