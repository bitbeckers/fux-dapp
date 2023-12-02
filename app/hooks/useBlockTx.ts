import { useCustomToasts } from "./useCustomToasts";
import { useChainId } from "wagmi";

export const useBlockTx = () => {
  const toast = useCustomToasts();
  const chainId = useChainId();

  const checkChain = () => {
    console.log("chainId", chainId);
    if (chainId !== 5) {
      toast.error(new Error(`Connected to unsupported chain: ${chainId}`));
      return false;
    }
    return true;
  };

  return { checkChain };
};
