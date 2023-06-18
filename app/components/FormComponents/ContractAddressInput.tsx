import { Input } from "@chakra-ui/react";
import { ethers } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const ContractAddressInput: React.FC<{
  onChange: (e: { target: any; type?: any }) => void;
  name: string;
  placeholder: string;
}> = ({ onChange, name, placeholder }) => {
  const form = useFormContext();
  const field = form.register(name);
  const [input, setInput] = useState("");

  return (
    <Input
      width={"100%"}
      placeholder={placeholder}
      isInvalid={!isAddress(input)}
      {...field}
      onChange={(e) => {
        field.onChange(e);
        onChange(e);
        setInput(e.target.value);
      }}
    />
  );
};

export { ContractAddressInput };
