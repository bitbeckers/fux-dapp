import {
  useCommitToWorkstream,
} from "../../../hooks/workstream";
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
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  fuxGiven: number;
};

const AssignFuxModal: React.FC<{
  workstreamID: number;
  availableFux: number;
}> = ({ workstreamID, availableFux }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const giveFUX = useCommitToWorkstream();

  console.log("MODAL: ", availableFux);

  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      fuxGiven: availableFux,
    },
  });

  const watchAllFields = watch();
  console.log("FORM FUX: ", watchAllFields);

  const onSubmit = (form: FormData) => {
    if (form.fuxGiven > 0 && form.fuxGiven <= availableFux) {
      giveFUX(workstreamID, form.fuxGiven).then(() => onClose());
    }
  };

  const input = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl mb={"1em"}>
        <Controller
          name={`fuxGiven`}
          control={control}
          rules={{ required: true }}
          render={({ field: { ref, onChange, ...restField } }) => (
            <NumberInput
              onChange={onChange}
              {...restField}
              defaultValue={availableFux}
              min={1}
              max={availableFux}
            >
              <NumberInputField
                ref={ref}
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

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="Give FUX"
        icon={<AddIcon />}
      ></IconButton>

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

export default AssignFuxModal;
