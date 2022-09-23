import {
  Text,
  VStack,
  Heading,
} from "@chakra-ui/react";
import React from "react";

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
