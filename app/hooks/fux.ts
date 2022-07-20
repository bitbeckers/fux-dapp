import { useWorkstreams } from "./workstream";
import { useWallet } from "@raidguild/quiver";
import { useState, useEffect } from "react";

export const useFux = () => {
  const [currentUser, setCurrentUser] = useState<Partial<User>>();
  const { address, isConnected } = useWallet();
  const { workstreams } = useWorkstreams();

  useEffect(() => {
    if (isConnected && address) {
      const user: Partial<User> = createFuxUser(address);

      setCurrentUser(user);
    }
  }, [isConnected, address]);

  useEffect(() => {
    if (currentUser && workstreams) {
      setCurrentUser({ ...currentUser, workstreams: workstreams });
    }
  }, [currentUser, workstreams]);

  const createFuxUser = (accountAddress: string): Partial<User> => {
    return {
      address: accountAddress,
    };
  };

  const claimFux = () => {
    setCurrentUser({
      ...currentUser,
      fux: { available: 100, total: 100 },
      vFuxBalance: 0,
    });
  };

  return {
    currentUser,
    claimFux,
  };
};
