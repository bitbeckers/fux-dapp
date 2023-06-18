import { contractAddresses, contractABI } from "../utils/constants";
import { useCustomToasts } from "./useCustomToasts";
import _ from "lodash";
import { usePrepareContractWrite, useContractWrite } from "wagmi";

export const useFinalizeWorkstream = () => {
  console.log("useCloseWorkstream");
  const { error, success } = useCustomToasts();
  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "finalizeWorkstream",
  });
  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onError(e) {
      error(e);
    },
    onSuccess(data) {
      success("Closed workstream", "Evaluation submitted succesfully");
      console.log(data);
    },
  });

  return { data, isLoading, isSuccess, write };
};

export const useCloseWorkstream = () => {
  console.log("useCloseWorkstream");
  const { error, success } = useCustomToasts();
  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "closeWorkstream",
  });
  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onError(e) {
      error(e);
    },
    onSuccess(data) {
      success("Closing workstream", "Workstream closed succesfully");
      console.log(data);
    },
  });

  return { data, isLoading, isSuccess, write };
};
