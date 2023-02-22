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
