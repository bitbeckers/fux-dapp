import {
  Evaluation,
  User as GraphUser,
  WorkstreamContributor,
} from "../../../.graphclient";
import { useConstants } from "../../../utils/constants";
import { ContributorOverview } from "../ContributorOverview";
import User from "../User";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Heading,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { groupBy, map, uniqBy } from "lodash";
import { DateTime } from "luxon";
import React from "react";

const WorkstreamCard: React.FC<{
  workstream: Partial<WorkstreamContributor>;
}> = ({ workstream }) => {
  const _workstream = workstream.workstream;
  const { nativeToken } = useConstants();

  const evaluationRow = (
    sortedContributors: string[],
    user: string,
    evaluations: Evaluation[]
  ) => {
    const mapped = sortedContributors.map((contributor) => {
      const _index = evaluations.findIndex(
        (evaluation) =>
          evaluation.contributor?.id?.toLowerCase() ===
          contributor.toLowerCase()
      );
      return _index >= 0 ? evaluations[_index].rating : "-";
    });

    return (
      <Tr key={user}>
        <Td>
          <User address={user as `0x${string}`} />
        </Td>
        {mapped.map((rating, index) => (
          <Td key={index} textAlign={"center"}>
            {rating.toString()}
          </Td>
        ))}
      </Tr>
    );
  };

  const evaluationOverview = (evaluations: Evaluation[]) => {
    const sortedContributors = uniqBy(evaluations, "contributor.id").map(
      (sorted) => sorted.contributor.id
    );

    const groupedEvaluations = groupBy(evaluations, "creator.id");

    const headers = (
      <Thead>
        <Tr>
          <Th>Evaluator</Th>
          {sortedContributors.map((contributor, index) => (
            <Th key={index} alignContent="center">
              <User address={contributor as `0x${string}`} />
            </Th>
          ))}
        </Tr>
      </Thead>
    );

    const rows = map(groupedEvaluations, (evaluationsPerUser, user) =>
      evaluationRow(sortedContributors, user, evaluationsPerUser)
    );

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
    <AccordionItem py={6}>
      <AccordionButton>
        <Heading size="md" flex="1" textAlign="left">
          {_workstream?.name?.toString()}
        </Heading>
        <Text>{_workstream.status}</Text>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <Flex direction="column" alignItems={"flex-start"} py={3}>
          <Link href={'/workstream/' + _workstream?.id} color="primary">
           View Workstream
          </Link>
          <Text>
            Deadline:{" "}
            {DateTime.fromSeconds(
              Number(_workstream.deadline)
            ).toLocaleString()}
          </Text>
          {_workstream.funding > 0 && (
            <Text>
              Funding:{" "}
              {`${
                ethers.utils.formatEther(_workstream.funding).toString() || 0
              } ${nativeToken}`}
            </Text>
          )}
          <ContributorOverview workstream={_workstream} />
        </Flex>

        {_workstream.status &&
        _workstream.contributors &&
        _workstream.evaluations &&
        ["Evaluation", "Closed"].includes(_workstream.status)
          ? evaluationOverview(_workstream.evaluations)
          : undefined}
      </AccordionPanel>
    </AccordionItem>
  ) : null;
};

export default WorkstreamCard;
