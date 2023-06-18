import { Workstream } from "../../.graphclient";
import { calculateRelative, parseEvaluations } from "../../utils/helpers";
import ContributorModal from "../ContributorModal";
import User from "../User";
import { StarIcon } from "@chakra-ui/icons";
import {
  Flex,
  Stat,
  StatNumber,
  Grid,
  GridItem,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { BigNumber } from "ethers";

export const ContributorOverview: React.FC<{
  workstream: Partial<Workstream>;
}> = ({ workstream }) => {
  const contributors = workstream?.contributors;

  if (!contributors) {
    return null;
  }

  const averages = parseEvaluations(workstream as Workstream);
  const relative = calculateRelative(averages);

  return (
    <Grid
      gap={6}
      templateColumns="repeat(12, 1fr)"
      w="100%"
      minW={[null, null, "480px"]}
      py={6}
    >
      <GridItem
        colSpan={6}
        display="flex"
        flexDirection="row"
        alignItems="center"
      >
        <Text pr={6}>Contributor</Text>
        {workstream.status === "Closed" ? undefined : (
          <ContributorModal
            workstreamID={BigNumber.from(workstream.id)}
            workstreamName={workstream.name || ""}
            contributors={workstream.contributors ?? []}
          />
        )}
      </GridItem>
      <GridItem colSpan={3} textAlign="right">
        <Text>FUX</Text>
      </GridItem>
      <GridItem colSpan={3} textAlign="right">
        <Text>vFUX</Text>
      </GridItem>
      {contributors.map((cont) => (
        <>
          <GridItem colSpan={6}>
            <Flex align={"center"}>
              <User
                address={cont.contributor.id as `0x${string}`}
                direction="horizontal"
                displayAvatar={true}
              />
              {workstream.coordinator?.id.toLowerCase() ===
              cont.contributor.id.toLowerCase() ? (
                <Tooltip label="Coordinator">
                  <StarIcon ml={"1em"} />
                </Tooltip>
              ) : undefined}
            </Flex>
          </GridItem>
          <GridItem colSpan={3}>
            <Stat
              size={["sm", null, "sm"]}
              pt={4}
              textAlign="right"
              fontFamily="mono"
            >
              <StatNumber>{`${cont.commitment || 0}%`}</StatNumber>
            </Stat>
          </GridItem>
          <GridItem colSpan={3}>
            <Stat
              size={["sm", null, "sm"]}
              pt={4}
              textAlign="right"
              fontFamily="mono"
            >
              <StatNumber>{`${
                relative[cont.contributor.id] || 0
              }`}</StatNumber>
            </Stat>
          </GridItem>
        </>
      ))}
    </Grid>
  );
};
