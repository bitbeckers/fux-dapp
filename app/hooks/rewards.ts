import { useFuxContract } from "./contract";
import { useToast } from "@chakra-ui/react";
import {
  parseTxErrorMessage,
  useReadContract,
  useWallet,
  useWriteContract,
} from "@raidguild/quiver";
import _ from "lodash";

export const useClaimRewards = () => {
  const toast = useToast();
  const contract = useFuxContract();

  const { mutate: claimRewards } = useWriteContract(contract, "claimRewards", {
    onError: (e) => {
      toast({
        title: `Couldn't resolve value evaluation: ${parseTxErrorMessage(e)}`,
        status: "error",
      });
      throw new Error(e.message);
    },
    onResponse: () => {
      toast({
        title: `Submitting resolution`,
        status: "info",
        duration: 30000,
      });
    },
    onConfirmation: () => {
      toast({
        title: "Resolution submitted",
        status: "success",
      });
    },
  });

  return () => claimRewards();
};

export const useRewardsBalance = () => {
  const contract = useFuxContract();
  const { address: user } = useWallet();

  const { response: valueEvaluation } = useReadContract(
    contract,
    "getAvailableBalance",
    [user || ""],
    { autoUpdateInterval: 10000 }
  );

  return valueEvaluation;
};
