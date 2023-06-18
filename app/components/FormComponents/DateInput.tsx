import { Flex, FormHelperText, Tooltip, Input, Box } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { RiInformationLine } from "react-icons/ri";

const DateInput: React.FC<{
  fieldName: string;
  label: string;
  toolTipText: string;
}> = ({ fieldName, label, toolTipText }) => {
  const form = useFormContext();

  const field = form.register(fieldName, {
    required: "This is required",
    minLength: {
      value: 1,
      message: "Minimum length should be 1",
    },
  });

  return (
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

      <Input id={fieldName} type="date" {...field} />
    </Flex>
  );
};

export { DateInput };
