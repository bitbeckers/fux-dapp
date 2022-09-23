import { useAddContributors } from "../../../hooks/workstream";
import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { isAddress } from "ethers/lib/utils";
import { useFieldArray, useForm } from "react-hook-form";

type FormData = {
  contributors: string[];
  newContributors: { address: string }[];
};

const ContributorModal: React.FC<{
  workstreamID: number;
  contributors: string[];
}> = ({ workstreamID, contributors }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const addContributors = useAddContributors();

  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      contributors: contributors,
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } =
    useFieldArray<FormData>({
      control,
      name: "newContributors",
    });

  const watchAllFields = watch();
  console.log("FORM CONTRIBUTORS: ", watchAllFields);

  const onSubmit = (form: FormData) => {
    if (form.newContributors.length > 0) {
      const addressArray = form.newContributors
        .map((entry) => entry.address)
        .filter((address) => isAddress(address));
      addContributors(workstreamID, addressArray).then(() => onClose());
    }
  };

  const input = (
    <form onSubmit={handleSubmit(onSubmit)}>
      {contributors.map((contributor, index) => (
        <Text key={index}>{contributor}</Text>
      ))}

      {fields.map((field, index) => (
        <Input
          key={field.id}
          id="newContributors"
          defaultValue={`${field.address}`}
          {...register(`newContributors.${index}.address`)}
        />
      ))}
      <HStack>
        <ButtonGroup justifyContent="space-around" w="70%">
          <Button isLoading={isSubmitting} type="reset" onClick={() => reset()}>
            Reset
          </Button>
          <Button type="button" onClick={() => append({ address: "" })}>
            Add
          </Button>
        </ButtonGroup>
        <Button isLoading={isSubmitting} type="submit">
          Add contributors
        </Button>
      </HStack>
    </form>
  );

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="Manage contributors"
        icon={<PlusSquareIcon />}
      ></IconButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="#1D131D" />
        <ModalContent bg="#221527">
          <ModalHeader>Workstream contributors</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{input}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ContributorModal;
