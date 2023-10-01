import { Input, Tooltip, Flex, FormHelperText } from "@chakra-ui/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useEnsAddress, useEnsName } from "wagmi";

const UserAddressInput: React.FC<{
  fieldName: string;
  id: string;
}> = ({ fieldName, id }) => {
  const form = useFormContext();
  const field = form.register(fieldName);
  const [input, setInput] = useState("");

  const { data: ens } = useEnsName({
    address: input as `0x${string}`,
    chainId: 1,
    scopeKey: "wagmi",
  });

  const { data: address } = useEnsAddress({
    name: input,
    chainId: 1,
    scopeKey: "wagmi",
  });

  const handleChange = (e: any) => {
    field.onChange(e);
    setInput(e.target.value);
  };

  return (
    <>
      {ens ? (
        <Tooltip label={input}>
          <Input
            id={id}
            placeholder={"Contributor address 0x...."}
            {...field}
            onChange={handleChange}
            value={ens}
          />
        </Tooltip>
      ) : (
        <Flex dir={"column"} w={"100%"}>
          <Input
            id={id}
            placeholder={"Contributor address 0x...."}
            isInvalid={!ens && !address}
            {...field}
            onChange={handleChange}
            value={input}
          />
          {input && !ens && !address && (
            <FormHelperText textColor={"red.500"}>
              Invalid address or ENS name
            </FormHelperText>
          )}
        </Flex>
      )}
    </>
  );
};

export { UserAddressInput };
