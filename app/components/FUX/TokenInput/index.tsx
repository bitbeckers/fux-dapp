import { TokenFragmentFragment } from "../../../.graphclient";
import { CopyIcon } from "@chakra-ui/icons";
import {
  HStack,
  Avatar,
  Text,
  Button,
  useToast,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { BigNumberish, ethers } from "ethers";
import { useEffect, useState } from "react";

// Flex box with token, name, symbol, and amount
// The box should have a link to the token on etherscan
// The symbol follows the amount
// One part is name + address
// The other part is amount + symbol
const TokenBalance: React.FC<{
  token: Partial<TokenFragmentFragment>;
  amount: BigNumberish;
  direction?: "row" | "column";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}> = ({ token, amount, direction, size }) => {
  const { id: address, name, symbol, tokenID } = token;

  const [copied, setCopied] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (copied) {
      toast({
        title: "Copied token address",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  }, []);

  const handleClick = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: `Copied address to clipboard`,
        status: "success",
      });
    }

    toast({
      title: `Token address not found`,
      status: "success",
    });
  };

  return (
    <Flex direction={direction} align="center">
      <Flex direction={"row"} gap={2}>
        <Button variant={"link"} size={size} onClick={() => handleClick()}>
          <Text mr={2}>{name ? name : `${address?.slice(0, 6)}...`}</Text>{" "}
          <CopyIcon />
        </Button>
      </Flex>
      <Flex direction={"row"} gap={2}>
        <Text>{ethers.utils.formatEther(amount)}</Text>
        <Text>{symbol}</Text>
      </Flex>
    </Flex>
  );
};

export default TokenBalance;
