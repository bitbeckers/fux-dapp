import { useFux } from "../../../hooks/fux";
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
import { formatAddress } from "@raidguild/quiver";
import NextLink from "next/link";
import React, { useState } from "react";

const FuxOverview: React.FC<{}> = ({}) => {
  const { currentUser, claimFux } = useFux();

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
          name={currentUser?.address ? currentUser.address : "n/a"}
          src="https://sguru.org/wp-content/uploads/2017/06/steam-avatar-profile-picture-1574.jpg"
        />
        <Text>
          {currentUser?.address ? formatAddress(currentUser.address) : "n/a"}
        </Text>
      </HStack>
      <StatGroup textAlign="left">
        <Stat p={"1em"}>
          <StatLabel>FUX available</StatLabel>
          <StatNumber bg="#301A3A" pl={"5"} w="8em">{`${
            currentUser?.fux ? currentUser.fux?.available.toString() : "..."
          } / ${
            currentUser?.fux ? currentUser.fux?.total.toString() : "..."
          } FUX`}</StatNumber>
          <StatHelpText color="#BF7AF0">
            <Link onClick={() => claimFux()}>Claim FUX</Link>
          </StatHelpText>
        </Stat>
        <Stat p={"1em"}>
          <StatLabel>vFUX earned</StatLabel>
          <StatNumber bg="#301A3A" pl={"5"} w="8em">{`${
            currentUser?.fux ? currentUser.vFuxBalance?.toString() : "..."
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
