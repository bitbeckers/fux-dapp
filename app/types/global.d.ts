type StakeResponse = {
  id: string;
  user: {
    id: string;
  };
  amount: string;
  created: string;
};

type User = {
  address: string;
  fux: { available: number; total: number };
  vFuxBalance: number;
  workstreams: Partial<Workstream>[];
};

type Fux = {
  workstreamId: number;
  name: string;
  status: "available" | "assigned" | "completed";
};

type Workstream = {
  id: number;
  name: string;
  source: string;
  allocation: number;
  publiclyVisible: boolean;
};
