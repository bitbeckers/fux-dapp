import { useFuxContract } from "../../hooks/contract";
import { useWallet } from "@raidguild/quiver";
import { id } from "ethers/lib/utils";
import React, { createContext, useContext, useEffect, useState } from "react";

type FuxContextType = {
  currentUser: Partial<User>;
  claimFux: () => void;
  addWorkstream: (workstream: Partial<Workstream>) => void;
  updateWorkstream: (workstream: Partial<Workstream>) => void;
};

export const FuxContext = createContext<FuxContextType>({
  currentUser: {},
  claimFux: () => undefined,
  addWorkstream: (_workstream: Partial<Workstream>) => undefined,
  updateWorkstream: (_workstream: Partial<Workstream>) => undefined,
});

interface FuxProps {
  children: any;
}

const FuxContextProvider: React.FC<FuxProps> = ({ children }: FuxProps) => {
  const [currentUser, setCurrentUser] = useState<Partial<User>>({});

  const { address, isConnected } = useWallet();
  const { mintFux, fuxBalance } = useFuxContract();

  useEffect(() => {
    const createFuxUser = (accountAddress: string): Partial<User> => {
      return {
        address: accountAddress,
        fux: {
          available: fuxBalance?.toNumber() || 0,
          total: fuxBalance?.toNumber() || 0,
        },
      };
    };

    if (isConnected && address) {
      const user: Partial<User> = createFuxUser(address);
      setCurrentUser(user);
    }
  }, [isConnected, address, fuxBalance]);

  const claimFux = async () => {
    if (currentUser) {
      await mintFux();
    }
  };

  const addWorkstream = (workstream: Partial<Workstream>) => {
    const workstreamId = id(workstream.toString());
    const workstreamWithID = { ...workstream, id: workstreamId };

    const newWorkstreams = currentUser?.workstreams
      ? [...currentUser.workstreams, workstreamWithID]
      : [workstreamWithID];

    setCurrentUser((currentUser) => ({
      ...currentUser,
      workstreams: newWorkstreams,
    }));
  };

  const updateWorkstream = (workstream: Partial<Workstream>) => {
    if (workstream?.id) {
      const newWorkstreams = currentUser?.workstreams?.map((ws) =>
        ws.id === workstream.id ? workstream : ws
      );

      if (newWorkstreams) {
        setCurrentUser((currentUser) => ({
          ...currentUser,
          workstreams: newWorkstreams,
        }));
      }

      return;
    }

    console.log("workstream requires ID");
  };

  console.log("Workstreams: ", currentUser.workstreams);

  return (
    <FuxContext.Provider
      value={{
        currentUser,
        claimFux,
        addWorkstream,
        updateWorkstream,
      }}
    >
      {children}
    </FuxContext.Provider>
  );
};

const useFux = (): FuxContextType => useContext(FuxContext);

export { FuxContextProvider, useFux };
