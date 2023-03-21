import { Workstream } from "../../../.graphclient";
import User from "../User";
import { StarIcon } from "@chakra-ui/icons";
import { Stat, StatNumber, Grid, GridItem, Text } from "@chakra-ui/react";

export const ContributorOverview: React.FC<{
  workstream: Partial<Workstream>;
}> = ({ workstream }) => {
  const contributors = workstream?.contributors;

  if (!contributors) {
    return null;
  }

  return (
    <Grid gap={2} templateColumns="repeat(10, 1fr)">
      <GridItem colSpan={5}>
        <Text>User</Text>
      </GridItem>
      <GridItem colSpan={2}>
        <Text>Committed</Text>
      </GridItem>
      <GridItem colSpan={2}>
        <Text>vFUX</Text>
      </GridItem>
      <GridItem colSpan={1}>
        <Text>Coordinator</Text>
      </GridItem>
      {contributors.map((cont) => (
        <>
          <GridItem colSpan={5}>
            <User
              address={cont.contributor.id as `0x${string}`}
              direction="horizontal"
              displayAvatar={true}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <Stat>
              <StatNumber>{`${cont.commitment || 0}%`}</StatNumber>
            </Stat>
          </GridItem>
          <GridItem colSpan={2}>
            <Stat>
              <StatNumber>--%</StatNumber>
            </Stat>
          </GridItem>
          <GridItem colSpan={1}>
            {workstream.coordinator?.id.toLowerCase() ===
            cont.contributor.id.toLowerCase() ? (
              <StarIcon mr={"1em"} />
            ) : undefined}
          </GridItem>
        </>
      ))}
    </Grid>
  );
};
