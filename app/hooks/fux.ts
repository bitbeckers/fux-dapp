import { useFuxContract } from "./contract";
import { useToast } from "@chakra-ui/react";
import {
  parseTxErrorMessage,
  useReadContract,
  useWallet,
  useWriteContract,
} from "@raidguild/quiver";
import _ from "lodash";

export const useMintFux = () => {
  console.log("useMintFux");
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

export const useFuxBalance = () => {
  console.log("useFuxBalance");
  const { address } = useWallet();
  const contract = useFuxContract();

  const { response: fuxBalance } = useReadContract(
    contract,
    "balanceOf",
    [address || "", 0],
    { autoUpdateInterval: 10000 }
  );

  return fuxBalance;
};

export const useVFuxBalance = () => {
  console.log("useVFuxBalance");

  const { address } = useWallet();
  const contract = useFuxContract();

  const { response: fuxBalance } = useReadContract(
    contract,
    "balanceOf",
    [address || "", 1],
    { autoUpdateInterval: 60000 }
  );

  return fuxBalance;
};
