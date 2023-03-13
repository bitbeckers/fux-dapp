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
import { BigNumber } from "ethers";
import { Controller, useForm } from "react-hook-form";
import { usePrepareContractWrite, useContractWrite } from "wagmi";

type FormData = {
  fux: number;
};

const CommitFuxModal: React.FC<{
  workstreamID: BigNumber;
  fuxGiven: BigNumber;
  fuxAvailable: BigNumber;
  tiny?: boolean;
}> = ({ workstreamID, fuxGiven, fuxAvailable, tiny }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { error, success } = useCustomToasts();
  const _fuxGiven = BigNumber.from(fuxGiven);

  console.log(fuxGiven);
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

  console.log(_fuxGiven);
  console.log("MaxValue: ", maxValue);

  const onSubmit = () => {
    if (fuxChanged) {
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
          render={({ field: { ...restField } }) => (
            <NumberInput
              {...restField}
              defaultValue={fuxGiven.toString()}
              step={1}
              min={0}
              keepWithinRange={true}
              max={maxValue}
            >
              <NumberInputField
                {...register("fux")}
                name={restField.name}
                borderRadius={0}
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
