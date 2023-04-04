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
  StatGroup,
  Stat,
  StatNumber,
} from "@chakra-ui/react";
import { BigNumber, BigNumberish } from "ethers";
import { Controller, useForm } from "react-hook-form";
import { usePrepareContractWrite, useContractWrite } from "wagmi";

type FormData = {
  fux: number;
};

const CommitFuxModal: React.FC<{
  workstreamID?: BigNumber;
  fuxGiven?: BigNumberish;
  fuxAvailable?: BigNumberish;
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
      fux: _fuxGiven ? _fuxGiven.toNumber() : 0,
    },
  });

  const newFux = watch("fux");

  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "commitToWorkstream",
    args: [workstreamID || 0, newFux],
    onError(error) {
      console.log("Error", error);
    },
  });

  const { data, write } = useContractWrite({
    ...config,
    onError(e) {
      error(e);
    },
    onSuccess() {
      success("FUX Given", `Committed ${newFux} FUX to workstream`);
    },
    onMutate() {
      onClose();
    },
  });

  const maxValue = _fuxGiven.add(fuxAvailable || 0).toNumber();

  const onSubmit = (e: FormData) => {
    if (!_fuxGiven.eq(BigNumber.from(e.fux))) {
      write?.();
    }
  };

  const input = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Controller
          name={`fux`}
          control={control}
          rules={{ required: true }}
          render={({ field: { ref, onChange, ...restField } }) => (
            <NumberInput
              step={1}
              min={0}
              max={maxValue}
              keepWithinRange={true}
              inputMode="numeric"
              precision={0}
              onChange={(valueAsString) => {
                valueAsString === ""
                  ? onChange(0)
                  : onChange(
                      Math.round(Number(valueAsString.replace(/\D/g, "")))
                    );
              }}
              {...restField}
            >
              <NumberInputField
                ref={ref}
                name={restField.name}
                borderRadius={0}
                placeholder={fuxGiven?.toString() || "0"}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          )}
        />
      </FormControl>
      <StatGroup>
        <Stat>
          <StatNumber fontFamily="mono" fontSize="md" fontWeight="100">{`${
            maxValue - newFux || 0
          } / ${maxValue} FUX available`}</StatNumber>
        </Stat>
      </StatGroup>
      <Spacer p={"0.5em"} />
      <ButtonGroup justifyContent="space-around" w="100%">
        <Button isLoading={isSubmitting} type="reset" onClick={() => reset()}>
          Reset
        </Button>
        <Spacer />
        <Button
          isDisabled={_fuxGiven.eq(BigNumber.from(newFux))}
          isLoading={isSubmitting}
          type="submit"
        >
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
    <Button onClick={onOpen} aria-label="Give FUX" w={"100%"}>
      Give FUX
    </Button>
  );

  return (
    <>
      <Tooltip
        hasArrow
        label="How many FUX do you give?"
        aria-label="Set FUX Given"
      >
        {component}
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="#1D131D" />
        <ModalContent bg="#221527">
          <ModalHeader>How many FUX do you give?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{input}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommitFuxModal;
