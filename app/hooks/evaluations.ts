import { useFuxContract } from "./contract";
import { useToast } from "@chakra-ui/react";
import {
  parseTxErrorMessage,
  useWriteContract,
} from "@raidguild/quiver";
import { BigNumberish } from "ethers";
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

  return (
    workstreamID: number,
    contributors: string[],
    ratings: BigNumberish[]
  ) => mutate(workstreamID, contributors, ratings);
};
