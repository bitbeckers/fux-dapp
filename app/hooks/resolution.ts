import { useFuxContract } from "./contract";
import { useToast } from "@chakra-ui/react";
import {
  parseTxErrorMessage,
  useWriteContract,
} from "@raidguild/quiver";
import _ from "lodash";
import { BigNumberish } from "ethers";

export const useResolveValueEvaluation = () => {
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

  return (workstreamID: number, contributors: string[], ratings: BigNumberish[]) =>
    mutate(workstreamID, contributors, ratings);
};

export const useResolveSoloWorkstream = () => {
  const toast = useToast();
  const contract = useFuxContract();

  const { mutate } = useWriteContract(contract, "resolveSoloWorkstream", {
    onError: (e) => {
      toast({
        title: `Couldn't resolve workstream: ${parseTxErrorMessage(e)}`,
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

  return (workstreamID: number) =>
    mutate(workstreamID);
};
