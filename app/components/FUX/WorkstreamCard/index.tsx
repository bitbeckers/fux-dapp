import { UserWorkstreamFragmentFragment } from "../../../.graphclient";
import { ContributorRow } from "../ContributorRow";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { formatAddress } from "@raidguild/quiver";
import { BigNumberish } from "ethers";
import sortBy from "lodash/sortBy";
import React from "react";

type Evaluation = {
  creator: {
    id: string;
  };
  ratings: BigNumberish[];
  contributors: {
    id: string;
  }[];
};

const WorkstreamCard: React.FC<{
  workstream: UserWorkstreamFragmentFragment;
}> = ({ workstream }) => {
  const _workstream = workstream.workstream;

  const evaluationRow = (evaluation: Evaluation) => {
    return (
      <Tr>
        <Td>
          <Heading size="sm">{formatAddress(evaluation.creator.id)}</Heading>
        </Td>
        {evaluation.ratings.map((rating, index) => (
          <Td key={index}>{rating.toString()}</Td>
        ))}
      </Tr>
    );
  };

  const evaluationOverview = (
    contributors: string[],
    evaluations: Evaluation[]
  ) => {
    const sortedContributors = sortBy(contributors);
    const headers = (
      <Thead>
        <Th>Evaluator</Th>
        {sortedContributors.map((contributor, index) => (
          <Th key={index}>{formatAddress(contributor)}</Th>
        ))}
      </Thead>
    );

    const rows = evaluations.map((evaluation, index) => {
      return evaluationRow(evaluation);
    });

    return (
      <TableContainer flex={"flex-start"}>
        <Heading size="sm">Evaluations:</Heading>
        <Table variant="simple">
          {headers}
          <>{rows}</>
        </Table>
      </TableContainer>
    );
  };

  return _workstream ? (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Heading size="md" flex="1" textAlign="left">
            {_workstream.name}
          </Heading>
          <Text>{_workstream.resolved ? "Closed" : "Active"}</Text>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <VStack alignItems={"flex-start"}>
          <Heading size="sm">Coordinator:</Heading>
          <ContributorRow address={_workstream.coordinator?.id || ""} />
        </VStack>
        <VStack alignItems={"flex-start"}>
          <Heading size="sm">Contributor:</Heading>
          <Flex gap="2">
            {_workstream.contributors?.map((contributor, index) => (
              <ContributorRow key={index} address={contributor.id} />
            ))}
          </Flex>
        </VStack>

        {_workstream.resolved &&
        _workstream.evaluations &&
        _workstream.contributors
          ? evaluationOverview(
              _workstream.contributors.map(({ id }) => id),
              _workstream.evaluations
            )
          : undefined}
      </AccordionPanel>
    </AccordionItem>
  ) : null;
};

export default WorkstreamCard;
