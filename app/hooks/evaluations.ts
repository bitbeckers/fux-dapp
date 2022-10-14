import { useFuxContract } from "./contract";
import { useToast } from "@chakra-ui/react";
import {
  parseTxErrorMessage,
  useReadContract,
  useWriteContract,
} from "@raidguild/quiver";
import _ from "lodash";

export const useSubmitValueEvaluation = () => {
  console.log("useSubmitValueEvaluation");
  const toast = useToast();
  const contract = useFuxContract();

  const { mutate } = useWriteContract(contract, "submitValueEvaluation", {
    onError: (e) => {
      toast({
        title: `Couldn't submit value evaluation workstream: ${parseTxErrorMessage(
          e
        )}`,
        status: "error",
      });
      throw new Error(e.message);
    },
    onResponse: () => {
      toast({
        title: `Submitting evaluation`,
        status: "info",
        duration: 30000,
      });
    },
    onConfirmation: () => {
      toast({
        title: "Evaluation submitted",
        status: "success",
      });
    },
  });

  return (workstreamID: number, contributors: string[], ratings: number[]) =>
    mutate(workstreamID, contributors, ratings);
};

export const useValueEvaluation = (address: string, workstreamID: number) => {
  console.log("useValueEvaluation");

  const contract = useFuxContract();

  const { response: valueEvaluation } = useReadContract(
    contract,
    "getValueEvaluation",
    [address, workstreamID],
    { autoUpdateInterval: 10000 }
  );

  return valueEvaluation;
};
