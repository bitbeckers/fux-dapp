import { useAllStakes } from "../../hooks/graph";
import { Text, Heading, Card } from "@raidguild/design-system";
import { formatAddress } from "@raidguild/quiver";
import { ethers } from "ethers";

const AllStakes: React.FC = () => {
  const { loading, allStakes } = useAllStakes();

  const userStake = (stake: StakeResponse) => {
    return (
      <Text key={stake.id}>{`${formatAddress(
        stake.user.id
      )} - ${ethers.utils.formatEther(stake.amount)}`}</Text>
    );
  };

  return (
    <>
      <Card
        minW={"300"}
        boxSize={"xs"}
        heading={
          <Heading w={"100%"} variant="noShadow">
            Recent stakes
          </Heading>
        }
        variant="withHeader"
        bg="whiteAlpha.200"
      >
        {allStakes ? (
          allStakes.map((stake: StakeResponse) => userStake(stake))
        ) : (
          <Text>Loading...</Text>
        )}
      </Card>
    </>
  );
};

export default AllStakes;
