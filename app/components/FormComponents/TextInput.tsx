import { Box, FormHelperText, Input, Tooltip, Text } from "@chakra-ui/react";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import { RiInformationLine } from "react-icons/ri";

const TextInput: React.FC<{
  fieldName: string;
  label: string;
  placeholder: string;
  tooltipText?: string;
  config?: RegisterOptions<FieldValues, string>;
}> = ({ fieldName, label, placeholder, tooltipText, config }) => {
  const form = useFormContext();
  const field = form.register(fieldName, config);
  const {
    formState: { errors },
  } = form;

  return (
    <>
      <FormHelperText
        textColor={"white"}
        mb={"1em"}
        display={"flex"}
        alignItems={"center"}
      >
        {label}
        <Tooltip label={tooltipText}>
          <Box ml={2}>
            <RiInformationLine />
          </Box>
        </Tooltip>
      </FormHelperText>
      <Input id={fieldName} mb={"1em"} placeholder={placeholder} {...field} />
      {errors[fieldName] && (
        <Text color="red.500" fontSize="sm">
          {`${fieldName} is required`}
        </Text>
      )}
    </>
  );
};

export { TextInput };
