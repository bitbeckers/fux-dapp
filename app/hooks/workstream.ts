import { useWallet } from "@raidguild/quiver";
import React, { useEffect, useState } from "react";

export const useWorkstreams = () => {
  const { address, isConnected } = useWallet();
  const [workstreams, setWorkstreams] = useState<Partial<Workstream>[]>();

  useEffect(() => {
    if (isConnected && address) {
      const workstreams = getWorkstreamForUser(address);

      setWorkstreams(workstreams);
    }
  }, [isConnected, address]);

  const getWorkstreamForUser = (
    accountAddress: string
  ): Partial<Workstream>[] => {
    return [];
  };

  const addWorkstream = (workstream: Partial<Workstream>) => {
    setWorkstreams(workstreams ? workstreams.concat(workstream) : [workstream]);
  };

  return {
    workstreams,
    addWorkstream,
  };
};
