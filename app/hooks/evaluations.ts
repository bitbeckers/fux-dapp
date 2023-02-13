import { contractAddresses, contractABI } from "../utils/constants";
import { useCustomToasts } from "./toast";
import _ from "lodash";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

export const useSubmitValueEvaluation = () => {
  console.log("useSubmitValueEvaluation");
  const { error, success } = useCustomToasts();
  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "submitValueEvaluation",
  });
  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onError(e) {
      error(e);
    },
    onSuccess(data) {
      success("Submitted Evaluation", "Evaluation submitted succesfully");
      console.log(data);
    },
  });

  return { data, isLoading, isSuccess, write };
};
