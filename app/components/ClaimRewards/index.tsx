import { UserDocument } from "../../.graphclient";
import { useClaimRewards } from "../../hooks/rewards";
import { useConstants } from "../../utils/constants";
import { Button, Text } from "@chakra-ui/react";
import { useWallet } from "@raidguild/quiver";
import { ethers } from "ethers";
import { useQuery } from "urql";

const ClaimRewards: React.FC = () => {
  const claimRewards = useClaimRewards();
  const { nativeToken } = useConstants();
  const { address } = useWallet();

  const [result, reexecuteQuery] = useQuery({
    query: UserDocument,
    variables: {
      address: address?.toLowerCase() || "",
    },
  });

  const { data, fetching, error } = result;

  const rewards = data?.user?.rewards;

  return (
    <>
      <Button colorScheme="red" onClick={() => claimRewards()}>
        <Text>{`${
          rewards
            ? ethers.utils.formatEther(rewards.toString()).toString()
            : "0"
        } ${nativeToken}`}</Text>
      </Button>
    </>
  );
};

export default ClaimRewards;
