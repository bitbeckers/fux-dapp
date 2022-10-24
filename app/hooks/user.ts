import { formatAddress, useENS, useWallet } from "@raidguild/quiver";
import _ from "lodash";

export const useUserProfile = () => {
  const { address } = useWallet();
  const { ens, avatar, loading } = useENS({ address: address ?? "" });

  const displayName = (short: boolean = false) => {
    const addressString = short ? formatAddress(address) : address;
    return ens && !loading ? ens : addressString ? addressString : "N/A";
  };

  return { address, displayName, ens, avatar, loading };
};
