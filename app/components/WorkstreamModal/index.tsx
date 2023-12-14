import { useBlockTx } from "../../hooks/useBlockTx";
import { useCustomToasts } from "../../hooks/useCustomToasts";
import { useGraphClient } from "../../hooks/useGraphClient";
import { contractABI, contractAddresses } from "../../utils/constants";
import { ContractAddressInput } from "../FormComponents/ContractAddressInput";
import { ControlledNumberInput } from "../FormComponents/ControlledNumberInput";
import { DateInput } from "../FormComponents/DateInput";
import { TextInput } from "../FormComponents/TextInput";
import { TokenAmountInput } from "../FormComponents/TokenAmountInput";
import { UserAddressInput } from "../FormComponents/UserAddressInput";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  InputGroup,
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
  Switch,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { fetchEnsAddress } from "@wagmi/core";
import { DateTime } from "luxon";
import { useState, useEffect } from "react";
import { useFieldArray, useForm, FormProvider } from "react-hook-form";
import { BsFillPersonPlusFill, BsFillPersonXFill } from "react-icons/bs";
import { RiInformationLine } from "react-icons/ri";
import { isAddress } from "viem";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
} from "wagmi";

type FormData = {
  name: string;
  duration: string;
  coordinatorCommitment: number;
  contributors: { address: string }[];
  funding: {
    address: string;
    amount: bigint;
    symbol?: string;
    decimals?: number;
  };
  metadataUri: string;
};

