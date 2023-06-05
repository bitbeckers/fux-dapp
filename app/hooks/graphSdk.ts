import { getBuiltGraphSDK } from "../.graphclient";

export const useGraphClient = () => {
  const sdk = getBuiltGraphSDK();

  return { sdk };
};
