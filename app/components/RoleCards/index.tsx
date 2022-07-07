import ConnectWallet from "../ConnectWallet";
import { RoleCard } from "../RoleCard";
import {
  Stack,
  Heading,
  HStack,
  Link,
  Spacer,
  Card,
  RoleBadge,
  Text,
} from "@raidguild/design-system";
import NextLink from "next/link";

const RoleCards: React.FC<{}> = () => {
  const cards = [
    {
      title: "Archer",
      roleName: "archer",
      content: "UX/UI",
      target: "/archer",
    },
    {
      title: "Wizard",
      roleName: "wizard",
      content: "Smart contract development",
      target: "/wizard",
    },
    {
      title: "Warrior",
      roleName: "warrior",
      content: "Front-end development",
      target: "/warrior",
    },
  ];
  return (
    <Stack
      direction={["column", "column", "row"]}
      as="nav"
      w="80%"
      justify="space-around"
      align="center"
      spacing={"3em"}
    >
      {cards.map((card, index) => (
        <RoleCard {...card} key={index} />
      ))}
    </Stack>
  );
};

export { RoleCards };
