import { UserDocument } from "../../../.graphclient";
import { useMintWorkstream } from "../../../hooks/workstream";
import { useConstants } from "../../../utils/constants";
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
import { useWallet } from "@raidguild/quiver";
import { BigNumber, ethers } from "ethers";
import { DateTime } from "luxon";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "urql";

type FormData = {
  name: string;
  duration: string;
  funding: number;
  fuxGiven: number;
};

const WorkstreamModal: React.FC<{ onCloseAction: () => void }> = ({
  onCloseAction,
}) => {
  const { provider, address: user } = useWallet();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const addWorkstream = useMintWorkstream();
  const { nativeToken } = useConstants();

  const [result, reexecuteQuery] = useQuery({
    query: UserDocument,
    variables: {
      address: user?.toLowerCase() || "",
    },
  });

  const { data, fetching, error } = result;

  const fuxBalance = data?.user?.balances?.find(
    (balance) => balance.token.name === "FUX"
  )?.balance;

  const [ethBalance, setEthBalance] = useState(BigNumber.from(0));

  useEffect(() => {
    if (!user) return;
    if (!provider) return;

    const getEthBalance = async (user: string) => {
      const balance = await provider.getBalance(user); // can also set a custom address
      setEthBalance(balance);
    };
    getEthBalance(user); // can be a custom address
  }, [provider, user]);

  const {
    handleSubmit,
    register,
    reset,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      duration: "7",
      funding: 0,
      fuxGiven: fuxBalance,
    },
  });

  const handleOnClose = () => {
    onClose();
    onCloseAction();
  };

  const onSubmit = (form: FormData) => {
    const funding = ethers.utils.parseEther(form.funding.toString()).toString();
    // Mint workstream
    const deadline = Number(
      DateTime.fromISO(form.duration).endOf("day").toSeconds().toFixed()
    );

    const _fuxGiven = form.fuxGiven;
    if (user) {
      addWorkstream(
        form.name,
        [user],
        _fuxGiven,
        deadline,
        funding
      ).then(handleOnClose);
    }
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
              render={({ field: { ref, onChange, ...restField } }) => (
                <>
                  <FormHelperText textColor={"white"} w={"100%"}>
                    How many FUX do you give?
                  </FormHelperText>
                  <InputGroup>
                    <NumberInput
                      precision={0}
                      step={1}
                      onChange={onChange}
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
                  <FormHelperText textColor={"white"} w={"100%"}>
                    {`${fuxBalance} FUX to give`}
                  </FormHelperText>
                </>
              )}
            />

            <Controller
              name={`funding`}
              control={control}
              rules={{ required: true }}
              key={`funding`}
              render={({ field: { ref, onChange, ...restField } }) => (
                <>
                  <FormHelperText textColor={"white"} w={"100%"}>
                    Fund workstream
                  </FormHelperText>
                  <InputGroup>
                    <NumberInput
                      precision={2}
                      step={0.05}
                      onChange={onChange}
                      min={0}
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
                  <FormHelperText textColor={"white"} w={"100%"}>
                    {`Balance: ${parseFloat(
                      ethers.utils.formatEther(ethBalance)
                    ).toFixed(2)} ${nativeToken}`}
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
