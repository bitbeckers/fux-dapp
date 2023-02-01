import { UserDocument } from "../../../.graphclient";
import { useMintFux } from "../../../hooks/fux";
import { ContributorRow } from "../ContributorRow";
import {
  HStack,
  Link,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
} from "@chakra-ui/react";
import { useWallet } from "@raidguild/quiver";
import NextLink from "next/link";
import React from "react";
import { useQuery } from "urql";

const FuxOverview: React.FC<{}> = ({}) => {
  const claimFux = useMintFux();
  const { address } = useWallet();

  const [result, reexecuteQuery] = useQuery({
    query: UserDocument,
    variables: {
      address: address?.toLowerCase() || "",
    },
  });

  const { data, fetching, error } = result;

  const fuxBalance = data?.user?.balances?.find(
    (balance) => balance.token.name === "FUX"
  )?.balance;

  const vFuxBalance = data?.user?.balances?.find(
    (balance) => balance.token.name === "vFUX"
  )?.balance;

  return (
    <HStack
      w={"100%"}
      bg="#221527"
      justifyContent="space-around"
      align="center"
      pb={"2em"}
    >
      {!address || fetching ? undefined : (
        <>
          <ContributorRow address={address} />
          <StatGroup textAlign="left">
            <Stat p={"1em"}>
              <StatLabel>FUX available</StatLabel>
              <StatNumber bg="#301A3A" pl={"5"} w="8em">{`${
                fuxBalance ? fuxBalance : "..."
              } / 100 FUX`}</StatNumber>
              {fuxBalance ? (
                <></>
              ) : (
                <StatHelpText color="#BF7AF0">
                  <Link onClick={() => claimFux()}>Claim FUX</Link>
                </StatHelpText>
              )}
            </Stat>
            <Stat p={"1em"}>
              <StatLabel>vFUX earned</StatLabel>
              <StatNumber bg="#301A3A" pl={"5"} w="8em">{`
                ${vFuxBalance ? vFuxBalance : "0"}`}</StatNumber>
              <NextLink href="/history" passHref>
                <StatHelpText color="#BF7AF0">
                  <Link>View history</Link>
                </StatHelpText>
              </NextLink>
            </Stat>
          </StatGroup>
        </>
      )}
    </HStack>
  );
};

export default FuxOverview;
