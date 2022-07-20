import { ERC20_Token, ERC20_Token__factory } from "../types/typechain";
import { contractAddresses } from "../utils/constants";
import { useToast } from "@chakra-ui/react";
import {
  useReadContract,
  useTokenBalance,
  useTypedContract,
  useWallet,
  useWriteContract,
} from "@raidguild/quiver";
import _ from "lodash";

const useTokenContract = () =>
  useTypedContract<ERC20_Token>(
    contractAddresses.erc20TokenAddress,
    ERC20_Token__factory
  );

export const useToken = () => {
  const { address } = useWallet();
  const { contract: token } = useTokenContract();
  const { mutate: approve } = useWriteContract(token, "approve");

  const { mutate: mintTokens } = useWriteContract(token, "mint");
  const { mutate: transferOwnership } = useWriteContract(
    token,
    "transferOwnership"
  );
  const { mutate: transferTokenTo } = useWriteContract(token, "transfer");

  const { response: owner } = useReadContract(token, "owner", []);

  const balance = useTokenBalance(token, address || "", 2000);

  return {
    balance: balance?.toString(),
    approve,
    mintTokens,
    transferOwnership,
    transferTokenTo,
    owner,
    token,
  };
};

export const useErrorToast = (error: any) => {
  const toast = useToast();
  toast({
    position: "bottom-left",
    title: `error toast`,
    status: "error",
    isClosable: true,
  });
};
