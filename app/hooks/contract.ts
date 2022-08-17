import { contractAddresses } from "../utils/constants";
import { useToast } from "@chakra-ui/react";
import {
  parseTxErrorMessage,
  useReadContract,
  useTypedContract,
  useWallet,
  useWriteContract,
} from "@raidguild/quiver";
import { ethers } from "ethers";
import _ from "lodash";
import { FUX, FUX__factory } from "summon-evm";

const useContract = () =>
  useTypedContract<FUX>(contractAddresses.erc20TokenAddress, FUX__factory);

export const useFuxContract = () => {
  const toast = useToast();
  const { address } = useWallet();
  const { contract: fux } = useContract();
  const { mutate: mintFux } = useWriteContract(fux, "mintFux", {
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

  const { mutate: mintWorkstream } = useWriteContract(fux, "mintWorkstream", {
    onError: (e) => {
      toast({
        title: `Couldn't mint workstream: ${parseTxErrorMessage(e)}`,
        status: "error",
      });
      throw new Error(e.message);
    },
    onResponse: () => {
      toast({
        title: `Minting workstream`,
        status: "info",
        duration: 30000,
      });
    },
    onConfirmation: () => {
      toast({
        title: "Workstream minted",
        status: "success",
      });
    },
  });
  const { mutate: addContributor } = useWriteContract(fux, "addContributor", {
    onError: (e) => {
      toast({
        title: `Couldn't add contributor: ${parseTxErrorMessage(e)}`,
        status: "error",
      });
      throw new Error(e.message);
    },
    onResponse: () => {
      toast({
        title: `Adding contributor`,
        status: "info",
        duration: 30000,
      });
    },
    onConfirmation: () => {
      toast({
        title: "Contributor added",
        status: "success",
      });
    },
  });

  const { response: fuxBalance } = useReadContract(
    fux,
    "balanceOf",
    [address || "", 0],
    { autoUpdateInterval: 3000 }
  );

  return {
    fux,
    fuxBalance,
    mintFux,
    mintWorkstream,
    addContributor,
  };
};

export const useCreateWorkstream = async (data: Workstream) => {
  const abiCoder = new ethers.utils.AbiCoder();
  const { mintWorkstream } = useFuxContract();
  const { address: user } = useWallet();
  const types = ["string", "address", "address[]", "string", "string"];
  const values = [
    data.name,
    user,
    data.contributors,
    data.metadataUri,
    data.reference,
  ];

  const encodedData = abiCoder.encode(types, values);
  return await mintWorkstream(encodedData);
};

export const useAddContributor = async (
  workstream: Workstream,
  contributor: string
) => {
  const toast = useToast();

  const { addContributor } = useFuxContract();

  if (!workstream.id && ethers.utils.isAddress(contributor)) {
    toast({
      title: `Couldn't add contributor: invalid input)}`,
      status: "error",
    });
    return undefined;
  }
  return await addContributor(workstream.id, contributor);
};
