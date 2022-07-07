import { useStaking } from "../../hooks/contract";
import { Text, Heading, Card, Button } from "@raidguild/design-system";
import { useWallet } from "@raidguild/quiver";
import { ethers } from "ethers";
import { Formik, Form } from "formik";

const ClaimRewards: React.FC = () => {
  const { claimRewards, stakeRewards } = useStaking();

  const onClaim = async () => {
    await claimRewards();
  };

  return (
    <>
      <Card
        minW={"300"}
        boxSize={"xs"}
        heading={
          <Heading w={"100%"} variant="noShadow">
            Claim
          </Heading>
        }
        variant="withHeader"
        bg="whiteAlpha.200"
      >
        <Text size="lg" textAlign={"center"}>
          Claim your staking rewards
        </Text>
        <Text size="lg" textAlign={"center"}>
          {`Rewards: ${
            stakeRewards ? ethers.utils.formatEther(stakeRewards) : "N/A"
          }`}
        </Text>

        <Button
          variant="solid"
          type="submit"
          width="100%"
          onClick={() => onClaim()}
        >
          CLAIM
        </Button>
      </Card>
    </>
  );
};

export default ClaimRewards;
