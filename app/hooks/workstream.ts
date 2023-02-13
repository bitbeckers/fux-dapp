import { contractAddresses, contractABI } from "../utils/constants";
import { useCustomToasts } from "./toast";
import { useToast } from "@chakra-ui/react";
import { parseTxErrorMessage, useWriteContract } from "@raidguild/quiver";
import { BigNumber, BigNumberish } from "ethers";
import _ from "lodash";
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";

export const useMintWorkstream = () => {
  const { address } = useAccount();

  const { error, success } = useCustomToasts();
  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "mintWorkstream",
  });
  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onError(e) {
      error(e);
    },
    onSuccess(data) {
      success("Created workstream", ``);
      console.log(data);
    },
  });

  return { data, isLoading, isSuccess, write };
};

export const useCommitToWorkstream = (
  workstreamID: BigNumberish,
  newFux: BigNumberish
) => {
  const { error, success } = useCustomToasts();
  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "commitToWorkstream",
    args: [workstreamID, newFux],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onError(e) {
      error(e);
    },
    onSuccess(data) {
      success("FUX Given", `Committed to workstream`);
      console.log(data);
    },
  });

  return { data, isLoading, isSuccess, write };
};

export const useWithdrawFromWorkstream = () => {
  const { error, success } = useCustomToasts();
  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "withdrawFromWorkstream",
  });
  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onError(e) {
      error(e);
    },
    onSuccess(data) {
      success("FUX withdrawn", ``);
      console.log(data);
    },
  });

  return { data, isLoading, isSuccess, write };
};

export const useAddContributors = (
  workstreamID: BigNumber,
  contributors: `0x${string}`[]
) => {
  const { error, success } = useCustomToasts();
  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "addContributors",
    args: [workstreamID, contributors],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onError(e) {
      error(e);
    },
    onSuccess(data) {
      success("Contributors added", ``);
      console.log(data);
    },
  });

  return { data, isLoading, isSuccess, write };
};
