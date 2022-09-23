import { useMintWorkstream } from "../../../hooks/workstream";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useWallet } from "@raidguild/quiver";
import { DateTime } from "luxon";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  duration: string;
};

const WorkstreamModal: React.FC = () => {
  const { address: user } = useWallet();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const addWorkstream = useMintWorkstream();

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      duration: "7",
    },
  });

  const watchAllFields = watch();
  console.log("FORM: ", watchAllFields);

  const onSubmit = (form: FormData) => {
    // Mint workstream
    const deadline = Number(
      DateTime.now()
        .plus({ days: +form.duration })
        .toSeconds()
        .toFixed()
    );
    if (user) {
      addWorkstream(form.name, [user], deadline).then(() => onClose());
    }
  };

  // TODO inputType date
  const input = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Input
          id="name"
          placeholder="name"
          {...register("name", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" },
          })}
        />
        <InputGroup>
          <Input
            id="duration"
            placeholder="duration"
            {...register("duration", {
              required: "This is required",
              minLength: { value: 1, message: "Minimum length should be 1" },
            })}
          />
          <InputRightAddon>
            <Text>Days</Text>
          </InputRightAddon>
        </InputGroup>
      </FormControl>
      <ButtonGroup justifyContent="space-around" w="100%">
        <Button isLoading={isSubmitting} type="reset" onClick={() => reset()}>
          Reset
        </Button>
        <Spacer />
        <Button isLoading={isSubmitting} type="submit">
          Create workstream
        </Button>
      </ButtonGroup>
    </form>
  );

  return (
    <>
      <Button onClick={onOpen} leftIcon={<AddIcon />}>
        Add workstream
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="#1D131D" />
        <ModalContent bg="#221527">
          <ModalHeader>Add workstream</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{input}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WorkstreamModal;
