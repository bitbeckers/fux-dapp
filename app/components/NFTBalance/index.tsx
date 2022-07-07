import { useNFTs, useToken } from "../../hooks/contract";
import { Text, Heading, Card, VStack } from "@raidguild/design-system";
import { ethers } from "ethers";

const NFTBalance: React.FC = () => {
  const { balance } = useNFTs();

  return (
    <Card
      minW={"300"}
      boxSize={"xs"}
      heading={
        <Heading w={"100%"} variant="noShadow" textAlign={"center"}>
          NFT Balance
        </Heading>
      }
      variant="withHeader"
      bg="whiteAlpha.200"
    >
      <Text size="lg">{`${balance} NFTs `}</Text>
    </Card>
  );
};

export default NFTBalance;
