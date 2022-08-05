import { useFux } from "../../../contexts/FuxProvider";
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
  Spacer,
  VStack,
  Center,
  Heading,
} from "@chakra-ui/react";
import { formatAddress } from "@raidguild/quiver";
import NextLink from "next/link";
import React, { useState } from "react";

const WorkstreamHeader: React.FC<{ workstreamTitle: string }> = ({
  workstreamTitle,
}) => {
  return (
    <VStack
      w={"100%"}
      bg="#221527"
      justifyContent="space-around"
      align="center"
      pb={"2em"}
    >
        <Heading>{workstreamTitle}</Heading>
        <Text w={"50%"}>Allocate vFUX based on how well you think collaborators executed on their commitment.</Text>
    </VStack>
  );
};

export default WorkstreamHeader;
