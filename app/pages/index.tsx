import ConnectWallet from "../components/ConnectWallet";
import { useGraphClient } from "../hooks/useGraphClient";
import { contractAddresses, contractABI } from "../utils/constants";
import {
  Box,
  Button,
  Flex,
  VStack,
  Text,
  Link,
  Spinner,
  Spacer,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import NextLink from "next/link";
import { useAccount, useContractRead } from "wagmi";

// Create Test Commit For Collaborative WorkFlow

const backgroundSvg = "/images/FUX.svg";
const backgroundPng = "/images/FUX.png";
const icon1 = "../icons/FUX.png";

const Home: NextPage = () => {
  const { address, isConnecting } = useAccount();
  const { sdk } = useGraphClient();

  const { data, error } = useQuery({
    queryKey: ["user", address?.toLowerCase()],
    queryFn: () => sdk.UserByAddress({ address: address?.toLowerCase() }),
    refetchInterval: 5000,
    enabled: !address,
  });

  // Method for demo purposes
  const { data: fuxBalance } = useContractRead({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "balanceOf",
    args: [address?.toLowerCase() || "", 1],
    enabled: !!address,
  });

  console.log("fuxBalance as BigNumber", fuxBalance);
  console.log("fuxBalance as string", fuxBalance?.toString());

  const claimLink = (
    <Flex direction={"column"} gap={2}>
      <Text fontWeight="500">Get started.</Text>
      <NextLink href="/start" passHref>
        <Button p={"1em"} maxW={"xs"}>
          <Link>Enter</Link>
        </Button>
      </NextLink>
    </Flex>
  );

  const workstreamLink = (
    <Flex direction={"column"} gap={2}>
      <Text fontWeight="500">View your workstreams.</Text>
      <NextLink href="/workstreams" passHref>
        <Button p={"1em"} maxW={"xs"}>
          <Link>Workstreams</Link>
        </Button>
      </NextLink>
    </Flex>
  );

  const connectWallet = (
    <Flex direction={"column"} gap={2}>
      <Text fontWeight="500">Let&apos;s get connected.</Text>
      <ConnectWallet />
    </Flex>
  );

  return (
    <Flex
      // direction={["column", null, "row"]}
      direction={"column"}
      w={{ base: "100%", "2xl": "1440px" }}
      paddingInline={{ base: "20px", lg: "40px" }}
      className="Active"
    >
      <Flex className="Secton1">
        <Flex
          direction={"column"}
          minW={"30%"}
          paddingBlock={"15%"}
          style={useBreakpointValue({
            base: {
              backgroundImage: `url(${backgroundPng})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "80%",
              backgroundPosition: "bottom",
              opacity: "80%",
            },
            lg: { backgroundImage: "none" },
          })}
        >
          <Text fontSize={["2xl", null, "3xl"]} fontWeight="900">
            How many FUX do you give?
          </Text>
          <Text fontSize={["lg", null, "xl"]} my={3}>
            Gain perspective on how to allocate your most valuable asset: your
            attention.
          </Text>
          <Text fontSize={["lg", null, "xl"]} my={3}>
            Your FUX allocation equals how much time you can dedicate to the
            project.
          </Text>
          <Spacer />
          {isConnecting ? (
            <Spinner size="md" />
          ) : address ? (
            data?.user?.fuxer ? (
              workstreamLink
            ) : (
              claimLink
            )
          ) : (
            connectWallet
          )}
        </Flex>
        <Flex
          display={{ base: "none", lg: "flex" }}
          direction={"column"}
          minW={"70%"}
          fontSize={useBreakpointValue({ base: "4xl", md: "5xl" })}
          style={{
            backgroundImage: `url(${backgroundPng})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            backgroundPosition: "bottom",
            opacity: "80%",
          }}
        ></Flex>
      </Flex>
      <Flex className="Carousel">hey joshua from abhi</Flex>
      <Flex className="Secton2"></Flex>
      <Flex className="Secton3"></Flex>
      <Flex className="Secton4"></Flex>
      <Flex className="Secton5"></Flex>
      <Box minW={"50%"} pl={[0, null, 12]} pt={[12, null, 0]}>
        <VStack gap={3} align="left">
          <Text textAlign="left" my={3} fontWeight="900">
            The FUX flywheel
          </Text>
          <Text>1. CREATE Workstream(s) and invite contributors</Text>
          <Text>
            2. GIVE FUX: Contributors stake their attention into workstreams.
          </Text>
          <Text>
            3. GET vFUX: Peer to Peer evaluations of perceived value created.
          </Text>
          <Text>
            <i>... Repeat</i>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Home;
