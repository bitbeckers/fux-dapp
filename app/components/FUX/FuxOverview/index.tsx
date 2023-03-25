import { UserDocument } from "../../../.graphclient";
import { useCustomToasts } from "../../../hooks/toast";
import { contractAddresses, contractABI } from "../../../utils/constants";
import User from "../User";
import {
  Flex,
  Link,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  Box,
  useMediaQuery,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useQuery } from "urql";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";

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

  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  return (
    <Box w={"100%"}>
      {!address || fetching ? undefined : (
        <Flex
          bg="plum.900"
          pb={"2em"}
          justifyContent={"center"}
          margin={"auto"}
        >
          {isSmallScreen ? (
            <></>
          ) : (
            <User address={address} displayAvatar={true} />
          )}
          <StatGroup>
            <Stat p={"1em"}>
              <StatLabel>FUX available</StatLabel>
              <StatNumber
                fontFamily="mono"
                fontSize="xl"
                fontWeight="100"
                bg="plum.700"
                p={"1em"}
                w="10em"
              >{`${fuxBalance ? fuxBalance : "..."} / 100 FUX`}</StatNumber>
              {fuxBalance ? undefined : (
                <StatHelpText color="primary.600">
                  <Link onClick={() => write?.()}>Claim FUX</Link>
                </StatHelpText>
              )}
            </Stat>
            <Stat p={"1em"}>
              <StatLabel>vFUX earned</StatLabel>
              <StatNumber
                fontFamily="mono"
                fontSize="xl"
                fontWeight="100"
                p={"1em"}
                bg="plum.700"
                w="10em"
              >{`
              ${vFuxBalance ? vFuxBalance : "0"}`}</StatNumber>
              <NextLink href="/history" passHref>
                <StatHelpText color="primary.600">
                  <Link>View history</Link>
                </StatHelpText>
              </NextLink>
            </Stat>
          </StatGroup>
        </Flex>
      )}
    </Box>
  );
};

export default FuxOverview;
