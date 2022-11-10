import { User, UserWorkstreamFragmentFragment } from "../../../.graphclient";
import { ContributorRow } from "../ContributorRow";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Heading,
  HStack,
  Table,
  TableContainer,
  Tbody,
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

type Contributor = {
  user: {
    id: string;
  };
};

type Evaluation = {
  creator: {
    id: string;
  };
  ratings: BigNumberish[];
  contributors: Pick<User, "id">[];
};

const WorkstreamCard: React.FC<{
  workstream: UserWorkstreamFragmentFragment;
}> = ({ workstream }) => {
  const _workstream = workstream.workstream;

  const evaluationRow = (
    sortedContributors: Contributor[],
    evaluation: Evaluation
  ) => {
    const _contributors = evaluation.contributors;
    const _ratings = evaluation.ratings;

    const mapped = sortedContributors.map((contributor) => {
      const _index = _contributors.findIndex(
        ({ id }) => id.toLowerCase() === contributor?.user?.id.toLowerCase()
      );
      return _index >= 0 ? _ratings[_index] : "-";
    });

    return (
      <Tr key={evaluation.creator.id}>
        <Td>
          <Heading size="sm">{formatAddress(evaluation.creator.id)}</Heading>
        </Td>
        {mapped.map((rating, index) => (
          <Td key={index}>{rating.toString()}</Td>
        ))}
      </Tr>
    );
  };

  const evaluationOverview = (
    contributors: Contributor[],
    evaluations: Evaluation[]
  ) => {
    const sortedContributors = sortBy(contributors).filter(
      (contributor) => contributor
    );

    const headers = (
      <Thead>
        <Tr>
          <Th>Evaluator</Th>
          {sortedContributors.map((contributor, index) => (
            <Th key={index}>{formatAddress(contributor?.user?.id) || ""}</Th>
          ))}
        </Tr>
      </Thead>
    );

    const rows = evaluations.map((evaluation) => {
      return evaluationRow(sortedContributors, evaluation);
    });

    return (
      <TableContainer flex={"flex-start"}>
        <Heading size="sm">Evaluations:</Heading>
        <Table variant="simple">
          {headers}
          <Tbody>{rows}</Tbody>
        </Table>
      </TableContainer>
    );
  };

  return _workstream ? (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Heading size="md" flex="1" textAlign="left">
            {_workstream.name?.toUpperCase()}
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
            {_workstream.contributors?.map(({ user }, index) => (
              <ContributorRow key={index} address={user.id} />
            ))}
          </Flex>
        </VStack>

        {_workstream.resolved &&
        _workstream.evaluations &&
        _workstream.contributors
          ? evaluationOverview(
              _workstream.contributors.map((contributor) => contributor),
              _workstream.evaluations
            )
          : undefined}
      </AccordionPanel>
    </AccordionItem>
  ) : null;
};

export default WorkstreamCard;
