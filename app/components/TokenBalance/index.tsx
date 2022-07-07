import { useToken } from "../../hooks/contract";
import { Text, Heading, Card, VStack } from "@raidguild/design-system";
import { ethers } from "ethers";

const TokenBalance: React.FC = () => {
  const { balance } = useToken();

  return (
    <Card
      minW={"300"}
      boxSize={"xs"}
      heading={
        <Heading w={"100%"} variant="noShadow" textAlign={"center"}>
          Balance
        </Heading>
      }
      variant="withHeader"
      bg="whiteAlpha.200"
    >
      <Text size="lg">{`${ethers.utils.formatEther(balance)} in MRD`}</Text>
      <Text size="lg">{`${balance} in wei`}</Text>
    </Card>
  );
};

export default TokenBalance;
