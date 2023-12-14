import ConnectWallet from "../components/ConnectWallet";
import { useGraphClient } from "../hooks/useGraphClient";
import { contractAddresses, contractABI } from "../utils/constants";
import {
  Box,
  Button,
  Flex,
  Text,
  Link,
  Spinner,
  Spacer,
  useBreakpointValue,
  Grid,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import NextLink from "next/link";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAccount, useContractRead } from "wagmi";

const backgroundPng = "/images/FUX.png";
const gradientDark = "#1B131C";
const gradientLight = "#B956BF";
const btnPurple = "#8E4EC6";

const Home: NextPage = () => {
  const { address, isConnecting } = useAccount();
  const { userByAddress } = useGraphClient();

  const { data, error } = useQuery({
    queryKey: ["user", address?.toLowerCase()],
    queryFn: () => userByAddress(address?.toLowerCase() || ""),
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

  const claimLink = (
    <Flex direction="column" gap={2}>
      <Text fontWeight="500">Get started.</Text>
      <NextLink href="/start" passHref>
        <Button p="1em" maxW="xs">
          <Link>Enter</Link>
        </Button>
      </NextLink>
    </Flex>
  );

  const workstreamLink = (
    <Flex direction="column" gap={2}>
      <Text fontWeight="500">View your workstreams.</Text>
      <NextLink href="/workstreams" passHref>
        <Button p="1em" maxW="xs">
          <Link>Workstreams</Link>
        </Button>
      </NextLink>
    </Flex>
  );

  return (
    <Flex
      direction="column"
      w="100%"
      className="Active"
      alignItems="center"
      bgGradient={{
        base: `linear-gradient(180deg, ${gradientDark} 10%, ${gradientLight} 30%, ${gradientLight} 65%, ${gradientDark} 85%)`,
        lg: `linear-gradient(180deg, ${gradientDark} 25%, ${gradientLight} 45%, ${gradientLight} 65%, ${gradientDark} 85%)`,
      }}
    >
      {/* INTRO SECTION */}
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
          <Text fontSize={["3xl", null, "4xl"]} fontWeight="900">
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
            <Flex zIndex={1}>
              <ConnectWallet />
            </Flex>
          )}
        </Flex>
        <Flex
          display={{ base: "none", lg: "flex" }}
          direction="column"
          w="60%"
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

      {/* CAROUSEL SECTION */}
      <Flex
        width="100%"
        flexDirection="column"
        paddingBottom={{ base: 100, lg: 200 }}
      >
        <Flex width="100%">
          <Swiper
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            pagination={{
              clickable: true,
            }}
            cssMode={true}
            navigation={useBreakpointValue({ base: false, md: true })}
            mousewheel={true}
            slidesPerView={1.3}
            spaceBetween={useBreakpointValue({ base: 15, md: 40 })}
            centeredSlides={true}
            keyboard={true}
          >
            {swiperContent.map((slide, index, alt) => (
              <SwiperSlide key={index}>
                <Flex
                  flexDirection="column"
                  height="100%"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Flex
                    width="100%"
                    justifyContent="center"
                    fontSize={{
                      base: "small",
                      md: "lg",
                      "2xl": "xl",
                    }}
                    maxW={{ base: "100%", sm: "80%" }}
                    fontWeight={300}
                    pb={10}
                    paddingInline={7}
                    textAlign="center"
                    flexDirection={{ base: "column", sm: "row" }}
                  >
                    <Text
                      fontWeight={900}
                      paddingRight={{ base: 0, sm: 5 }}
                      paddingBottom={{ base: 5, sm: 0 }}
                    >
                      {slide.number}
                    </Text>
                    <Text>{slide.text}</Text>
                  </Flex>
                  <Image
                    src={slide.imageSrc}
                    objectFit="cover"
                    alt={slide.alt}
                  />
                </Flex>
              </SwiperSlide>
            ))}
          </Swiper>
        </Flex>
      </Flex>

      {/* THE FUX FLYWHEEL */}
      <Flex
        w={{ base: "100%", "2xl": "1440px" }}
        paddingInline={{ base: "20px", lg: "40px", "2xl": "0px" }}
        justifyContent="space-between"
        flexDirection={{ base: "column-reverse", lg: "row" }}
      >
        <Flex w={{ base: "100%", md: "80%", lg: "50%" }} alignSelf="center">
          <Image
            src="/images/FuxFlyWheel.png"
            alt="Flywheel image"
            objectFit="cover"
          />
        </Flex>
        <Flex
          w={{ base: "100%", lg: "40%" }}
          alignItems="flex-start"
          display="flex"
          gap={10}
          flexDirection="column"
          justifyContent="center"
          paddingBottom={{ base: "10", md: "20", lg: "0" }}
        >
          <Text fontSize={["3xl", null, "4xl"]} fontWeight="900">
            The FUX flywheel
          </Text>
          <OrderedList
            display="flex"
            gap={10}
            flexDirection="column"
            fontSize={["lg", null, "xl"]}
          >
            <ListItem>CREATE Workstream(s) and invite contributors.</ListItem>
            <ListItem>
              GIVE FUX: Contributors stake their attention into workstreams.
            </ListItem>
            <ListItem>
              GET vFUX: Peer to Peer evaluations of perceived value created.
            </ListItem>
            <ListItem>
              GROW your skills by learning from your evaluations and contribute
              to new workstreams.
            </ListItem>
            <ListItem listStyleType="none">... Repeat</ListItem>
          </OrderedList>
        </Flex>
      </Flex>

      {/* WHY SHOULD YOU GIVE A FUX */}
      <Flex
        w={{ base: "100%", "2xl": "1440px" }}
        paddingInline={{ base: "20px", lg: "40px", "2xl": "0px" }}
        flexDirection="column"
        justifyContent="center"
        paddingBlock={20}
      >
        <Flex w="100%" justifyContent="center">
          <Text fontSize={["3xl", null, "4xl"]} fontWeight="500">
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
          pt={{ base: 20, md: 20, lg: 40 }}
        >
          {boxData.map((box, index, alt) => (
            <Box
              key={index}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Image src={box.imageSrc} alt={box.alt} />
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

      {/* FUTURE WITH VFUX */}
      <Flex
        w={{ base: "100%", "2xl": "1440px" }}
        paddingInline={{ base: "20px", lg: "40px", "2xl": "0px" }}
        justifyContent="space-between"
        flexDirection={{ base: "column", lg: "row" }}
        paddingTop={{ base: "0px", lg: "100px" }}
      >
        <Flex
          w={{ base: "100%", lg: "50%", "2xl": "40%" }}
          flexDirection="column"
          justifyContent="space-between"
          gap={5}
          order={{ base: 2, lg: 1 }}
        >
          {futureData.map((box, index, alt) => (
            <Box
              borderRadius={8}
              border="1px"
              borderColor="white"
              key={index}
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              justifyContent="flex-start"
              padding={5}
            >
              <Image src={box.imageSrc} alt={box.alt} />
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
          flexDirection="column"
          justifyContent="center"
          order={{ base: 1, lg: 2 }}
        >
          <Text fontSize={["3xl", null, "4xl"]} fontWeight="300">
            Your future
          </Text>
          <Flex>
            <Text fontSize={["3xl", null, "4xl"]} fontWeight="300">
              with v
            </Text>
            <Text fontSize={["3xl", null, "4xl"]} fontWeight="500">
              FUX
            </Text>
          </Flex>
          <Text
            fontStyle="italic"
            paddingTop={10}
            paddingBottom={{ base: "60px", lg: 0 }}
          >
            vFUX: (noun) A measure of one’s value as determined by the other
            members of your workstream in the evaluation stage.
          </Text>
        </Flex>
      </Flex>

      {/* CLOSING SECTION */}
      <Flex
        w={{ base: "100%", "2xl": "1440px" }}
        paddingInline={{ base: "20px", lg: "40px", "2xl": "0px" }}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        paddingBlock="150px"
        position="relative"
      >
        <Text
          fontSize={["5xl", null, "6xl"]}
          fontWeight="300"
          textAlign="center"
          paddingBottom="50px"
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

      {/* FOOTER */}
      <Flex
        w={{ base: "100%", "2xl": "1440px" }}
        paddingInline={{ base: "20px", lg: "40px", "2xl": "0px" }}
        flexDirection="column"
        width="100%"
        alignItems="center"
      >
        <Box width="100%" height="1px" bgColor={btnPurple}></Box>
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          alignItems={{ base: "flex-start", sm: "center" }}
          width="100%"
          justifyContent="space-between"
        >
          <Link href="/" _hover={{ textDecoration: "none" }}>
            <Box paddingBlock={5}>
              <Text
                color="white"
                fontSize={useBreakpointValue({ base: "4xl", md: "5xl" })}
                fontWeight="900"
              >
                FUX
              </Text>
            </Box>
          </Link>

          <Flex
            alignItems={{ base: "flex-start", sm: "center" }}
            color={btnPurple}
            flexDirection={{ base: "column", sm: "row" }}
          >
            <NavLink href="/workstreams">WORKSTREAMS</NavLink>
            <Box display={{ base: "none", sm: "flex" }}>|</Box>
            <NavLink href="/history">HISTORY</NavLink>
            <Box display={{ base: "none", sm: "flex" }}>|</Box>
            <NavLink href="https://fux-docs.vercel.app/#what-is-fux">
              ABOUT
            </NavLink>
            <Box display={{ base: "none", sm: "flex" }}>|</Box>
            <NavLink href="https://fux-docs.vercel.app/">DOCS</NavLink>
          </Flex>

          <Flex gap={5}>
            <SocialLink
              href="https://twitter.com/bitbeckers"
              icon="/images/twitter.svg"
              alt="twitter"
            />
            <SocialLink
              href="https://github.com/bitbeckers/fux-dapp"
              icon="/images/discord.svg"
              alt="discord"
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <Link href={href} _hover={{ textDecoration: "none" }}>
    <Box
      paddingInline={{ base: "0", sm: "5" }}
      paddingBlock={{ base: "2", sm: "5" }}
    >
      <Text color="#FFFFFF">{children}</Text>
    </Box>
  </Link>
);

interface SocialLinkProps {
  href: string;
  icon: string;
  alt: string;
}

const SocialLink = ({ href, icon, alt }: SocialLinkProps) => (
  <Link href={href}>
    <Box paddingBlock={5}>
      <Image src={icon} alt={alt} />
    </Box>
  </Link>
);
const boxData = [
  {
    imageSrc: "/images/Icon_1.svg",
    text: "Avoid burnout due to overcommitting",
    alt: "Burn out icon",
  },
  {
    imageSrc: "/images/Icon_2.svg",
    text: "Easily calculate your capacity for new projects",
    alt: "Capacity icon",
  },
  {
    imageSrc: "/images/Icon_3.svg",
    text: "Enhance your time management skills with one place to view all your projects and commitments",
    alt: "Time Icon",
  },
  {
    imageSrc: "/images/Icon_4.svg",
    text: "Provides projects coordinators a peace of mind to know who is committed",
    alt: "coordinate icon",
  },
  {
    imageSrc: "/images/Icon_5.svg",
    text: "Helps you manage and identify over commitments across all your projects",
    alt: "identify commitments icon",
  },
  {
    imageSrc: "/images/Icon_6.svg",
    text: "Learn how teammates value your contributions to help your continual skill growth",
    alt: "contribution icon",
  },
];
const futureData = [
  {
    imageSrc: "/images/Feedback.svg",
    text: "Receive feedback from fellow workstream participants",
    alt: "feedback icon",
  },
  {
    imageSrc: "/images/Dimond.svg",
    text: "Assign value based on vFUX evaluations if a workstream is funded",
    alt: "diamond icon",
  },
  {
    imageSrc: "/images/Collective.svg",
    text: "Distribute funds across workstream participants based on vFUX ratings",
    alt: "collective icon",
  },
];

const swiperContent = [
  {
    number: "1",
    text: "Connect your wallet and claim your FUX",
    imageSrc: "/images/Display1.png",
    alt: "Guide image 1",
  },
  {
    number: "2",
    text: "Allocate your FUX to workstreams",
    imageSrc: "/images/Display2.png",
    alt: "Guide image 1",
  },
  {
    number: "3",
    text: "Get vFUX and evaluate your fellow workstream participants",
    imageSrc: "/images/Display3.png",
    alt: "Guide image 5",
  },
  {
    number: "4",
    text: "Improve your skills and grow with FUX",
    imageSrc: "/images/Display4.png",
    alt: "Guide image 4",
  },
  {
    number: "5",
    text: "Evaluate completed workstreams and distribute vFUX across contributors",
    imageSrc: "/images/Display5.png",
    alt: "Guide image 5",
  },
];

export default Home;
