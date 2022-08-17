import { useFux } from "../../../contexts/FuxProvider";
import { useCreateNFT } from "../../../hooks/nft";
import { useWorkstreams } from "../../../hooks/workstream";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  GridItem,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  name: string;
  image: string;
  description: string;
  reference: string;
  source: string;
};

const WorkstreamModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addWorkstream } = useFux();
  const [reference, setReference] = useState<string>();

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      image: "",
      description: "",
      source: "manual",
      reference: "http://examples.com",
    },
  });

  const onSubmit = (form: FormData) => {
    // Upload to NFT.Storage
    const metadata = await useCreateNFT(form);
    // Mint NFT
    addWorkstream(form);
  };

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
        <Input
          id="description"
          placeholder="description"
          {...register("description", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" },
          })}
        />
        <Input
          id="image"
          placeholder="image"
          {...register("image", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" },
          })}
        />
      </FormControl>
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

          <ModalFooter justifyContent={"center"}>
            <HStack w={"100%"} pt={4}>
              <Button
                isLoading={isSubmitting}
                type="reset"
                onClick={() => reset()}
              >
                Reset
              </Button>
              <Spacer />
              <Button isLoading={isSubmitting} type="submit">
                Create workstream
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WorkstreamModal;
