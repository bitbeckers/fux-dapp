import { contractAddresses } from "../utils/constants";
import { useTypedContract } from "@raidguild/quiver";
import _ from "lodash";
import { FUX, FUX__factory } from "summon-evm";

export const useFuxContract = () => {
  const { contract } = useTypedContract<FUX>(
    contractAddresses.fuxContractAddress,
    FUX__factory
  );

  return contract;
};
