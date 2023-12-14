/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment EvaluationFragment on Evaluation {\n  contributor {\n    id\n  }\n  rating\n  creator {\n    id\n  }\n}": types.EvaluationFragmentFragmentDoc,
    "fragment TokenFragment on Token {\n  id\n  decimals\n  name\n  symbol\n  tokenID\n}": types.TokenFragmentFragmentDoc,
    "query BalancesByUser($address: ID = \"\") {\n  userBalances(where: {user_: {id: $address}}) {\n    amount\n    token {\n      ...TokenFragment\n    }\n  }\n}\n\nquery BalancesByWorkstream($workstreamID: ID = \"\") {\n  workstreams {\n    funding(where: {id: $workstreamID}) {\n      amount\n      token {\n        ...TokenFragment\n      }\n    }\n  }\n}": types.BalancesByUserDocument,
    "query EvaluationsByWorkstreamID($workstreamID: ID = \"\") {\n  evaluations {\n    ...EvaluationOverview\n  }\n}\n\nfragment EvaluationOverview on Evaluation {\n  id\n  rating\n  creator {\n    evaluations(where: {workstream_: {id: $workstreamID}}) {\n      ...EvaluationFragment\n    }\n    id\n    workstreams(where: {workstream_: {id: $workstreamID}}) {\n      id\n    }\n  }\n  contributor {\n    evaluations(where: {workstream_: {id: $workstreamID}}) {\n      ...EvaluationFragment\n    }\n    id\n  }\n}": types.EvaluationsByWorkstreamIdDocument,
    "query UserByAddress($address: ID = \"\") {\n  user(id: $address) {\n    ...UserFragment\n  }\n}\n\nfragment WorkstreamContributorFragment on WorkstreamContributor {\n  id\n  commitment\n  active\n}\n\nfragment UserBalanceFragment on UserBalance {\n  amount\n  id\n  token {\n    ...TokenFragment\n  }\n}\n\nfragment UserFragment on User {\n  balances {\n    ...UserBalanceFragment\n  }\n  fuxer\n  id\n  workstreams(where: {contributor_: {id: $address}}) {\n    ...WorkstreamContributorFragment\n  }\n}": types.UserByAddressDocument,
    "query WorkstreamsByContributor($address: ID = \"\") {\n  workstreamContributors(where: {contributor_: {id: $address}}) {\n    ...WorkstreamFragment\n  }\n}\n\nquery WorkstreamByID($id: ID = \"\") {\n  workstreamContributors(where: {workstream_: {id: $id}}) {\n    ...WorkstreamFragment\n  }\n}\n\nfragment RewardDistributionFragment on RewardDistribution {\n  contributors {\n    id\n  }\n  shares\n  id\n}\n\nfragment ContributorFragment on WorkstreamContributor {\n  commitment\n  active\n  contributor {\n    id\n  }\n}\n\nfragment WorkstreamFragment on WorkstreamContributor {\n  workstream {\n    id\n    name\n    coordinator {\n      id\n    }\n    contributors {\n      ...ContributorFragment\n    }\n    deadline\n    evaluations {\n      ...EvaluationFragment\n    }\n    funding {\n      amount\n      token {\n        ...TokenFragment\n      }\n    }\n    rewardDistribution {\n      ...RewardDistributionFragment\n    }\n    status\n    uri\n  }\n}": types.WorkstreamsByContributorDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment EvaluationFragment on Evaluation {\n  contributor {\n    id\n  }\n  rating\n  creator {\n    id\n  }\n}"): (typeof documents)["fragment EvaluationFragment on Evaluation {\n  contributor {\n    id\n  }\n  rating\n  creator {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment TokenFragment on Token {\n  id\n  decimals\n  name\n  symbol\n  tokenID\n}"): (typeof documents)["fragment TokenFragment on Token {\n  id\n  decimals\n  name\n  symbol\n  tokenID\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query BalancesByUser($address: ID = \"\") {\n  userBalances(where: {user_: {id: $address}}) {\n    amount\n    token {\n      ...TokenFragment\n    }\n  }\n}\n\nquery BalancesByWorkstream($workstreamID: ID = \"\") {\n  workstreams {\n    funding(where: {id: $workstreamID}) {\n      amount\n      token {\n        ...TokenFragment\n      }\n    }\n  }\n}"): (typeof documents)["query BalancesByUser($address: ID = \"\") {\n  userBalances(where: {user_: {id: $address}}) {\n    amount\n    token {\n      ...TokenFragment\n    }\n  }\n}\n\nquery BalancesByWorkstream($workstreamID: ID = \"\") {\n  workstreams {\n    funding(where: {id: $workstreamID}) {\n      amount\n      token {\n        ...TokenFragment\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query EvaluationsByWorkstreamID($workstreamID: ID = \"\") {\n  evaluations {\n    ...EvaluationOverview\n  }\n}\n\nfragment EvaluationOverview on Evaluation {\n  id\n  rating\n  creator {\n    evaluations(where: {workstream_: {id: $workstreamID}}) {\n      ...EvaluationFragment\n    }\n    id\n    workstreams(where: {workstream_: {id: $workstreamID}}) {\n      id\n    }\n  }\n  contributor {\n    evaluations(where: {workstream_: {id: $workstreamID}}) {\n      ...EvaluationFragment\n    }\n    id\n  }\n}"): (typeof documents)["query EvaluationsByWorkstreamID($workstreamID: ID = \"\") {\n  evaluations {\n    ...EvaluationOverview\n  }\n}\n\nfragment EvaluationOverview on Evaluation {\n  id\n  rating\n  creator {\n    evaluations(where: {workstream_: {id: $workstreamID}}) {\n      ...EvaluationFragment\n    }\n    id\n    workstreams(where: {workstream_: {id: $workstreamID}}) {\n      id\n    }\n  }\n  contributor {\n    evaluations(where: {workstream_: {id: $workstreamID}}) {\n      ...EvaluationFragment\n    }\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query UserByAddress($address: ID = \"\") {\n  user(id: $address) {\n    ...UserFragment\n  }\n}\n\nfragment WorkstreamContributorFragment on WorkstreamContributor {\n  id\n  commitment\n  active\n}\n\nfragment UserBalanceFragment on UserBalance {\n  amount\n  id\n  token {\n    ...TokenFragment\n  }\n}\n\nfragment UserFragment on User {\n  balances {\n    ...UserBalanceFragment\n  }\n  fuxer\n  id\n  workstreams(where: {contributor_: {id: $address}}) {\n    ...WorkstreamContributorFragment\n  }\n}"): (typeof documents)["query UserByAddress($address: ID = \"\") {\n  user(id: $address) {\n    ...UserFragment\n  }\n}\n\nfragment WorkstreamContributorFragment on WorkstreamContributor {\n  id\n  commitment\n  active\n}\n\nfragment UserBalanceFragment on UserBalance {\n  amount\n  id\n  token {\n    ...TokenFragment\n  }\n}\n\nfragment UserFragment on User {\n  balances {\n    ...UserBalanceFragment\n  }\n  fuxer\n  id\n  workstreams(where: {contributor_: {id: $address}}) {\n    ...WorkstreamContributorFragment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query WorkstreamsByContributor($address: ID = \"\") {\n  workstreamContributors(where: {contributor_: {id: $address}}) {\n    ...WorkstreamFragment\n  }\n}\n\nquery WorkstreamByID($id: ID = \"\") {\n  workstreamContributors(where: {workstream_: {id: $id}}) {\n    ...WorkstreamFragment\n  }\n}\n\nfragment RewardDistributionFragment on RewardDistribution {\n  contributors {\n    id\n  }\n  shares\n  id\n}\n\nfragment ContributorFragment on WorkstreamContributor {\n  commitment\n  active\n  contributor {\n    id\n  }\n}\n\nfragment WorkstreamFragment on WorkstreamContributor {\n  workstream {\n    id\n    name\n    coordinator {\n      id\n    }\n    contributors {\n      ...ContributorFragment\n    }\n    deadline\n    evaluations {\n      ...EvaluationFragment\n    }\n    funding {\n      amount\n      token {\n        ...TokenFragment\n      }\n    }\n    rewardDistribution {\n      ...RewardDistributionFragment\n    }\n    status\n    uri\n  }\n}"): (typeof documents)["query WorkstreamsByContributor($address: ID = \"\") {\n  workstreamContributors(where: {contributor_: {id: $address}}) {\n    ...WorkstreamFragment\n  }\n}\n\nquery WorkstreamByID($id: ID = \"\") {\n  workstreamContributors(where: {workstream_: {id: $id}}) {\n    ...WorkstreamFragment\n  }\n}\n\nfragment RewardDistributionFragment on RewardDistribution {\n  contributors {\n    id\n  }\n  shares\n  id\n}\n\nfragment ContributorFragment on WorkstreamContributor {\n  commitment\n  active\n  contributor {\n    id\n  }\n}\n\nfragment WorkstreamFragment on WorkstreamContributor {\n  workstream {\n    id\n    name\n    coordinator {\n      id\n    }\n    contributors {\n      ...ContributorFragment\n    }\n    deadline\n    evaluations {\n      ...EvaluationFragment\n    }\n    funding {\n      amount\n      token {\n        ...TokenFragment\n      }\n    }\n    rewardDistribution {\n      ...RewardDistributionFragment\n    }\n    status\n    uri\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;