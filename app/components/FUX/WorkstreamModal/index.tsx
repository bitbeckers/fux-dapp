import { UserDocument } from "../../../.graphclient";
import { useCustomToasts } from "../../../hooks/toast";
import {
  contractABI,
  contractAddresses,
  useConstants,
} from "../../../utils/constants";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
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
  Tooltip,
  Text,
  useDisclosure,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  HStack,
  VStack,
  FormHelperText,
  Flex,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { DateTime } from "luxon";
import { Controller, useForm } from "react-hook-form";
import { RiInformationLine } from "react-icons/ri";
import { useQuery } from "urql";
import {
  useAccount,
  useBalance,
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";

type FormData = {
  name: string;
  duration: string;
  funding: number;
  fuxGiven: number;
};

const WorkstreamModal: React.FC<{ onCloseAction: () => void }> = ({
  onCloseAction,
}) => {
  const { address } = useAccount();
  const { error: errorToast, success: successToast } = useCustomToasts();

  const {
    handleSubmit,
    watch,
    register,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      duration: DateTime.now().plus({ day: 1 }).toISODate(),
      funding: 0,
      fuxGiven: 0,
    },
  });

  const formState = watch();

  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "mintWorkstream",
    args: [
      formState.name,
      [address],
      formState.fuxGiven,
      DateTime.fromISO(formState.duration).endOf("day").toSeconds().toFixed(),
    ],
    overrides: {
      value: ethers.utils.parseEther(
        formState.funding ? formState.funding.toString() : "0"
      ),
    },
  });

  const { data: tx, write } = useContractWrite({
    ...config,
    onError(e) {
      errorToast(e);
    },
    onSuccess(tx) {
      successToast(`Created workstream`, "");
      console.log(tx);
    },
  });

  const { chain } = useNetwork();
  const { data: balance, isLoading: balanceLoading } = useBalance({
    address,
    chainId: chain?.id,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { nativeToken } = useConstants();

  const [result] = useQuery({
    query: UserDocument,
    variables: {
      address: address?.toLowerCase() || "",
    },
  });

  const { data, fetching, error } = result;

  const fuxBalance = data?.user?.balances?.find(
    (balance) => balance.token.name === "FUX"
  )?.amount;

  const onSubmit = () => {
    write?.();
    onClose();
    onCloseAction();
  };

  const input = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormHelperText
          textColor={"white"}
          mb={"1em"}
          display={"flex"}
          alignItems={"center"}
        >
          Name
          <Tooltip label="Name your workstream">
            <Box ml={2}>
              <RiInformationLine />
            </Box>
          </Tooltip>
        </FormHelperText>

        <Input
          id="name"
          mb={"1em"}
          placeholder="name"
          {...register("name", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" },
          })}
        />
        <Flex gap={"1em"} wrap={"wrap"}>
          <Flex direction={"column"} justify={"flex-start"} gap={"1"}>
            <FormHelperText textColor={"white"} w={"100%"} display={"flex"}>
              Deadline
              <Tooltip label="Just an estimated time of delivery as reference for contributors. It has no other effect, such as triggering evaluations.">
                <Box ml={2}>
                  <RiInformationLine />
                </Box>
              </Tooltip>
            </FormHelperText>

            <Input
              id="duration"
              type="date"
              placeholder="duration"
              {...register("duration", {
                required: "This is required",
                minLength: {
                  value: 1,
                  message: "Minimum length should be 1",
                },
              })}
            />
          </Flex>

          <Flex direction={"column"} maxW={"250px"} gap={1}>
            <FormHelperText textColor={"white"} w={"100%"} display={"flex"}>
              How many FUX do you give?
              <Tooltip label="Stake some FUX if you'll also be contributing">
                <Box ml={2}>
                  <RiInformationLine />
                </Box>
              </Tooltip>
            </FormHelperText>
            <Controller
              name={`fuxGiven`}
              control={control}
              rules={{ required: true }}
              key={`fuxGiven`}
              render={({ field: { ref, ...restField } }) => (
                <InputGroup>
                  <NumberInput
                    precision={0}
                    step={1}
                    min={0}
                    max={fuxBalance}
                    {...restField}
                  >
                    <NumberInputField
                      ref={ref}
                      name={restField.name}
                      borderRightRadius={0}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <InputRightAddon
                    bg={"plum.500"}
                    fontWeight={"bold"}
                    w={"75px"}
                  >
                    <Text>FUX</Text>
                  </InputRightAddon>
                </InputGroup>
              )}
            />
            <FormHelperText textColor={"primary.400"} w={"100%"}>
              {`${fuxBalance} FUX to give`}
            </FormHelperText>
          </Flex>

          <Flex direction={"column"} maxW={"250px"} gap={1}>
            <FormHelperText textColor={"white"} w={"100%"} display={"flex"}>
              Fund workstream
              <Tooltip label="Funding will auto-split to contributors based on evaluation">
                <Box ml={2}>
                  <RiInformationLine />
                </Box>
              </Tooltip>
            </FormHelperText>
            <Controller
              name={`funding`}
              control={control}
              rules={{ required: false }}
              key={`funding`}
              render={({ field: { ref, ...restField } }) => (
                <InputGroup>
                  <NumberInput precision={2} step={0.05} min={0} {...restField}>
                    <NumberInputField
                      ref={ref}
                      name={restField.name}
                      borderRightRadius={0}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <InputRightAddon
                    bg={"plum.500"}
                    fontWeight={"bold"}
                    w={"75px"}
                  >
                    <Text>{`${nativeToken}`}</Text>
                  </InputRightAddon>
                </InputGroup>
              )}
            />
            <FormHelperText textColor={"primary.400"} w={"100%"}>
              {!balanceLoading
                ? `${parseFloat(balance?.formatted!).toFixed(2)} ${
                    balance?.symbol
                  } to fund`
                : "Loading"}
            </FormHelperText>
          </Flex>
        </Flex>
      </FormControl>
      <ButtonGroup marginTop={"1em"} justifyContent="space-around" w="100%">
        <Button isLoading={isSubmitting} type="reset" onClick={() => reset()}>
          Reset
        </Button>
        <Spacer />
        <Button isLoading={isSubmitting} type="submit">
          Create Workstream
        </Button>
      </ButtonGroup>
    </form>
  );

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<AddIcon />}
        maxW={"320px"}
        margin={"auto"}
      >
        Add Workstream
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="plum.900" />
        <ModalContent bg="plum.700" p={"1em"}>
          <ModalHeader>Add Workstream</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{input}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WorkstreamModal;
