import ConnectWallet from "../ConnectWallet";
import WithSubnavigation from "../HambergerMenu";
import WorkstreamModal from "../WorkstreamModal";
import { HamburgerIcon, ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Link,
  Text,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  CloseButton,
  useDisclosure,
  Button,
  Collapse,
} from "@chakra-ui/react";
import NextLink from "next/link";

const Header: React.FC<{}> = () => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return <WithSubnavigation />;
};

export default Header;
