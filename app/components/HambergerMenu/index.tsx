import ConnectWallet from "../ConnectWallet";
import WorkstreamModal from "../WorkstreamModal";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ArrowBackIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { MouseEventHandler } from "react";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box w={"100%"}>
      <Flex
        bg={"#221527"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"white"}
        align={"center"}
      >
        <Flex
          flex={{ base: 1 }}
          justifyContent={{ base: "space-between", md: "space-around" }}
          align={{ base: "center", md: "center" }}
          className="ACTIVE"
        >
          <Flex align={{ base: "center", md: "center" }}>
            <Link href="/">
              <Text
                textAlign={useBreakpointValue({ base: "center", md: "left" })}
                fontFamily={"heading"}
                color={"white"}
                fontSize={useBreakpointValue({ base: "4xl", md: "5xl" })}
                fontWeight="900"
              >
                FUX
              </Text>
            </Link>
            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              <WorkstreamModal onCloseAction={() => {}} />
            </Flex>
          </Flex>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
          <Flex gap={5}>
            <ConnectWallet />
            <Flex
              flex={{ base: 1, md: "auto" }}
              ml={{ base: -3 }}
              display={{ base: "flex", md: "none" }}
            >
              <IconButton
                onClick={onToggle}
                icon={
                  isOpen ? (
                    <CloseIcon w={3} h={3} />
                  ) : (
                    <HamburgerIcon w={5} h={5} />
                  )
                }
                variant={"ghost"}
                aria-label={"Toggle Navigation"}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav onToggle={onToggle} />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontWeight={300}
                fontSize={16}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={300}
            fontSize={16}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

interface MobileNav {
  onToggle: MouseEventHandler;
}

const MobileNav = ({ onToggle }: MobileNav) => {
  return (
    <Stack bg="#221527" p={0} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <Box py={5} onClick={onToggle} w={"100%"} align="center">
        <WorkstreamModal onCloseAction={() => {}} />
      </Box>
      <Box onClick={onToggle} w={"100%"} align="center">
        <Flex
          py={5}
          as={Link}
          justify={"center"}
          alignContent={"center"}
          _hover={{
            textDecoration: "none",
          }}
          width={"100%"}
        >
          <Icon
            as={ArrowBackIcon}
            transition={"all .25s ease-in-out"}
            w={6}
            h={6}
          />
        </Flex>
      </Box>
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={6} onClick={children && onToggle} align={"center"}>
      <Flex
        py={5}
        as={Link}
        href={href ?? "#"}
        justify={"center"}
        alignContent={"center"}
        _hover={{
          textDecoration: "none",
        }}
        width={"100%"}
      >
        <Text
          fontWeight={300}
          fontSize={16}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "WORKSTREAMS",
    href: "/workstreams",
  },
  {
    label: "HISTORY",
    href: "/history",
  },
];
