import {
  BalancesByUserDocument,
  BalancesByUserQueryVariables,
  BalancesByWorkstreamDocument,
  BalancesByWorkstreamQueryVariables,
  EvaluationsByWorkstreamIdDocument,
  EvaluationsByWorkstreamIdQueryVariables,
  UserByAddressDocument,
  UserByAddressQueryVariables,
  WorkstreamByIdDocument,
  WorkstreamByIdQueryVariables,
  WorkstreamsByContributorDocument,
  WorkstreamsByContributorQueryVariables,
} from "../__generated__/gql/graphql";
import { Client, cacheExchange, fetchExchange } from "@urql/core";
import { DocumentNode } from "graphql";

export const useGraphClient = () => {
  const graphclient = new Client({
    url: "https://api.thegraph.com/subgraphs/name/bitbeckers/fux-goerli",
    exchanges: [cacheExchange, fetchExchange],
  });

  const balancesByUser = async (user: string) => {
    const query = BalancesByUserDocument;
    const variables: BalancesByUserQueryVariables = { address: user };

    return await executeQuery(query, variables);
  };

  const balancesByWorksteam = async (worksteam: string) => {
    const query = BalancesByWorkstreamDocument;
    const variables: BalancesByWorkstreamQueryVariables = {
      workstreamID: worksteam,
    };

    return await executeQuery(query, variables);
  };

  const evaluationsByWorkstreamID = async (workstreamID: string) => {
    const query = EvaluationsByWorkstreamIdDocument;
    const variables: EvaluationsByWorkstreamIdQueryVariables = {
      workstreamID,
    };

    return await executeQuery(query, variables);
  };

  const workstreamById = async (workstreamID: string) => {
    const query = WorkstreamByIdDocument;
    const variables: WorkstreamByIdQueryVariables = {
      id: workstreamID,
    };

    return await executeQuery(query, variables);
  };

  const workstreamByContributor = async (address: string) => {
    const query = WorkstreamsByContributorDocument;
    const variables: WorkstreamsByContributorQueryVariables = {
      address,
    };

    return await executeQuery(query, variables);
  };

  const userByAddress = async (address: string) => {
    const query = UserByAddressDocument;
    const variables: UserByAddressQueryVariables = { address: address };

    return await executeQuery(query, variables);
  };

  const executeQuery = async (query: DocumentNode, variables: any) => {
    const result = await graphclient.query(query, variables);

    if (result.error) throw result.error;

    return result.data;
  };

  return {
    graphclient,
    balancesByUser,
    balancesByWorksteam,
    evaluationsByWorkstreamID,
    executeQuery,
    workstreamById,
    workstreamByContributor,
    userByAddress,
  };
};
