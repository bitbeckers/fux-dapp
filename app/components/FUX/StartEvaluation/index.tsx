import { Workstream, WorkstreamContributor } from "../../../.graphclient";
import { useCustomToasts } from "../../../hooks/toast";
import {
  contractAddresses,
  contractABI,
  useConstants,
} from "../../../utils/constants";
import User from "../User";
import { StarIcon } from "@chakra-ui/icons";
import {
  Button,
  Grid,
  GridItem,
  Text,
  Stat,
  StatNumber,
  HStack,
  StatLabel,
} from "@chakra-ui/react";
import { BigNumberish, ethers } from "ethers";
import _, { groupBy, mapValues, meanBy } from "lodash";
import { DateTime } from "luxon";
import React, { Fragment } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";



const StartEvaluation: React.FC<{
  workstream: Partial<WorkstreamContributor>;
}> = ({ workstream }) => {
  const toast = useCustomToasts();
  const { nativeToken } = useConstants();
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
  const coordinator = _workstream.coordinator?.id;
  const funding = ethers.utils.formatEther(_workstream.funding);

  console.log("Contributors: ", contributors);

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
