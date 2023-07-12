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
  Grid,
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
      direction={"column"}
      w={"100%"}
      className="Active"
      alignItems={"center"}
    >
      <Flex
        className="Section1"
        w={{ base: "100%", "2xl": "1440px" }}
        paddingInline={{ base: "20px", lg: "40px", "2xl": "0px" }}
        gap={{ base: "0%", lg: "5%" }}
        position="relative"
      >
        <Flex
          direction="column"
          minW="30%"
          paddingBlock="15%"
          paddingBottom={{ base: "20%", lg: "15%" }}
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
          minW={"65%"}
          fontSize={useBreakpointValue({ base: "4xl", md: "5xl" })}
          style={{
            backgroundImage: `url(${backgroundPng})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            backgroundPosition: "bottom",
            opacity: "10%",
          }}
        ></Flex>
        <Image
          display={{ base: "flex", lg: "none" }}
          src={backgroundPng}
          alt="Background Image"
          objectFit="cover"
          opacity="0.1"
          position="absolute"
          bottom="0"
          left="50%"
          width="80%"
          height="auto"
          transform="translateX(-50%)"
        />
      </Flex>
      <Flex className="Carousel" height={"300px"}>
        hey joshua from abhi
      </Flex>
      <Flex
        className="Secton2"
        w={{ base: "100%", "2xl": "1440px" }}
        paddingInline={{ base: "20px", lg: "40px", "2xl": "0px" }}
        justifyContent={"space-between"}
        height={"300px"}
      >
        <Flex w="40%">IMAGE HERE IMAGE HERE IMAGE HERE</Flex>
        <Flex w="40%">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
          illo. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Distinctio, laboriosam temporibus? Ullam veritatis earum, minima
          aliquam, adipisci, itaque illum rerum nulla harum accusantium fugit
          placeat explicabo nisi numquam porro a!
        </Flex>
      </Flex>
      <Flex
        className="Section3"
        w={{ base: "100%", "2xl": "1440px" }}
        paddingInline={{ base: "20px", lg: "40px", "2xl": "0px" }}
        flexDirection="column"
        justifyContent="center"
        paddingBlock={20}
      >
        <Flex w="100%" justifyContent="center">
          <Text fontSize={["2xl", null, "3xl"]} fontWeight="500">
            Why should you give a FUX?
          </Text>
        </Flex>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={20}
          pt={40}
        >
          {boxData.map((box, index) => (
            <Box
              key={index}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Image src={box.imageSrc} />
              <Text textAlign="center" maxW="65%" pt={5}>
                {box.text}
              </Text>
            </Box>
          ))}
        </Grid>
      </Flex>
      <Flex
        className="Secton4"
        w={{ base: "100%", "2xl": "1440px" }}
        paddingInline={{ base: "20px", lg: "40px", "2xl": "0px" }}
        justifyContent={"space-between"}
        height={"300px"}
      >
        <Flex w="40%" flexDirection={"column"} justifyContent={"space-between"}>
          <Text>Box 1 HERE</Text>
          <Text>Box 2 HERE</Text>
          <Text>Box 3 HERE</Text>
        </Flex>
        <Flex w="40%" flexDirection={"column"} justifyContent={"center"}>
          <Text fontSize={["2xl", null, "3xl"]} fontWeight="900">
            Your future with vFUX
          </Text>

          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
            illo. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Distinctio, laboriosam temporibus? Ullam veritatis earum, minima
            aliquam, adipisci, itaque illum rerum nulla harum accusantium fugit
            placeat explicabo nisi numquam porro a!
          </Text>
        </Flex>
      </Flex>
      <Flex
        className="Secton4"
        w={{ base: "100%", "2xl": "1440px" }}
        paddingInline={{ base: "20px", lg: "40px", "2xl": "0px" }}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"300px"}
      >
        <Text fontSize={["2xl", null, "3xl"]} fontWeight="900">
          Ready to give some FUX
        </Text>
        <ConnectWallet />
      </Flex>
      <Flex className="FOOTER COMPONENT HERE">FOOTER COMPONENT HERE</Flex>
    </Flex>
  );
};

const boxData = [
  {
    imageSrc: "/images/Icon_1.svg",
    text: "Avoid burnout due to overcommitting",
  },
  {
    imageSrc: "/images/Icon_2.svg",
    text: "Easily calculate your capacity for new projects",
  },
  {
    imageSrc: "/images/Icon_3.svg",
    text: "Enhance your time management skills with one place to view all your projects and commitments",
  },
  {
    imageSrc: "/images/Icon_4.svg",
    text: "Provides projects coordinators a peace of mind to know who is committed",
  },
  {
    imageSrc: "/images/Icon_5.svg",
    text: "Helps you manage and identify over commitments across all your projects",
  },
  {
    imageSrc: "/images/Icon_6.svg",
    text: "Learn how teammates value your contributions to help your continual skill growth",
  },
];

export default Home;
