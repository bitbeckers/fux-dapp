import { Workstream, WorkstreamContributor } from "../../../.graphclient";
import { useCustomToasts } from "../../../hooks/toast";
import { contractAddresses, contractABI } from "../../../utils/constants";
import { Button, Text } from "@chakra-ui/react";
import React from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";

const StartEvaluation: React.FC<{
  workstream: Partial<WorkstreamContributor>;
}> = ({ workstream }) => {
  const toast = useCustomToasts();
  const { address: user } = useAccount();

  const _workstream = workstream as Workstream;

  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "mintVFux",
    args: [workstream.id],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onError(e) {
      toast.error(e);
    },
    onSuccess(data) {
      toast.success(
        "Starting Evaluation",
        "Minting vFUX for contributor rewards"
      );
      console.log(data);
    },
  });

  const onSubmit = () => {
    write?.();
  };

  console.log("Workstream: ", workstream);

  const contributors = _workstream.contributors;

  const startEvaluation =
    contributors && contributors?.length > 0 ? (
      <>
        <Text>
          The coordinator can promote the workstream to Evaluation state. This
          step is required before finalizing the workstream
        </Text>
        <Button
          isDisabled={
            !_workstream.id &&
            !user?.toLowerCase() &&
            user?.toLowerCase() !== _workstream.coordinator?.id.toLowerCase()
          }
          isLoading={isLoading}
          type="submit"
          onClick={onSubmit}
        >
          Start evaluation
        </Button>
      </>
    ) : (
      <Text>No contributors found</Text>
    );

  return startEvaluation;
};

export { StartEvaluation };
