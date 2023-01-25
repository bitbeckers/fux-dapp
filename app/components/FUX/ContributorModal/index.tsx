import { useAddContributors } from "../../../hooks/workstream";
import { ContributorRow } from "../ContributorRow";
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
  useDisclosure,
  IconButton,
  InputGroup,
  InputRightElement,
  Spacer,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { isAddress } from "ethers/lib/utils";
import { useFieldArray, useForm } from "react-hook-form";
import { BsFillPersonPlusFill } from "react-icons/bs";

type FormData = {
  contributors: string[];
  newContributors: { address: string }[];
};

const ContributorModal: React.FC<{
  workstreamID: number;
  contributors?: { user: { id: string } }[];
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
      contributors:
        contributors?.map(({ user }) => {
          return user.id;
        }) || [],
      newContributors: [{ address: "" }],
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } =
    useFieldArray<FormData>({
      control,
      name: "newContributors",
    });

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
      {contributors?.map(({ user }, index) => (
        <ContributorRow key={index} address={user.id} />
      ))}

      {fields.map((field, index) => (
        <InputGroup key={field.id} marginTop={"1em"}>
          <Input
            id="newContributors"
            defaultValue={`${field.address}`}
            {...register(`newContributors.${index}.address`)}
          />
          {index == fields.length - 1 ? (
            <InputRightElement>
              <IconButton
                aria-label="Add contributor"
                onClick={() => append({ address: "" })}
                icon={<Icon as={BsFillPersonPlusFill} />}
              />
            </InputRightElement>
          ) : undefined}
        </InputGroup>
      ))}
      <ButtonGroup justifyContent="space-between" w="100%" marginTop={"1em"}>
        <Button isLoading={isSubmitting} type="reset" onClick={() => reset()}>
          Reset
        </Button>
        <Spacer />
        <Button isLoading={isSubmitting} type="submit">
          Store
        </Button>
      </ButtonGroup>
    </form>
  );

  return (
    <>
      <Tooltip hasArrow label="Manage Contributors" aria-label="Manage Contributors">
        <IconButton
          onClick={onOpen}
          aria-label="Manage contributors"
          icon={<Icon as={BsFillPersonPlusFill} />}
        ></IconButton>
      </Tooltip>

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
