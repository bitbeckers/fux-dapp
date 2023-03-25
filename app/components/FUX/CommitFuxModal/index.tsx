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
  Flex,
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

  const fuxChanged = newFux ? _fuxGiven.eq(BigNumber.from(newFux)) : false;
  const maxValue = _fuxGiven.add(fuxAvailable).toNumber();

  const onSubmit = (_: FormData) => {
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
        <Button isDisabled={fuxChanged} isLoading={isSubmitting} type="submit">
          Update FUX
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
    <Button onClick={onOpen} aria-label="Give FUX">
      Update FUX
    </Button>
  );

  return (
    <>
      <Tooltip hasArrow label="Update FUX Given" aria-label="Update FUX Given">
        {component}
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="base.800" />
        <ModalContent bg="eggplant.800">
          <Flex direction={"column"} p={"1em"}>
            <ModalHeader>Update FUX Given</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{input}</ModalBody>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommitFuxModal;
