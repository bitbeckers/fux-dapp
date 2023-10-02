import { Text, VStack, Heading } from "@chakra-ui/react";
import React from "react";

const ValueHeader: React.FC<{ name?: string }> = ({ name }) => {
  return (
    <VStack
      w={"100%"}
      bg="#221527"
      justifyContent="center"
      align="center"
      pt={"2em"}
      pb={"2em"}
    >
      <Heading>{`Evaluate ${name ? name : ""}`}</Heading>
      <Text w={"50%"} textAlign="center">
        Allocate points based on how well you think collaborators executed on
        their commitment.
      </Text>
    </VStack>
  );
};

export default ValueHeader;