const WorkstreamModal: React.FC<{ onCloseAction?: () => void }> = ({
  onCloseAction,
}) => {
  const { address } = useAccount();
  const { error: errorToast, success: successToast } = useCustomToasts();
  const { userByAddress } = useGraphClient();
  const { checkChain } = useBlockTx();
  const [erc20Token, setErc20Token] = useState<boolean>(false);
  const [erc20Info, setErc20Info] = useState<{
    address: string;
    name: string;
    symbol: string;
    decimals: number;
  }>({ address: "", name: "", symbol: "", decimals: 0 });
  const [contributorAddresses, setContributorAddresses] = useState<string[]>();

  const { data: name } = useContractRead({
    address: erc20Info.address as `0x${string}`,
    abi: contractABI.erc20,
    functionName: "name",
  });

  const { data: symbol } = useContractRead({
    address: erc20Info.address as `0x${string}`,
    abi: contractABI.erc20,
    functionName: "symbol",
  });

  const { data: decimals } = useContractRead({
    address: erc20Info.address as `0x${string}`,
    abi: contractABI.erc20,
    functionName: "decimals",
  });

  useEffect(() => {
    if (name && symbol && decimals) {
      setErc20Info({
        ...erc20Info,
        name: name as string,
        symbol: symbol as string,
        decimals: decimals as number,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, symbol, decimals]);

  const formMethods = useForm<FormData>({
    defaultValues: {
      name: "",
      duration: DateTime.now().plus({ day: 1 }).toISODate() || "",
      coordinatorCommitment: undefined,
      contributors: [{ address: "" }],
      funding: {
        address: "",
        amount: 0n,
        decimals: 18,
      },
      metadataUri: "",
    },
  });

  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = formMethods;

  const {
    fields: contributors,
    append: addContributor,
    remove: removeContributor,
  } = useFieldArray<FormData>({
    control,
    name: "contributors",
  });

  const formState = watch();
  console.log(formState);

  const contributorsArray = watch("contributors");

  useEffect(() => {
    const parsedAddresses = async () => {
      const addresses = await Promise.all(
        contributorsArray.map(async (contributor) => {
          if (isAddress(contributor.address)) {
            return contributor.address;
          }

          if (contributor.address.includes(".eth")) {
            const address = await fetchEnsAddress({
              chainId: 1,
              name: contributor.address,
            });
            if (address) return address;
          }
        })
      );

      setContributorAddresses(
        addresses
          .filter((address) => !!address)
          .map((address) => address as string)
      );
    };

    parsedAddresses();
  }, [contributorsArray]);

  const getNativeTokenAmount = () => {
    return !erc20Token ? formState.funding.amount : 0n;
  };

  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "mintWorkstream",
    args: [
      formState.name,
      contributorAddresses ? [address, ...contributorAddresses] : [address],
      formState.coordinatorCommitment,
      DateTime.fromISO(formState.duration).endOf("day").toSeconds().toFixed(),
      erc20Token ? [erc20Info.address] : [],
      erc20Token ? [formState.funding.amount] : [],
      formState.metadataUri,
    ],
    value: getNativeTokenAmount(),
  });

  const { data: tx, write } = useContractWrite({
    ...config,
    onError(e) {
      errorToast(e);
    },
    onSettled(data, error) {
      onClose();
      onCloseAction?.();
    },
    onSuccess(tx) {
      successToast(`Created workstream`, "");
      console.log(tx);
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data } = useQuery({
    queryKey: ["userByAddress", address],
    queryFn: () => userByAddress(address?.toLowerCase() || ""),
    enabled: !!address,
    refetchInterval: 5000,
  });

  const fuxBalance = data?.user?.balances?.find(
    (balance: any) => balance.token.name === "FUX"
  )?.amount;

  const onSubmit = () => {
    console.log("submitting");
    if (checkChain()) {
      console.log("writing");

      write?.();
    }
  };

  const handleNativeTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErc20Token(!erc20Token);
  };

  const handleAddressInput = (e: { target: any; type?: any }) => {
    setErc20Info({ ...erc20Info, address: e.target.value });
  };

  const FormButtons = ({ isSubmitting }: { isSubmitting: boolean }) => {
    return (
      <>
        <ButtonGroup marginTop={"1em"} justifyContent="space-around" w="100%">
          <Button isLoading={isSubmitting} type="reset" onClick={() => reset()}>
            Reset
          </Button>
          <Spacer />
          <Button isLoading={isSubmitting} type="submit">
            Create Workstream
          </Button>
        </ButtonGroup>
      </>
    );
  };
  const input = (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <TextInput
            fieldName={"name"}
            label={"Name"}
            placeholder={"Name your workstream"}
            tooltipText={"Name your workstream"}
            config={{ required: "Name is required" }}
          />

          <Flex align={"flex-start"} gap={"1em"}>
            <DateInput
              fieldName={"duration"}
              label={"Deadline"}
              toolTipText={
                "Just an estimated time of delivery as reference for contributors. It has no other effect, such as triggering evaluations."
              }
            />

            <Flex justify={"space-between"} direction={"column"}>
              {" "}
              <ControlledNumberInput
                fieldName="coordinatorCommitment"
                helperText="How many FUX do you give?"
                tooltipText="Stake some FUX if you'll also be contributin"
                max={fuxBalance}
                units="FUX"
                step={1}
                precision={0}
                min={0}
                config={{ required: "Your commitment is required", min: 0 }}
              />
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
            </Flex>
          </Flex>

          <Divider my={"0.5em"} />

          <Flex direction={"row"} gap={2}>
            <Text>Add funding </Text>
            <Tooltip label="Funding will auto-split to contributors based on evaluation">
              <Box ml={2}>
                <RiInformationLine />
              </Box>
            </Tooltip>
          </Flex>

          <Flex dir={"row"}>
            <FormHelperText textColor={"white"} w={"100%"} display={"flex"}>
              <Switch
                id="native-token"
                pr={"1em"}
                isChecked={erc20Token}
                onChange={handleNativeTokenChange}
              />
              Native token or ERC20?
            </FormHelperText>
          </Flex>

          <InputGroup key={"funding"} marginTop={"1em"}>
            <Grid
              templateAreas={`"address address address"
                                "input input input"
                              `}
              gap={4}
            >
              <GridItem area={"address"}>
                {erc20Token ? (
                  <ContractAddressInput
                    onChange={handleAddressInput}
                    name={"funding.address"}
                    placeholder="Contract address 0x...."
                  />
                ) : undefined}
              </GridItem>

              <GridItem area={"input"}>
                {erc20Token ? (
                  <TokenAmountInput
                    fieldName="funding.amount"
                    native={false}
                    name={name as string}
                    decimals={decimals as number}
                    symbol={symbol as string}
                  />
                ) : (
                  <TokenAmountInput fieldName="funding.amount" native={true} />
                )}
              </GridItem>
            </Grid>
          </InputGroup>

          <Divider my={"0.5em"} />

          <Text>Invite Contributors</Text>

          {contributors.map((field, index) => (
            <InputGroup key={field.id} marginTop={"1em"}>
              <UserAddressInput
                id="contributors"
                fieldName={`contributors.${index}.address`}
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
        <FormButtons isSubmitting={isSubmitting} />
      </form>
    </FormProvider>
  );

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<AddIcon />}
        borderRadius={0}
        fontWeight={300}
        fontSize={16}
        gap={2}
        paddingInline={4}
      >
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
