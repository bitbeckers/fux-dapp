import { useClaimRewards, useRewardsBalance } from "../../hooks/rewards";
import { useConstants } from "../../utils/constants";
import { Button, Link, Text } from "@chakra-ui/react";
import { formatAddress, useWallet } from "@raidguild/quiver";
import { ethers } from "ethers";
import _ from "lodash";
import NextLink from "next/link";

const ClaimRewards: React.FC = () => {
  const { connectWallet, isConnecting, isConnected, disconnect, address } =
    useWallet();
  const rewards = useRewardsBalance();
  const claimRewards = useClaimRewards();
  const { nativeToken } = useConstants();
  return (
    <>
      {!isConnected && (
        <Button
          colorScheme="teal"
          disabled={isConnecting}
          onClick={() => !isConnected && connectWallet()}
        >
          {"..."}
        </Button>
      )}
      {isConnected && (
        <>
          <Button colorScheme="red" onClick={() => claimRewards()}>
            <Text>{`${
              ethers.utils.formatEther(rewards?.toString() || "0").toString() ||
              "..."
            } ${nativeToken}`}</Text>
          </Button>
        </>
      )}
    </>
  );
};

export default ClaimRewards;
