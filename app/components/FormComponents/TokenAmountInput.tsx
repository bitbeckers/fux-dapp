import { useConstants } from "../../utils/constants";
import {
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputRightAddon,
  Text,
  InputGroup,
} from "@chakra-ui/react";
import { BigNumberish, ethers } from "ethers";
import { Controller, useFormContext } from "react-hook-form";

const TokenAmountInput: React.FC<{
  fieldName: string;
  native: boolean;
  name?: string;
  decimals?: BigNumberish;
  symbol?: string;
}> = ({ fieldName, name = "Unknown", native, decimals, symbol = "N/A" }) => {
  const form = useFormContext();
  const { nativeToken } = useConstants();
  const { control } = form;

  const parseFundingAmount = (value: string) => {
    if (!native) {
      return ethers.utils.parseUnits(value, decimals);
    }
    return ethers.utils.parseEther(value);
  };

  const formatFundingAmount = (value: BigNumberish) => {
    if (!native) {
      return ethers.utils.formatUnits(value, decimals);
    }
    return ethers.utils.formatEther(value);
  };

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={{ required: false }}
      key={fieldName}
      render={({ field: { ref, value, onChange, ...restField } }) => (
        <Flex direction={"row"} gap={2}>
          <Text>{native ? nativeToken.name : name}</Text>

          <InputGroup>
            <NumberInput
              precision={2}
              step={0.05}
              min={0}
              onChange={(valueString) => {
                onChange(valueString ? parseFundingAmount(valueString) : "0");
              }}
              value={formatFundingAmount(value)}
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
              {native ? nativeToken.symbol : symbol}
            </InputRightAddon>
          </InputGroup>
        </Flex>
      )}
    />
  );
};

export { TokenAmountInput };
