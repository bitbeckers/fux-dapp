import { useStaking } from "../../hooks/contract";
import { Text, Heading, Card } from "@raidguild/design-system";
import { ethers } from "ethers";

const StakeOverview: React.FC = () => {
  const { stakedBalance, stakeRewards } = useStaking();

  return (
    <>
      <Card
        minW={"300"}
        boxSize={"xs"}
        heading={
          <Heading w={"100%"} variant="noShadow">
            Stake overview
          </Heading>
        }
        variant="withHeader"
        bg="whiteAlpha.200"
      >
        <Text size="lg" textAlign={"center"}>
          {`Deposited: ${
            stakedBalance ? ethers.utils.formatEther(stakedBalance) : "N/A"
          }`}
        </Text>
        <Text size="lg" textAlign={"center"}>
          {`Rewards: ${
            stakeRewards ? ethers.utils.formatEther(stakeRewards) : "N/A"
          }`}
        </Text>
      </Card>
    </>
  );
};

export default StakeOverview;
