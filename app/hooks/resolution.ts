import { useFuxContract } from "./contract";
import { useToast } from "@chakra-ui/react";
import {
  parseTxErrorMessage,
  useWriteContract,
} from "@raidguild/quiver";
import _ from "lodash";

export const useResolveValueEvaluation = () => {
  console.log("useResolveValueEvaluation");
  const toast = useToast();
  const contract = useFuxContract();

  const { mutate } = useWriteContract(contract, "resolveValueEvaluation", {
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

  return (workstreamID: number, contributors: string[], ratings: number[]) =>
    mutate(workstreamID, contributors, ratings);
};
