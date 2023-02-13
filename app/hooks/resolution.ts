import { contractAddresses, contractABI } from "../utils/constants";
import { useCustomToasts } from "./toast";
import _ from "lodash";
import { usePrepareContractWrite, useContractWrite } from "wagmi";

export const useCloseWorkstream = () => {
  console.log("useCloseWorkstream");
  const { error, success } = useCustomToasts();
  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "resolveValueEvaluation",
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
