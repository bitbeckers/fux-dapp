import { Stack, BuiltByRaidGuildComponent, Box, Link, RaidGuild } from "@raidguild/design-system";

const Footer: React.FC<{}> = () => {
  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      w="90%"
      maxW="1200px"
      py="12"
      px={{ base: "4", md: "8" }}
    >
      <Stack direction="row" spacing="4" align="center" justify="space-between">
        <Link href="https://raidguild.org" isExternal>
          <Stack>
            <RaidGuild width="200px" height="60px" />
          </Stack>
        </Link>

      </Stack>
    </Box>
  );
};

export { Footer };
