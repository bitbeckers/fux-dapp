import { useWallet } from "@raidguild/quiver";
import React, { createContext, useContext, useEffect, useState } from "react";

type FuxContextType = {
  currentUser: Partial<User>;
  claimFux: () => void;
  addWorkstream: (workstream: Partial<Workstream>) => void;
};

export const FuxContext = createContext<FuxContextType>({
  currentUser: {},
  claimFux: () => undefined,
  addWorkstream: (_workstream: Partial<Workstream>) => undefined,
});

interface FuxProps {
  children: any;
}

const FuxContextProvider: React.FC<FuxProps> = ({ children }: FuxProps) => {
  const [currentUser, setCurrentUser] = useState<Partial<User>>({});
  const { address, isConnected } = useWallet();

  useEffect(() => {
    if (isConnected && address) {
      const user: Partial<User> = createFuxUser(address);

      setCurrentUser(user);
    }
  }, [isConnected, address]);

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

  const addWorkstream = (workstream: Partial<Workstream>) => {
    const newWorkstreams = currentUser?.workstreams
      ? [...currentUser.workstreams, workstream]
      : [workstream];

    setCurrentUser((currentUser) => ({
      ...currentUser,
      workstreams: newWorkstreams,
    }));
  };

  return (
    <FuxContext.Provider value={{ currentUser, claimFux, addWorkstream }}>
      {children}
    </FuxContext.Provider>
  );
};

const useFux = (): FuxContextType => useContext(FuxContext);

export { FuxContextProvider, useFux };
