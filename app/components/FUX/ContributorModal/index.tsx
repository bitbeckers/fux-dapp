import { WorkstreamContributor } from "../../../.graphclient";
import { useCustomToasts } from "../../../hooks/toast";
import { contractAddresses, contractABI } from "../../../utils/constants";
import { Contributor } from "../Contributor";
import User from "../User";
import {
  Box,
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
  Text,
  Tooltip,
  Grid,
  GridItem,
  Stat,
  StatNumber,
} from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { useFieldArray, useForm } from "react-hook-form";
import { BsFillPersonPlusFill, BsFillPersonXFill } from "react-icons/bs";
import { usePrepareContractWrite, useContractWrite } from "wagmi";

type FormData = {
  contributors: string[];
  newContributors: { address: string }[];
};

const ContributorModal: React.FC<{
  workstreamID: BigNumber;
  workstreamName: string;
  contributors?: WorkstreamContributor[];
}> = ({ workstreamID, workstreamName, contributors }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { error, success } = useCustomToasts();

  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      contributors: contributors?.map((contributor) => contributor.id),
      newContributors: [{ address: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray<FormData>({
    control,
    name: "newContributors",
  });

  const newContributors = watch("newContributors");

  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "addContributors",
    args: [
      workstreamID,
      newContributors
        .map((entry) => entry.address)
        .filter((address) => isAddress(address)),
    ],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onError(e) {
      error(e);
    },
    onSuccess(data) {
      success("Contributors added", ``);
      console.log(data);
    },
  });

  const onSubmit = () => {
    if (newContributors.length > 0) {
      write?.();
      onClose();
    }
  };

  const input = (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid gap={2} templateColumns="repeat(7, 1fr)">
          <GridItem colSpan={5}>
            <Text>Contributor</Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Text>Committed</Text>
          </GridItem>
          {contributors !== undefined
            ? contributors.map((cont) => (
                <>
                  <GridItem colSpan={5}>
                    <User
                      address={cont.contributor.id as `0x${string}`}
                      direction="horizontal"
                      displayAvatar={true}
                    />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Stat>
                      <StatNumber>{`${cont.commitment || 0}%`}</StatNumber>
                    </Stat>
                  </GridItem>
                </>
              ))
            : undefined}
        </Grid>

        <Box mt={6}>
          <hr />
        </Box>
        <Text mt={6}>Invite Contributors</Text>

        {fields.map((field, index) => (
          <InputGroup key={field.id} marginTop={"1em"}>
            <Input
              id="newContributors"
              defaultValue={`${field.address}`}
              {...register(`newContributors.${index}.address`)}
            />
            {index == fields.length - 1 ? (
              <InputRightElement>
                <Tooltip
                  hasArrow
                  label="Add Another Contributor"
                  aria-label="Add Another Contributor"
                >
                  <IconButton
                    aria-label="Add another contributor"
                    onClick={() => append({ address: "" })}
                    icon={<Icon as={BsFillPersonPlusFill} />}
                  />
                </Tooltip>
              </InputRightElement>
            ) : (
              <InputRightElement>
                <Tooltip
                  hasArrow
                  label="Remove Contributor"
                  aria-label="Remove Contributor"
                >
                  <IconButton
                    aria-label="remove contributor"
                    background={"red.500"}
                    onClick={() => remove(index)}
                    icon={<Icon as={BsFillPersonXFill} />}
                  />
                </Tooltip>
              </InputRightElement>
            )}
          </InputGroup>
        ))}
        <ButtonGroup justifyContent="space-between" w="100%" marginTop={"1em"}>
          <Button isLoading={isSubmitting} type="reset" onClick={() => reset()}>
            Reset
          </Button>
          <Spacer />
          <Button isLoading={isSubmitting} type="submit">
            Submit
          </Button>
        </ButtonGroup>
      </form>
    </>
  );

  return (
    <>
      <Tooltip
        hasArrow
        label="Manage Contributors"
        aria-label="Manage Contributors"
      >
        <IconButton
          onClick={onOpen}
          aria-label="Manage contributors"
          icon={<Icon as={BsFillPersonPlusFill} />}
        ></IconButton>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="#1D131D" />
        <ModalContent bg="#221527">
          <ModalHeader>{workstreamName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{input}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ContributorModal;
