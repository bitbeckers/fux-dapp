import { WorkstreamContributor } from "../../__generated__/gql/graphql";
import FuxOverview from "../../components/FuxOverview";
import WorkstreamCard from "../../components/WorkstreamCard";
import { useGraphClient } from "../../hooks/useGraphClient";
import {
  VStack,
  Text,
  Heading,
  Flex,
  Accordion,
  Spacer,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useRouter } from "next/router";

const Profile: NextPage = () => {
  const router = useRouter();
  const { userByAddress, workstreamByContributor } = useGraphClient();

  const { account } = router.query;

  const {
    isLoading: accountLoading,
    data: accountData,
    error,
  } = useQuery({
    queryKey: ["account", account],
    queryFn: () => userByAddress((account as string).toLowerCase()),
    refetchInterval: 5000,
  });

  const {
    isLoading: workstreamsLoading,
    data: workstreamData,
    error: workstreamsError,
  } = useQuery({
    queryKey: ["workstreams", (account as string)?.toLowerCase()],
    queryFn: () =>
      workstreamByContributor((account as string)?.toLowerCase() || ""),
    refetchInterval: 10000,
  });

  const _user = accountData?.user;

  const workstreams =
    workstreamData?.workstreamContributors as Partial<WorkstreamContributor>[];

  if (accountLoading)
    return (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="white.500"
          size="xl"
        />
      </Center>
    );

  return _user ? (
    <>
      <VStack w={"100%"}>
        <FuxOverview address={_user.id as `0x${string}`} />
        <Flex direction={"column"} mx="auto" maxW="800px" p={[6, null, 12]}>
          <Heading py={12}>Workstream History</Heading>

          {workstreamsLoading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="white.500"
              size="xl"
            />
          ) : (
            <>
              {workstreams && workstreams.length > 0 ? (
                <Accordion w={"100%"} allowToggle={true}>
                  {workstreams.map((workstream, index) => (
                    <WorkstreamCard workstream={workstream} key={index} />
                  ))}
                </Accordion>
              ) : (
                <Heading size="md" justifyContent={"center"}>
                  No closed workstreams. Start committing!
                </Heading>
              )}
            </>
          )}
          <Spacer />
        </Flex>
      </VStack>
    </>
  ) : (
    <Text>{`No user found for account: ${account}`}</Text>
  );
};

export default Profile;
