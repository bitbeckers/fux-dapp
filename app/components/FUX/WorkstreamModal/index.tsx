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
  FormHelperText,
  Flex,
  Stat,
  StatGroup,
  StatNumber,
  Icon,
  IconButton,
  InputRightElement,
  Divider,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { DateTime } from "luxon";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { BsFillPersonPlusFill, BsFillPersonXFill } from "react-icons/bs";
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
  contributors: { address: string }[];
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
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      duration: DateTime.now().plus({ day: 1 }).toISODate(),
      funding: 0,
      fuxGiven: 0,
      contributors: [{ address: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray<FormData>({
    control,
    name: "contributors",
  });

  const formState = watch();

  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "mintWorkstream",
    args: [
      formState.name,
      [
        ...formState.contributors
          .map((entry) => entry.address)
          .filter((address) => isAddress(address)),
        address,
      ],
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

  const amountToSpend = () => {
    let formatted = balance?.formatted ?? 0;
    let margin = Number(formatted) - formState.funding;

    return margin.toFixed(2);
  };

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
          placeholder="Name"
          {...register("name", {
            required: "This is required",
            minLength: { value: 4, message: "Minimum length should be 4" },
          })}
        />

        <Flex align={"flex-start"} gap={"1em"}>
          <Flex justify={"space-between"} direction={"column"}>
            <FormHelperText
              textColor={"white"}
              w={"100%"}
              display={"flex"}
              mb={"1em"}
            >
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

          <Flex justify={"space-between"} direction={"column"}>
            <Controller
              name={`fuxGiven`}
              control={control}
              rules={{ required: true }}
              key={`fuxGiven`}
              render={({ field: { ref, ...restField } }) => (
                <>
                  <FormHelperText
                    textColor={"white"}
                    w={"100%"}
                    display={"flex"}
                  >
                    How many FUX do you give?
                    <Tooltip label="Stake some FUX if you'll also be contributing">
                      <Box ml={2}>
                        <RiInformationLine />
                      </Box>
                    </Tooltip>
                  </FormHelperText>
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
                    <InputRightAddon bg={"#8E4EC6"} fontWeight={"bold"}>
                      <Text>FUX</Text>
                    </InputRightAddon>
                  </InputGroup>
                  <StatGroup>
                    <Stat>
                      <StatNumber
                        fontFamily="mono"
                        fontSize="xs"
                        fontWeight="100"
                        color={"#8e4ec6"}
                      >
                        {" "}
                        {`${
                          formState.fuxGiven
                            ? fuxBalance - formState.fuxGiven
                            : fuxBalance
                        } FUX to give`}
                      </StatNumber>
                    </Stat>
                  </StatGroup>
                </>
              )}
            />
            <Flex justify={"space-between"} direction={"column"}>
              <Controller
                name={`funding`}
                control={control}
                rules={{ required: false }}
                key={`funding`}
                render={({ field: { ref, ...restField } }) => (
                  <>
                    <FormHelperText
                      textColor={"white"}
                      w={"100%"}
                      display={"flex"}
                    >
                      Fund workstream
                      <Tooltip label="Funding will auto-split to contributors based on evaluation">
                        <Box ml={2}>
                          <RiInformationLine />
                        </Box>
                      </Tooltip>
                    </FormHelperText>
                    <InputGroup>
                      <NumberInput
                        precision={2}
                        step={0.05}
                        min={0}
                        max={Number(balance?.formatted)}
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
                      <InputRightAddon bg={"#8E4EC6"} fontWeight={"bold"}>
                        <Text>{`${nativeToken}`}</Text>
                      </InputRightAddon>
                    </InputGroup>
                    <StatGroup>
                      <Stat>
                        <StatNumber
                          fontFamily="mono"
                          fontSize="xs"
                          fontWeight="100"
                          color={"#8e4ec6"}
                        >
                          {!balanceLoading
                            ? `${amountToSpend()} ${balance?.symbol} to fund`
                            : "Loading"}
                        </StatNumber>
                      </Stat>
                    </StatGroup>
                  </>
                )}
              />
            </Flex>
          </Flex>
        </Flex>

        <Divider my={"0.5em"} />

        <Text>Invite Contributors</Text>

        {fields.map((field, index) => (
          <InputGroup key={field.id} marginTop={"1em"}>
            <Input
              id="contributors"
              defaultValue={`${field.address}`}
              isInvalid={!isAddress(formState.contributors[index].address)}
              {...register(`contributors.${index}.address`)}
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
                    onClick={() => {
                      if (!isAddress(formState.contributors[index].address)) {
                        errorToast({
                          name: "Invalid address",
                          message: `${formState.contributors[index].address} is not valid`,
                        });
                        return;
                      }
                      append({ address: "" });
                    }}
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
      <Button onClick={onOpen} leftIcon={<AddIcon />}>
        Add Workstream
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="#1D131D" />
        <ModalContent bg="#221527">
          <ModalHeader>Add Workstream</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{input}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WorkstreamModal;
