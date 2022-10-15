import { useValueEvaluation } from "../../../hooks/evaluations";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";

const EvaluationAccordionItem: React.FC<{
  address: string;
  workstreamID: number;
}> = ({ address, workstreamID }) => {
  const evaluation = useValueEvaluation(address, workstreamID);

  const ratings = evaluation?.contributors.map((contributor, index) => (
    <Flex key={contributor}>
      <Text>{contributor}</Text>
      <Spacer />
      <Text fontWeight={"bold"}>{`${evaluation.ratings[index]} FUX`}</Text>
    </Flex>
  ));

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {address}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>{ratings}</AccordionPanel>
    </AccordionItem>
  );
};

export { EvaluationAccordionItem };
