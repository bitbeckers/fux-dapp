import { useFuxContract } from "./contract";
import { useToast } from "@chakra-ui/react";
import {
  parseTxErrorMessage,
  useReadContract,
  useWriteContract,
} from "@raidguild/quiver";

export const useMintFux = () => {
  const toast = useToast();
  const contract = useFuxContract();
  const { mutate: mintFux } = useWriteContract(contract, "mintFux", {
    onError: (e) => {
      toast({
        title: `Couldn't mint FUX: ${parseTxErrorMessage(e)}`,
        status: "error",
      });
      throw new Error(e.message);
    },
    onResponse: () => {
      toast({
        title: `Minting FUX`,
        status: "info",
        duration: 30000,
      });
    },
    onConfirmation: () => {
      toast({
        title: "FUX minted",
        status: "success",
      });
    },
  });

  return mintFux;
};

export const useMintVFux = () => {
  const toast = useToast();
  const contract = useFuxContract();
  const { mutate: mintVFux } = useWriteContract(contract, "mintVFux", {
    onError: (e) => {
      toast({
        title: `Couldn't mint vFUX: ${parseTxErrorMessage(e)}`,
        status: "error",
      });
      throw new Error(e.message);
    },
    onResponse: () => {
      toast({
        title: `Minting vFUX`,
        status: "info",
        duration: 30000,
      });
    },
    onConfirmation: () => {
      toast({
        title: "vFUX minted",
        status: "success",
      });
    },
  });

  return (workstreamID: number) => mintVFux(workstreamID);
};

export const useVFuxBalanceForWorkstreamEvaluation = (
  workstreamID: number
) => {
  const contract = useFuxContract();

  const { response: vFuxAvailable } = useReadContract(
    contract,
    "getVFuxForEvaluation",
    [workstreamID],
    { autoUpdateInterval: 10000 }
  );

  return vFuxAvailable;
};
