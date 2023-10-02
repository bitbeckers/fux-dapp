import {
  FormHelperText,
  Tooltip,
  InputGroup,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputRightAddon,
  Box,
  NumberInput,
  Text,
} from "@chakra-ui/react";
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { RiInformationLine } from "react-icons/ri";

const ControlledNumberInput: React.FC<{
  fieldName: string;
  placeholder?: string;
  helperText?: string;
  tooltipText?: string;
  units?: string;
  precision?: number;
  step?: number;
  min?: number;
  max?: number;
  config?: RegisterOptions<FieldValues, string>;
}> = ({
  fieldName,
  placeholder = "0",
  helperText,
  tooltipText,
  units,
  precision = 1,
  step = 0.5,
  min = 0,
  max = 100,
  config,
}) => {
  const form = useFormContext();

  const {
    control,
    formState: { errors },
  } = form;

  return (
    <Controller
      name={fieldName}
      control={control}
      rules={config}
      key={fieldName}
      render={({ field: { ref, onChange, ...restField } }) => (
        <Box>
          {helperText && tooltipText && (
            <FormHelperText textColor={"white"} w={"100%"} display={"flex"}>
              {helperText}
              <Tooltip label={tooltipText}>
                <Box ml={2}>
                  <RiInformationLine />
                </Box>
              </Tooltip>
            </FormHelperText>
          )}
          <InputGroup>
            <NumberInput
              precision={precision}
              step={step}
              min={min}
              max={max}
              onChange={(valueAsString) => {
                onChange(
                  valueAsString
                    ? Math.round(Number(valueAsString.replace(/\D/g, "")))
                    : 0
                );
              }}
              {...restField}
            >
              <NumberInputField
                ref={ref}
                name={restField.name}
                borderRightRadius={units ? 0 : "base"}
                placeholder={placeholder}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {units && (
              <InputRightAddon bg={"#8E4EC6"} fontWeight={"bold"}>
                {units}
              </InputRightAddon>
            )}
          </InputGroup>
          {errors[fieldName] && (
            <Text color="red.500" fontSize="sm">
              {`${fieldName} is required`}
            </Text>
          )}
        </Box>
      )}
    />
  );
};

export { ControlledNumberInput };
