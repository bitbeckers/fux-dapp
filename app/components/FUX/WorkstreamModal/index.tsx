import { useBlockTx } from "../../../hooks/blockTx";
import { useGraphClient } from "../../../hooks/graphSdk";
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
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { BigNumber, BigNumberish, ethers } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { DateTime } from "luxon";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  BsCashStack,
  BsFillPersonPlusFill,
  BsFillPersonXFill,
  BsBackspaceFill,
} from "react-icons/bs";
import { RiInformationLine } from "react-icons/ri";
import { useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";

type FormData = {
  name: string;
  duration: string;
  coordinatorCommitment: number;
  contributors: { address: string }[];
  funding: { address: string; amount: BigNumberish; symbol?: string }[];
  metadataUri: string;
};

const WorkstreamModal: React.FC<{ onCloseAction?: () => void }> = ({
  onCloseAction,
}) => {
  const { address } = useAccount();
  const { error: errorToast, success: successToast } = useCustomToasts();
  const { sdk } = useGraphClient();
  const { checkChain } = useBlockTx();

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
      coordinatorCommitment: 0,
      contributors: [{ address: "" }],
      funding: [{ address: ethers.constants.AddressZero, amount: 0 }],
      metadataUri: "",
    },
  });

  const {
    fields: contributors,
    append: addContributor,
    remove: removeContributor,
  } = useFieldArray<FormData>({
    control,
    name: "contributors",
  });

  const {
    fields: funding,
    append: addFunding,
    remove: removeFunding,
  } = useFieldArray<FormData>({
    control,
    name: "funding",
  });

  const formState = watch();
  console.log(formState);

  const getNativeTokenAmount = () => {
    if (!formState.funding || formState.funding.length === 0)
      return BigNumber.from(0);

    let nativeToken = formState.funding?.filter(
      (token) => token.address === ethers.constants.AddressZero
    );

    if (!nativeToken || nativeToken.length === 0) return BigNumber.from(0);

    return BigNumber.from(nativeToken[0].amount.toString());
  };

  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "mintWorkstream",
    args: [
      formState.name,
      [
        ...formState.contributors
          .map((entry) => entry.address)
          .filter(
            (address) =>
              isAddress(address) && address != ethers.constants.AddressZero
          ),
        address,
      ],
      formState.coordinatorCommitment,
      DateTime.fromISO(formState.duration).endOf("day").toSeconds().toFixed(),
      [...formState.funding.map((token) => token.address)],
      [...formState.funding.map((token) => BigNumber.from(token.amount))],
      formState.metadataUri,
    ],
    overrides: {
      value: getNativeTokenAmount(),
    },
  });

  console.log(getNativeTokenAmount().toString());

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

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoading, data } = useQuery({
    queryKey: ["userByAddress", address],
    queryFn: () => sdk.UserByAddress({ address: address?.toLowerCase() }),
    enabled: !!address,
    refetchInterval: 5000,
  });

  const fuxBalance = data?.user?.balances?.find(
    (balance) => balance.token.name === "FUX"
  )?.amount;

  console.log(data);
  console.log(address);

  const onSubmit = () => {
    console.log("submitting");
    if (checkChain()) {
      write?.();
      onClose();
      onCloseAction?.();
    }
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
              name={`coordinatorCommitment`}
              control={control}
              rules={{ required: true }}
              key={`coordinatorCommitment`}
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
                          formState.coordinatorCommitment
                            ? fuxBalance - formState.coordinatorCommitment
                            : fuxBalance
                        } FUX to give`}
                      </StatNumber>
                    </Stat>
                  </StatGroup>
                </>
              )}
            />
          </Flex>
        </Flex>

        <Divider my={"0.5em"} />

        <Text>Add funding </Text>

        <>
          <FormHelperText textColor={"white"} w={"100%"} display={"flex"}>
            Fund workstream
            <Tooltip label="Funding will auto-split to contributors based on evaluation">
              <Box ml={2}>
                <RiInformationLine />
              </Box>
            </Tooltip>
          </FormHelperText>

          {funding.map((field, index) => (
            <InputGroup key={field.id} marginTop={"1em"}>
              <Grid
                templateAreas={`"address address address"
                                "name symbol amount"
                              `}
                gap={2}
              >
                <GridItem area={"address"}>
                  <Input
                    id="funding.address"
                    defaultValue={`${field.address}`}
                    isInvalid={!isAddress(formState.funding[index].address)}
                    {...register(`funding.${index}.address`)}
                  />
                </GridItem>

                <GridItem area={"name"}>
                  <Text>NAME</Text>
                </GridItem>

                <GridItem area={"symbol"}>
                  <Text>SYMBOL</Text>
                </GridItem>

                <GridItem area={"amount"}>
                  <Controller
                    name={`funding.${index}.amount`}
                    control={control}
                    rules={{ required: false }}
                    key={`funding[${index}]amount`}
                    render={({
                      field: { ref, value, onChange, ...restField },
                    }) => (
                      <Flex direction={"row"}>
                        <NumberInput
                          precision={2}
                          step={0.05}
                          min={0}
                          onChange={(valueString) => {
                            onChange(
                              valueString
                                ? ethers.utils.parseEther(valueString)
                                : "0"
                            );
                          }}
                          value={ethers.utils.formatEther(value)}
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
                        {index == funding.length - 1 ? (
                          <>
                            <Tooltip
                              hasArrow
                              label="Add another token"
                              aria-label="Add another token"
                            >
                              <IconButton
                                aria-label="Add another token"
                                onClick={() => {
                                  if (
                                    !isAddress(formState.funding[index].address)
                                  ) {
                                    errorToast({
                                      name: "Invalid address",
                                      message: `${formState.funding[index].address} is not valid`,
                                    });
                                    return;
                                  }
                                  addFunding({ address: "", amount: 0 });
                                }}
                                icon={<Icon as={BsCashStack} />}
                              />
                            </Tooltip>
                          </>
                        ) : (
                          <>
                            <Tooltip
                              hasArrow
                              label="Remove funding"
                              aria-label="Remove funding"
                            >
                              <IconButton
                                aria-label="remove funding"
                                background={"red.500"}
                                onClick={() => removeFunding(index)}
                                icon={<Icon as={BsBackspaceFill} />}
                              />
                            </Tooltip>
                          </>
                        )}
                      </Flex>
                    )}
                  />
                </GridItem>
              </Grid>
            </InputGroup>
          ))}
          <Divider my={"0.5em"} />
        </>

        <Text>Invite Contributors</Text>

        {contributors.map((field, index) => (
          <InputGroup key={field.id} marginTop={"1em"}>
            <Input
              id="contributors"
              defaultValue={`${field.address}`}
              isInvalid={!isAddress(formState.contributors[index].address)}
              {...register(`contributors.${index}.address`)}
            />
            {index == contributors.length - 1 ? (
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
                      addContributor({ address: "" });
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
                    onClick={() => removeContributor(index)}
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
