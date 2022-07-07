import {
  Flex,
  Stack,
  Text,
  Heading,
  Card,
  RoleBadge,
  Link,
} from "@raidguild/design-system";
import type { NextPage } from "next";
import NextLink from "next/link";
import { RoleCards } from "../components/RoleCards";

const Archer: NextPage = () => {
  return (
    <>
      <Flex direction="column" justify="space-between" h="80vh" w="100%">
        <Stack align="center" spacing="5vh">
          <Heading size="3xl">Archer</Heading>
          <NextLink
            href={"https://github.com/raid-guild/design-system"}
            passHref
          >
            <Link>
              <Card
                heading={
                  <Heading w={"100%"} variant="noShadow">
                    Raid Guild Design System
                  </Heading>
                }
                variant="withHeader"
                bg="whiteAlpha.200"
              >
                <Text>
                  A custom build Chakra UI library accompanied with a Storybook
                </Text>
              </Card>
            </Link>
          </NextLink>
        </Stack>
      </Flex>
    </>
  );
};

export default Archer;
