import {
  Flex,
  Stack,
  Text,
  Heading,
  Card,
  RoleBadge,
} from "@raidguild/design-system";
import type { NextPage } from "next";

import { RoleCards } from "../components/RoleCards";

const Wizard: NextPage = () => {
  return (
    <>
      <Flex direction="column" justify="space-between" h="80vh" w="100%">
        <Stack align="center" spacing="5vh">
          <Heading size="3xl">Wizard</Heading>

        </Stack>
      </Flex>
    </>
  );
};

export default Wizard;
