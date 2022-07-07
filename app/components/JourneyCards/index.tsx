import ConnectWallet from "../ConnectWallet";
import { JourneyCard } from "../JourneyCard";
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

const JourneyCards: React.FC<{}> = () => {
  const cards = [
    { title: "ERC20", content: "Play with ERC20", target: "/erc20" },
    { title: "ERC721", content: "Play with NFT", target: "/erc721" },
    {
      title: "Staking",
      content: "Play with staking pools",
      target: "/staking",
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
        <JourneyCard {...card} key={index} />
      ))}
    </Stack>
  );
};

export { JourneyCards };
