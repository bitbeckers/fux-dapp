import { useFuxBalance, useMintFux, useVFuxBalance } from "../../../hooks/fux";
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
import { formatAddress, useWallet } from "@raidguild/quiver";
import NextLink from "next/link";
import React from "react";

const FuxOverview: React.FC<{}> = ({}) => {
  const { address: user } = useWallet();
  const claimFux = useMintFux();
  const fuxBalance = useFuxBalance();
  const vFuxBalance = useVFuxBalance();
  return (
    <HStack
      w={"100%"}
      bg="#221527"
      justifyContent="space-around"
      align="center"
      pb={"2em"}
    >
      <HStack p="5">
        <Avatar
          name={user ? user : "n/a"}
          src="https://sguru.org/wp-content/uploads/2017/06/steam-avatar-profile-picture-1574.jpg"
        />
        <Text>{user ? formatAddress(user) : "n/a"}</Text>
      </HStack>
      <StatGroup textAlign="left">
        <Stat p={"1em"}>
          <StatLabel>FUX available</StatLabel>
          <StatNumber bg="#301A3A" pl={"5"} w="8em">{`${
            fuxBalance ? fuxBalance.toString() : "..."
          } / 100 FUX`}</StatNumber>
          <StatHelpText color="#BF7AF0">
            <Link onClick={() => claimFux()}>Claim FUX</Link>
          </StatHelpText>
        </Stat>
        <Stat p={"1em"}>
          <StatLabel>vFUX earned</StatLabel>
          <StatNumber bg="#301A3A" pl={"5"} w="8em">{`${
            vFuxBalance ? vFuxBalance.toString() : "0"
          } vFUX`}</StatNumber>
          <NextLink href="/fux" passHref>
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
