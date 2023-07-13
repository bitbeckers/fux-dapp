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
  Center,
  StackDivider,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import NextLink from "next/link";
import { relative } from "path";
import { useAccount, useContractRead } from "wagmi";

// Create Test Commit For Collaborative WorkFlow

const backgroundPng = "/images/FUX.png";
const gradientDark = "#1B131C";
const gradientLight = "#B956BF";

const btnPurple = "#8E4EC6";

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
      bgGradient={`linear-gradient(180deg, ${gradientDark} 25%, ${gradientLight} 45%, ${gradientLight} 65%, ${gradientDark} 85%)`}
    >
      <Flex
        className="Section1"
        w={{ base: "100%", "2xl": "1440px" }}
        paddingInline={{ base: "20px", lg: "40px", "2xl": "0px" }}
        gap={{ base: "0%", lg: "5%" }}
        position="relative"
        zIndex={1}
      >
        <Flex
          direction="column"
          w={{ base: "100%", sm: "100%", md: "80%", lg: "40%" }}
          paddingBlock="15%"
          paddingBottom={{ base: "20%", lg: "15%" }}
        >
          <Text fontSize={["2xl", null, "3xl"]} fontWeight="900">
            How many FUX do you give?
          </Text>
          <Text pt={10} fontSize={["lg", null, "xl"]} my={3}>
            Gain perspective on how to allocate your most valuable asset: your
            attention.
          </Text>
          <Text fontSize={["lg", null, "xl"]} my={3}>
            Your FUX allocation equals how much time you can dedicate to the
            project.
          </Text>
          <Spacer pt={10} />
          {isConnecting ? (
            <Spinner size="md" />
          ) : address ? (
            data?.user?.fuxer ? (
              workstreamLink
            ) : (
              claimLink
            )
          ) : (
            <ConnectWallet />
          )}
        </Flex>
        <Flex
          display={{ base: "none", lg: "flex" }}
          direction={"column"}
          w={"60%"}
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
          gap={{ base: 5, lg: 20 }}
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
              <Text
                textAlign="center"
                maxW={{ base: "75%", sm: "50%", md: "65%", lg: "65%" }}
                pt={5}
              >
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
        flexDirection={{ base: "column", lg: "row" }}
        paddingTop={{ base: "0px", lg: "100px" }}
      >
        <Flex
          w={{ base: "100%", lg: "50%", "2xl": "40%" }}
          flexDirection={"column"}
          justifyContent={"space-between"}
          gap={5}
          order={{ base: 2, lg: 1 }}
        >
          {futureData.map((box, index) => (
            <Box
              borderRadius={8}
              border={"1px"}
              borderColor={"white"}
              key={index}
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              justifyContent="flex-start"
              padding={5}
            >
              <Image src={box.imageSrc} />
              <Text
                maxW={{
                  base: "100%",
                  md: "50%",
                  lg: index === 0 ? "60%" : "90%",
                }}
                pt={5}
              >
                {box.text}
              </Text>
            </Box>
          ))}
        </Flex>
        <Flex
          w={{ base: "100%", lg: "40%", "2xl": "30%" }}
          flexDirection={"column"}
          justifyContent={"center"}
          order={{ base: 1, lg: 2 }}
        >
          <Text fontSize={["5xl", null, "7xl"]} fontWeight="300">
            Your future
          </Text>
          <Flex>
            <Text fontSize={["5xl", null, "7xl"]} fontWeight="300">
              with v
            </Text>
            <Text fontSize={["5xl", null, "7xl"]} fontWeight="500">
              FUX
            </Text>
          </Flex>

          <Text
            fontStyle={"italic"}
            paddingTop={10}
            paddingBottom={{ base: "60px", lg: 0 }}
          >
            vFUX: (noun) A measure of one’s value as determined by the other
            members of your workstream in the evaluation stage.
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
        paddingBlock={"150px"}
        position={"relative"}
      >
        <Text
          fontSize={["5xl", null, "6xl"]}
          fontWeight="300"
          textAlign={"center"}
          paddingBottom={"50px"}
          width={{ base: "80%", lg: "40%" }}
        >
          Ready to give some FUX?
        </Text>
        <Flex zIndex={1}>
          <ConnectWallet />
        </Flex>
        <Image
          src={backgroundPng}
          alt="Background Image"
          objectFit="cover"
          opacity="0.1"
          position="absolute"
          bottom="10%"
          left="50%"
          width="80%"
          height="auto"
          transform="translateX(-50%)"
          zIndex={0}
        />
      </Flex>
      <Flex
        className="FOOTER COMPONENT HERE"
        w={{ base: "100%", "2xl": "1440px" }}
        paddingInline={{ base: "20px", lg: "40px", "2xl": "0px" }}
        flexDirection={"column"}
        width={"100%"}
        alignItems={"center"}
      >
        <Box width={"100%"} height={"1px"} bgColor={btnPurple}></Box>
        <Flex
          width={"100%"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Link
            href="/"
            _hover={{
              textDecoration: "none",
            }}
          >
            <Box paddingBlock={5}>
              <Text
                color={"white"}
                fontSize={useBreakpointValue({ base: "4xl", md: "5xl" })}
                fontWeight="900"
              >
                FUX
              </Text>
            </Box>
          </Link>

          <Flex alignItems={"center"} color={btnPurple}>
            <Link
              href="/workstreams"
              _hover={{
                textDecoration: "none",
              }}
            >
              <Box paddingInline={5} paddingBlock={5}>
                <Text color={"#FFFFFF"}>WORKSTREAMS</Text>
              </Box>
            </Link>
            |
            <Link
              href="/history"
              _hover={{
                textDecoration: "none",
              }}
            >
              <Box paddingInline={5} paddingBlock={5}>
                <Text color={"#FFFFFF"}>HISTORY</Text>
              </Box>
            </Link>
            |
            <Link
              href="https://fux-docs.vercel.app/#what-is-fux"
              _hover={{
                textDecoration: "none",
              }}
            >
              <Box paddingInline={5} paddingBlock={5}>
                <Text color={"#FFFFFF"}>ABOUT</Text>
              </Box>
            </Link>{" "}
            |
            <Link
              href="https://fux-docs.vercel.app/"
              _hover={{
                textDecoration: "none",
              }}
            >
              <Box paddingInline={5} paddingBlock={5}>
                <Text color={"#FFFFFF"}>DOCS</Text>
              </Box>
            </Link>
          </Flex>
          <Flex gap={5}>
            <Link href="https://twitter.com/bitbeckers">
              <Box paddingBlock={5}>
                <Image src="/images/twitter.svg" />
              </Box>
            </Link>
            <Link href="https://github.com/bitbeckers/fux-dapp">
              <Box paddingBlock={5}>
                <Image src="/images/discord.svg" />
              </Box>
            </Link>
          </Flex>
        </Flex>
      </Flex>
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
const futureData = [
  {
    imageSrc: "/images/Feedback.svg",
    text: "Receive feedback from fellow workstream participants",
  },
  {
    imageSrc: "/images/Dimond.svg",
    text: "Assign value based on vFUX evaluations if a workstream is funded",
  },
  {
    imageSrc: "/images/Collective.svg",
    text: "Distribute funds across workstream participants based on vFUX ratings",
  },
];

export default Home;
