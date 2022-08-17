import { contractAddresses } from "../utils/constants";
import { useToast } from "@chakra-ui/react";
import {
  useReadContract,
  useTypedContract,
  useWallet,
  useWriteContract,
} from "@raidguild/quiver";
import _ from "lodash";
import { FUX, FUX__factory } from "summon-evm";

const useContract = () =>
  useTypedContract<FUX>(contractAddresses.erc20TokenAddress, FUX__factory);

export const useFuxContract = () => {
  const { address } = useWallet();
  const { contract: fux } = useContract();
  const { mutate: mintFux } = useWriteContract(fux, "mintFux");

  const { mutate: mintWorkstream } = useWriteContract(fux, "mintWorkstream");
  const { mutate: addContributor } = useWriteContract(fux, "addContributor");

  const { response: fuxBalance } = useReadContract(
    fux,
    "balanceOf",
    [address || "", 0],
    { autoUpdateInterval: 3000 }
  );

  console.log("Balance: ", fuxBalance);

  return {
    fux,
    fuxBalance,
    mintFux,
    mintWorkstream,
    addContributor,
  };
};

export const useErrorToast = (error: any) => {
  const toast = useToast();
  toast({
    position: "bottom-left",
    title: `error toast`,
    status: "error",
    isClosable: true,
  });
};
