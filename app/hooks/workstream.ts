import { useFuxContract } from "./contract";
import { useToast } from "@chakra-ui/react";
import {
  parseTxErrorMessage,
  useReadContract,
  useWallet,
  useWriteContract,
} from "@raidguild/quiver";
import _ from "lodash";

export const useMintWorkstream = () => {
  console.log("useMintWorkstream");
  const toast = useToast();
  const contract = useFuxContract();

  const { mutate } = useWriteContract(contract, "mintWorkstream", {
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

  return async (name: string, contributors: string[], deadline: number) =>
    mutate(name, contributors, deadline);
};

export const useCommitToWorkstream = () => {
  console.log("useCommitToWorkstream");

  const toast = useToast();
  const contract = useFuxContract();

  const { mutate: commitToWorkstream } = useWriteContract(
    contract,
    "commitToWorkstream",
    {
      onError: (e) => {
        toast({
          title: `Couldn't commit to workstream: ${parseTxErrorMessage(e)}`,
          status: "error",
        });
        throw new Error(e.message);
      },
      onResponse: () => {
        toast({
          title: `Committing to workstream`,
          status: "info",
          duration: 30000,
        });
      },
      onConfirmation: () => {
        toast({
          title: "FUX were given",
          status: "success",
        });
      },
    }
  );

  return (workstreamID: number, fuxGiven: number) =>
    commitToWorkstream(workstreamID, fuxGiven);
};

export const useWithdrawFromWorkstream = () => {
  console.log("useWithdrawFromWorkstream");

  const toast = useToast();
  const contract = useFuxContract();

  const { mutate: withdrawFromWorkstream } = useWriteContract(
    contract,
    "withdrawFromWorkstream",
    {
      onError: (e) => {
        toast({
          title: `Couldn't withdraw FUX: ${parseTxErrorMessage(e)}`,
          status: "error",
        });
        throw new Error(e.message);
      },
      onResponse: () => {
        toast({
          title: `Withdrawing FUX`,
          status: "info",
          duration: 30000,
        });
      },
      onConfirmation: () => {
        toast({
          title: "FUX withdrawn",
          status: "success",
        });
      },
    }
  );

  return (workstreamID: number) => withdrawFromWorkstream(workstreamID);
};

export const useGetWorkstreamIDs = () => {
  console.log("useGetWorkstreams");

  const { address: user } = useWallet();
  const contract = useFuxContract();

  const { response: userWorkstreams } = useReadContract(
    contract,
    "getWorkstreamIDs",
    [user || ""],
    { autoUpdateInterval: 10000 }
  );

  return userWorkstreams;
};

export const useGetWorkstreamByID = (id: number) => {

  const contract = useFuxContract();

  const { response: workstream } = useReadContract(
    contract,
    "getWorkstreamByID",
    [id]
  );

  return workstream;
};

export const useCommitmentToWorkstreamByID = (
  workstreamID: number,
  contributor: string
) => {
  console.log("useCommitmentToWorkstreamByID");

  const contract = useFuxContract();

  const { response: workstream } = useReadContract(
    contract,
    "getWorkstreamCommitment",
    [contributor, workstreamID],
    { autoUpdateInterval: 5000 }
  );

  return workstream;
};

export const useAddContributors = () => {
  console.log("useAddContributors");

  const toast = useToast();
  const contract = useFuxContract();

  const { mutate } = useWriteContract(contract, "addContributors", {
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

  return (id: number, contributors: string[]) => mutate(id, contributors);
};
