import { useVFuxBalance } from "../hooks/fux";
import { useWorkstreams } from "../hooks/workstream";
import {
  VStack,
  Text,
  Divider,
  Link,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Heading,
  HStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import NextLink from "next/link";

const Fux: NextPage = () => {
  const workstreams = useWorkstreams();
  const vFux = useVFuxBalance();

  return (
    <VStack spacing={8} w={"100%"}>
      <Divider />

      <StatGroup textAlign="left">
        <Stat p={"1em"}>
          <StatLabel>Active workstreams</StatLabel>
          <StatNumber bg="#301A3A" pl={"5"} w="8em">{`${
            workstreams ? workstreams?.length.toString() : "..."
          }`}</StatNumber>
          <StatHelpText color="#BF7AF0">
            <NextLink href="/fux">
              <Link>View workstreams</Link>
            </NextLink>
          </StatHelpText>
        </Stat>
        <Stat p={"1em"}>
          <StatLabel>vFUX earned</StatLabel>
          <StatNumber bg="#301A3A" pl={"5"} w="8em">{`${
            vFux ? vFux?.toString() : "..."
          } vFUX`}</StatNumber>
        </Stat>
      </StatGroup>
      <VStack>
        <HStack>
          <Heading size="sm">Activity 1</Heading>
          <Text>Some workstream</Text>
          <Text fontWeight={400}>{`20 vFUX`}</Text>
        </HStack>
        <HStack>
          <Heading size="sm">Activity 2</Heading>
          <Text>Some workstream</Text>
          <Text fontWeight={400}>{`10 vFUX`}</Text>
        </HStack>
        <HStack>
          <Heading size="sm">Activity 3</Heading>
          <Text>Some workstream</Text>
          <Text fontWeight={400}>{`80 vFUX`}</Text>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Fux;
