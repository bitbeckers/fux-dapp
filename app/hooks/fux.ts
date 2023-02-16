import { contractAddresses, contractABI } from "../utils/constants";
import { useCustomToasts } from "./toast";
import { BigNumber } from "ethers";
import {
  usePrepareContractWrite,
  useContractWrite,
  useAccount,
  useContractRead,
} from "wagmi";

export const useMintVFux = () => {
  const { address } = useAccount();

  const { error, success } = useCustomToasts();
  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "mintFux",
  });
  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onError(e) {
      error(e);
    },
    onSuccess(data) {
      success("Minted vFUX", `vFUX minted to ${address}`);
      console.log(data);
    },
  });

  return { data, isLoading, isSuccess, write };
};

export const useVFuxBalanceForWorkstreamEvaluation = (workstreamID: number) => {
  const { error, success } = useCustomToasts();

  const {
    data,
    error: e,
    isError,
    isLoading,
  } = useContractRead({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "getVFuxForEvaluation",
    args: [workstreamID],
  });

  if (isError) {
    error(e!);
    return undefined;
  }

  return data as BigNumber;
};
