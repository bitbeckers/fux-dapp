import ConnectWallet from "../ConnectWallet";
import WorkstreamModal from "../WorkstreamModal";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
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
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { MouseEventHandler } from "react";

const linkColor = "gray.200";
const linkHoverColor = "white";
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
  {
    label: "DOCS",
    href: "https://docs.fux.gg",
  },
];

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex w="100%" flexDirection="column">
      <Flex
        w="100%"
        bg="#221527"
        borderBottom={1}
        borderStyle="solid"
        borderColor="white"
        justifyContent="center"
      >
        <Flex
          h="80px"
          w={{ base: "100%", "2xl": "1440px" }}
          mx={{ "2xl": "auto" }}
          justifyContent={{ base: "space-between", md: "space-between" }}
          align={{ base: "center", lg: "center" }}
          marginInline={{ base: "20px", lg: "40px" }}
        >
          <Flex align={{ base: "center", lg: "center" }}>
            <Link
              href="/"
              _hover={{
                textDecoration: "none",
              }}
            >
              <Text
                color="white"
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
          <Flex display={{ base: "none", lg: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
          <Flex gap={5}>
            <ConnectWallet />
            <Flex
              flex={{ base: 1, lg: "auto" }}
              ml={{ base: -3 }}
              display={{ base: "flex", lg: "none" }}
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
                variant="ghost"
                aria-label="Toggle Navigation"
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav onToggle={onToggle} />
      </Collapse>
    </Flex>
  );
}

const DesktopNav = () => {
  return (
    <Stack direction="row" spacing={4}>
      {NAV_ITEMS.map((navItem) => (
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
          key={navItem.label}
        >
          <Box paddingBlock={5}>{navItem.label}</Box>
        </Link>
      ))}
    </Stack>
  );
};

interface MobileNavProps {
  onToggle: MouseEventHandler;
}

const MobileNav: React.FC<MobileNavProps> = ({ onToggle }) => {
  return (
    <Stack bg="#221527" px={0} display={{ lg: "none" }} pt={0}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <Flex
        onClick={onToggle}
        w="100%"
        display={{ base: "", md: "none" }}
        pt={5}
      >
        <Flex justify="center" className="ALTO">
          <WorkstreamModal onCloseAction={() => {}} />
        </Flex>
      </Flex>
      <Box onClick={onToggle} w="100%" py={5}>
        <Flex
          as={Link}
          justify="center"
          alignContent="center"
          _hover={{
            textDecoration: "none",
          }}
          width="100%"
        >
          <Icon
            as={ArrowBackIcon}
            transition="all .25s ease-in-out"
            w={6}
            h={6}
          />
        </Flex>
      </Box>
    </Stack>
  );
};

const MobileNavItem: React.FC<NavItem> = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack onClick={children && onToggle} align="center" pt={5}>
      <Flex
        as={Link}
        href={href ?? "#"}
        justify="center"
        alignContent="center"
        width="100%"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={300}
          fontSize={16}
          color={linkColor}
          _hover={{
            color: linkHoverColor,
          }}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition="all .25s ease-in-out"
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>
    </Stack>
  );
};
