import { useCustomToasts } from "../../../hooks/toast";
import { contractAddresses, contractABI } from "../../../utils/constants";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  FormControl,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Tooltip,
} from "@chakra-ui/react";
import { BigNumber, BigNumberish } from "ethers";
import { Controller, useForm } from "react-hook-form";
import { usePrepareContractWrite, useContractWrite } from "wagmi";

type FormData = {
  fux: number;
};

const CommitFuxModal: React.FC<{
  workstreamID: BigNumber;
  fuxGiven: BigNumberish;
  fuxAvailable: BigNumberish;
  tiny?: boolean;
}> = ({ workstreamID, fuxGiven, fuxAvailable, tiny }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { error, success } = useCustomToasts();
  const _fuxGiven = BigNumber.from(fuxGiven);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      fux: _fuxGiven.toNumber(),
    },
  });

  const newFux = watch("fux");

  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "commitToWorkstream",
    args: [workstreamID, newFux],
  });
  const { data, write, variables } = useContractWrite({
    ...config,
    onError(e) {
      error(e);
    },
    onSuccess() {
      success(
        "FUX Given",
        `Committed ${variables?.args![1]} FUX to workstream`
      );
    },
    onMutate() {
      onClose();
    },
  });

  const fuxChanged = _fuxGiven.eq(newFux);
  const maxValue = _fuxGiven.add(fuxAvailable).toNumber();

  const onSubmit = (e: FormData) => {
    if (!BigNumber.from(e.fux).eq(_fuxGiven)) {
      write?.();
    }
  };

  const input = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl mb={"1em"}>
        <Controller
          name={`fux`}
          control={control}
          rules={{ required: true }}
          render={({ field: { ref, ...restField } }) => (
            <NumberInput
              step={1}
              min={0}
              max={maxValue}
              keepWithinRange={true}
              {...restField}
            >
              <NumberInputField
                ref={ref}
                name={restField.name}
                borderRadius={0}
                placeholder={fuxGiven.toString()}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          )}
        />
      </FormControl>

      <ButtonGroup justifyContent="space-around" w="100%">
        <Button isLoading={isSubmitting} type="reset" onClick={() => reset()}>
          Reset
        </Button>
        <Spacer />
        <Button isLoading={isSubmitting} type="submit">
          Give FUX
        </Button>
      </ButtonGroup>
    </form>
  );

  const component = tiny ? (
    <IconButton
      onClick={onOpen}
      aria-label="Give FUX"
      icon={<AddIcon />}
    ></IconButton>
  ) : (
    <Button disabled={fuxChanged} onClick={onOpen} aria-label="Give FUX">
      COMMIT
    </Button>
  );

  return (
    <>
      <Tooltip hasArrow label="Update FUX Given" aria-label="Update FUX Given">
        {component}
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="#1D131D" />
        <ModalContent bg="#221527">
          <ModalHeader>Give FUX</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{input}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommitFuxModal;
