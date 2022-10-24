import { useFuxBalance, useMintFux, useVFuxBalance } from "../../../hooks/fux";
import { useUserProfile } from "../../../hooks/user";
import {
  Avatar,
  HStack,
  Link,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Text,
  StatGroup,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

const FuxOverview: React.FC<{}> = ({}) => {
  const claimFux = useMintFux();
  const fuxBalance = useFuxBalance();
  const vFuxBalance = useVFuxBalance();
  const { displayName, avatar, loading } = useUserProfile();

  return (
    <HStack
      w={"100%"}
      bg="#221527"
      justifyContent="space-around"
      align="center"
      pb={"2em"}
    >
      <HStack p="5">
        <Avatar name={displayName()} src={avatar && !loading ? avatar : ""} />
        <Text>{displayName(true)}</Text>
      </HStack>
      <StatGroup textAlign="left">
        <Stat p={"1em"}>
          <StatLabel>FUX available</StatLabel>
          <StatNumber bg="#301A3A" pl={"5"} w="8em">{`${
            fuxBalance ? fuxBalance.toString() : "0"
          } / 100 FUX`}</StatNumber>
          {fuxBalance?.gt("0") ? undefined : (
            <StatHelpText color="#BF7AF0">
              <Link onClick={() => claimFux()}>Claim FUX</Link>
            </StatHelpText>
          )}
        </Stat>
        <Stat p={"1em"}>
          <StatLabel>vFUX earned</StatLabel>
          <StatNumber bg="#301A3A" pl={"5"} w="8em">{`${
            vFuxBalance ? vFuxBalance.toString() : "0"
          } vFUX`}</StatNumber>
          <NextLink href="/history" passHref>
            <StatHelpText color="#BF7AF0">
              <Link>View history</Link>
            </StatHelpText>
          </NextLink>
        </Stat>
      </StatGroup>
    </HStack>
  );
};

export default FuxOverview;
