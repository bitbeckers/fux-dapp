import { useFuxContract } from "./contract";
import { useToast } from "@chakra-ui/react";
import {
  parseTxErrorMessage,
  useWriteContract,
} from "@raidguild/quiver";
import _ from "lodash";
import { BigNumberish } from "ethers";

export const useCloseWorkstream = () => {
  const toast = useToast();
  const contract = useFuxContract();

  const { mutate } = useWriteContract(contract, "resolveValueEvaluation", {
    onError: (e) => {
      toast({
        title: `Couldn't close workstream: ${parseTxErrorMessage(e)}`,
        status: "error",
      });
      throw new Error(e.message);
    },
    onResponse: () => {
      toast({
        title: `Closing workstream`,
        status: "info",
        duration: 30000,
      });
    },
    onConfirmation: () => {
      toast({
        title: "Workstream closed",
        status: "success",
      });
    },
  });

  return (workstreamID: number, contributors: string[], ratings: BigNumberish[]) =>
    mutate(workstreamID, contributors, ratings);
};
