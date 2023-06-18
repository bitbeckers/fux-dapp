import { useBlockTx } from "../../hooks/useBlockTx";
import { useCustomToasts } from "../../hooks/useCustomToasts";
import { contractAddresses, contractABI } from "../../utils/constants";
import { Button } from "@chakra-ui/react";
import { BigNumberish } from "ethers";
import React from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

type CloseButtonType = {
  workstreamId: BigNumberish;
  contributors?: string[];
  disabled?: boolean;
  text?: string;
};

const CloseButton: React.FC<CloseButtonType> = ({
  workstreamId,
  contributors = [],
  disabled = true,
  text = "CLOSE",
}) => {
  const toast = useCustomToasts();
  const { checkChain } = useBlockTx();

  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "closeWorkstream",
    args: [workstreamId, contributors],
  });

  const { write } = useContractWrite({
    ...config,
    onError(e) {
      toast.error(e);
    },
    onSuccess(data) {
      toast.success(
        "Closing workstream",
        "Returned FUX to contributors and funds to coordinator"
      );
      console.log(data);
    },
  });

  const onSubmit = () => {
    if (checkChain()) {
      write?.();
    }
  };

  // Chakra component for a button that handles the onClick event as write
  return (
    <Button onClick={onSubmit} isDisabled={disabled} bg="blueviolet">
      {text}
    </Button>
  );
};

export { CloseButton };
