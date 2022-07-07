import {
  Flex,
  Stack,
  Text,
  Heading,
  Card,
  RoleBadge,
  Divider,
} from "@raidguild/design-system";
import type { NextPage } from "next";
import { JourneyCards } from "../components/JourneyCards";
import { RoleCards } from "../components/RoleCards";

const Home: NextPage = () => {
  return (
    <>
      <Flex direction="column" justify="space-between" h="80vh" w="100%">
        <Stack align="center" spacing="5vh">
          <Heading size="3xl">Raid Guild App Starter</Heading>
          <RoleCards />
          <Divider w="80%" />
          <JourneyCards />
        </Stack>
      </Flex>
    </>
  );
};

export default Home;
