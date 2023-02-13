import { contractAddresses, contractABI } from "../utils/constants";
import { useCustomToasts } from "./toast";
import _ from "lodash";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";

export const useClaimRewards = () => {
  const { address } = useAccount();
  const { error, success } = useCustomToasts();
  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "claimRewards",
  });
  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onError(e) {
      error(e);
    },
    onSuccess(data) {
      success("Claimed rewards", `FUX rewards claimed for ${address}`);
      console.log(data);
    },
  });

  return { data, isLoading, isSuccess, write };
};
