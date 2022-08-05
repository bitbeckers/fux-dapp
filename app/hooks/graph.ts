import { useQuery, gql } from "@apollo/client";

type WorkstreamResponse = {
  id: string;
  contributors: Partial<WorkstreamContributor>[];
};

const GET_WORKSTREAM_BY_ID = gql`
  query Workstream($id: String!) {
    workstream(id: $id) {
      id
      name
      deadline
      contributors {
        id
        allocation
      }
    }
  }
`;

export const useWorkstream = (id: string) => {
  const { loading, error, data } = useQuery<{ workstream: WorkstreamResponse }>(
    GET_WORKSTREAM_BY_ID,
    { variables: { id } }
  );

  const _workstream: Partial<Workstream> = {
    id,
    deadline: 1661076835,
    contributors: [
      {
        address: "contributor 1",
        allocation: 20,
      },
      {
        address: "contributor 2",
        allocation: 40,
      },
      {
        address: "contributor 3",
        allocation: 80,
      },
    ],
  };

  return { loading, workstream: _workstream };
};
