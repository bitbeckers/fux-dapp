import { UserDocument } from "../../.graphclient";
import { useCustomToasts } from "../../hooks/toast";
import {
  contractABI,
  contractAddresses,
  useConstants,
} from "../../utils/constants";
import { Button, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useQuery } from "urql";
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";

const ClaimRewards: React.FC = () => {
  const { address } = useAccount();
  const { nativeToken } = useConstants();

  const { error: errorToast, success: successToast } = useCustomToasts();

  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "claimRewards",
  });

  const { write } = useContractWrite({
    ...config,
    onError(e) {
      errorToast(e);
    },
    onSuccess(data) {
      successToast("Claimed rewards", `FUX rewards claimed for ${address}`);
      console.log(data);
    },
  });

  const [result, reexecuteQuery] = useQuery({
    query: UserDocument,
    variables: {
      address: address?.toLowerCase() || "",
    },
  });

  const { data: rewardsData, fetching, error } = result;

  const rewards = rewardsData?.user?.rewards;

  return (
    <>
      <Button colorScheme="red" disabled={!write} onClick={() => write?.()}>
        {fetching ? (
          <Text>Loading</Text>
        ) : (
          <Text>{`Claim ${
            rewards
              ? ethers.utils.formatEther(rewards.toString()).toString()
              : "0"
          } ${nativeToken}`}</Text>
        )}
      </Button>
    </>
  );
};

export default ClaimRewards;
