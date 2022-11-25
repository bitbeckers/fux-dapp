import { Text, VStack, Heading } from "@chakra-ui/react";
import React from "react";

const ValueHeader: React.FC<{}> = ({}) => {
  return (
    <VStack
      w={"100%"}
      bg="#221527"
      justifyContent="center"
      align="center"
      pb={"2em"}
    >
      <Heading>Evaluate value add</Heading>
      <Text w={"50%"} textAlign="center">
        Allocate points based on how well you think collaborators executed on
        their commitment.
      </Text>
    </VStack>
  );
};

export default ValueHeader;
