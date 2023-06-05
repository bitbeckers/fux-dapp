import { Workstream, WorkstreamContributor } from "../../../.graphclient";
import { useBlockTx } from "../../../hooks/blockTx";
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
  const { checkChain } = useBlockTx();

  const _workstream = workstream as Workstream;

  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "setWorkstreamToEvaluation",
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
        "No new contributors can be added to this workstream"
      );
      console.log(data);
    },
  });

  const onSubmit = () => {
    if (checkChain()) {
      write?.();
    }
  };

  console.log("Workstream: ", workstream);

  const contributors = _workstream.contributors;

  const startEvaluation =
    contributors && contributors?.length > 0 ? (
      <>
        <Text>
          The coordinator can promote the workstream to Evaluation state. This
          step block further additions to the contributor list
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
