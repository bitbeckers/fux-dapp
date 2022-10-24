// type StakeResponse = {
//   id: string;
//   user: {
//     id: string;
//   };
//   amount: string;
//   created: string;
// };

// type User = {
//   address: string;
//   fux: { available: number; total: number };
//   vFuxBalance: number;
//   workstreams: Partial<Workstream>[];
// };

// type Fux = {
//   workstreamId: number;
//   name: string;
//   status: "available" | "assigned" | "completed";
// };

// type Workstream = {
//   id: string;
//   name: string;
//   publiclyVisible: boolean;
//   deadline: number;
//   contributors: Partial<WorkstreamContributor>[];
//   commitmentRatingSubmitted: boolean;
//   valueRatingSubmitted: boolean;
//   metadataUri: string;
//   reference: string;
// };

// interface WorkstreamContributor extends Omit<User, "workstreams"> {
//   allocation: number;
//   commitmentRating: number;
//   valueRating: number;
// }
