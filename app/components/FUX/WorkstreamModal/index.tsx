import { UserDocument } from "../../../.graphclient";
import { useCustomToasts } from "../../../hooks/toast";
import {
  contractABI,
  contractAddresses,
  useConstants,
} from "../../../utils/constants";
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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  HStack,
  VStack,
  FormHelperText,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { DateTime } from "luxon";
import { Controller, useForm } from "react-hook-form";
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
  const { address, isConnected } = useAccount();
  const { error: errorToast, success: successToast } = useCustomToasts();

  const {
    getValues,
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
    },
  });

  const name = watch("name");
  const fuxGiven = watch("fuxGiven");
  const funding = watch("funding");
  const duration = watch("duration");

  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "mintWorkstream",
    args: [
      name,
      [address],
      fuxGiven,
      DateTime.fromISO(duration).endOf("day").toSeconds().toFixed(),
    ],
    overrides: {
      value: ethers.utils.parseEther(funding.toString()),
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
  )?.balance;

  const onSubmit = () => {
    write?.();
    onClose();
    onCloseAction();
  };

  const input = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormHelperText textColor={"white"} mb={"1em"}>
          Name
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
        <HStack align={"flex-start"}>
          <VStack justify={"flex-start"}>
            <FormHelperText textColor={"white"} w={"100%"}>
              Deadline
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
          </VStack>

          <VStack>
            <Controller
              name={`fuxGiven`}
              control={control}
              rules={{ required: true }}
              key={`fuxGiven`}
              render={({ field: { ref, ...restField } }) => (
                <>
                  <FormHelperText textColor={"white"} w={"100%"}>
                    How many FUX do you give?
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
                        {...register("fuxGiven")}
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
                  <FormHelperText textColor={"white"} w={"100%"}>
                    {`${fuxBalance} FUX to give`}
                  </FormHelperText>
                </>
              )}
            />

            <Controller
              name={`funding`}
              control={control}
              rules={{ required: false }}
              key={`funding`}
              render={({ field: { ...restField } }) => (
                <>
                  <FormHelperText textColor={"white"} w={"100%"}>
                    Fund workstream
                  </FormHelperText>
                  <InputGroup>
                    <NumberInput
                      precision={2}
                      step={0.05}
                      min={0}
                      {...restField}
                    >
                      <NumberInputField
                        {...register("funding")}
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
                  <FormHelperText textColor={"white"} w={"100%"}>
                    {!balanceLoading
                      ? `${parseFloat(balance?.formatted!).toFixed(2)} ${
                          balance?.symbol
                        } to fund`
                      : "Loading"}
                  </FormHelperText>
                </>
              )}
            />
          </VStack>
        </HStack>
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
