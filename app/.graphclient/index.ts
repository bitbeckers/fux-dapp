// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import UsePollingLive from "@graphprotocol/client-polling-live";
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { FuxTypes } from './sources/fux/types';
import * as importedModule$0 from "./sources/fux/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  Int8: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Evaluation = {
  id: Scalars['ID'];
  creator: User;
  workstream: Workstream;
  contributor: User;
  rating: Scalars['BigInt'];
};

export type Evaluation_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  creator?: InputMaybe<Scalars['String']>;
  creator_not?: InputMaybe<Scalars['String']>;
  creator_gt?: InputMaybe<Scalars['String']>;
  creator_lt?: InputMaybe<Scalars['String']>;
  creator_gte?: InputMaybe<Scalars['String']>;
  creator_lte?: InputMaybe<Scalars['String']>;
  creator_in?: InputMaybe<Array<Scalars['String']>>;
  creator_not_in?: InputMaybe<Array<Scalars['String']>>;
  creator_contains?: InputMaybe<Scalars['String']>;
  creator_contains_nocase?: InputMaybe<Scalars['String']>;
  creator_not_contains?: InputMaybe<Scalars['String']>;
  creator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  creator_starts_with?: InputMaybe<Scalars['String']>;
  creator_starts_with_nocase?: InputMaybe<Scalars['String']>;
  creator_not_starts_with?: InputMaybe<Scalars['String']>;
  creator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  creator_ends_with?: InputMaybe<Scalars['String']>;
  creator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  creator_not_ends_with?: InputMaybe<Scalars['String']>;
  creator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  creator_?: InputMaybe<User_filter>;
  workstream?: InputMaybe<Scalars['String']>;
  workstream_not?: InputMaybe<Scalars['String']>;
  workstream_gt?: InputMaybe<Scalars['String']>;
  workstream_lt?: InputMaybe<Scalars['String']>;
  workstream_gte?: InputMaybe<Scalars['String']>;
  workstream_lte?: InputMaybe<Scalars['String']>;
  workstream_in?: InputMaybe<Array<Scalars['String']>>;
  workstream_not_in?: InputMaybe<Array<Scalars['String']>>;
  workstream_contains?: InputMaybe<Scalars['String']>;
  workstream_contains_nocase?: InputMaybe<Scalars['String']>;
  workstream_not_contains?: InputMaybe<Scalars['String']>;
  workstream_not_contains_nocase?: InputMaybe<Scalars['String']>;
  workstream_starts_with?: InputMaybe<Scalars['String']>;
  workstream_starts_with_nocase?: InputMaybe<Scalars['String']>;
  workstream_not_starts_with?: InputMaybe<Scalars['String']>;
  workstream_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  workstream_ends_with?: InputMaybe<Scalars['String']>;
  workstream_ends_with_nocase?: InputMaybe<Scalars['String']>;
  workstream_not_ends_with?: InputMaybe<Scalars['String']>;
  workstream_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  workstream_?: InputMaybe<Workstream_filter>;
  contributor?: InputMaybe<Scalars['String']>;
  contributor_not?: InputMaybe<Scalars['String']>;
  contributor_gt?: InputMaybe<Scalars['String']>;
  contributor_lt?: InputMaybe<Scalars['String']>;
  contributor_gte?: InputMaybe<Scalars['String']>;
  contributor_lte?: InputMaybe<Scalars['String']>;
  contributor_in?: InputMaybe<Array<Scalars['String']>>;
  contributor_not_in?: InputMaybe<Array<Scalars['String']>>;
  contributor_contains?: InputMaybe<Scalars['String']>;
  contributor_contains_nocase?: InputMaybe<Scalars['String']>;
  contributor_not_contains?: InputMaybe<Scalars['String']>;
  contributor_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contributor_starts_with?: InputMaybe<Scalars['String']>;
  contributor_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contributor_not_starts_with?: InputMaybe<Scalars['String']>;
  contributor_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contributor_ends_with?: InputMaybe<Scalars['String']>;
  contributor_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contributor_not_ends_with?: InputMaybe<Scalars['String']>;
  contributor_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contributor_?: InputMaybe<User_filter>;
  rating?: InputMaybe<Scalars['BigInt']>;
  rating_not?: InputMaybe<Scalars['BigInt']>;
  rating_gt?: InputMaybe<Scalars['BigInt']>;
  rating_lt?: InputMaybe<Scalars['BigInt']>;
  rating_gte?: InputMaybe<Scalars['BigInt']>;
  rating_lte?: InputMaybe<Scalars['BigInt']>;
  rating_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rating_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Evaluation_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Evaluation_filter>>>;
};

export type Evaluation_orderBy =
  | 'id'
  | 'creator'
  | 'creator__id'
  | 'creator__fuxer'
  | 'workstream'
  | 'workstream__id'
  | 'workstream__name'
  | 'workstream__deadline'
  | 'workstream__uri'
  | 'workstream__status'
  | 'contributor'
  | 'contributor__id'
  | 'contributor__fuxer'
  | 'rating';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  user?: Maybe<User>;
  users: Array<User>;
  workstream?: Maybe<Workstream>;
  workstreams: Array<Workstream>;
  rewardDistribution?: Maybe<RewardDistribution>;
  rewardDistributions: Array<RewardDistribution>;
  evaluation?: Maybe<Evaluation>;
  evaluations: Array<Evaluation>;
  workstreamContributor?: Maybe<WorkstreamContributor>;
  workstreamContributors: Array<WorkstreamContributor>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  userBalance?: Maybe<UserBalance>;
  userBalances: Array<UserBalance>;
  workstreamBalance?: Maybe<WorkstreamBalance>;
  workstreamBalances: Array<WorkstreamBalance>;
  workstreamContestation?: Maybe<WorkstreamContestation>;
  workstreamContestations: Array<WorkstreamContestation>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryuserArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryusersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryworkstreamArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryworkstreamsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Workstream_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Workstream_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrewardDistributionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrewardDistributionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RewardDistribution_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RewardDistribution_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryevaluationArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryevaluationsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Evaluation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Evaluation_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryworkstreamContributorArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryworkstreamContributorsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WorkstreamContributor_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WorkstreamContributor_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Token_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryuserBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryuserBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserBalance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UserBalance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryworkstreamBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryworkstreamBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WorkstreamBalance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WorkstreamBalance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryworkstreamContestationArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryworkstreamContestationsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WorkstreamContestation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WorkstreamContestation_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type RewardDistribution = {
  id: Scalars['ID'];
  workstream: Workstream;
  contributors: Array<User>;
  shares: Array<Scalars['BigInt']>;
};


export type RewardDistributioncontributorsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_filter>;
};

export type RewardDistribution_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  workstream?: InputMaybe<Scalars['String']>;
  workstream_not?: InputMaybe<Scalars['String']>;
  workstream_gt?: InputMaybe<Scalars['String']>;
  workstream_lt?: InputMaybe<Scalars['String']>;
  workstream_gte?: InputMaybe<Scalars['String']>;
  workstream_lte?: InputMaybe<Scalars['String']>;
  workstream_in?: InputMaybe<Array<Scalars['String']>>;
  workstream_not_in?: InputMaybe<Array<Scalars['String']>>;
  workstream_contains?: InputMaybe<Scalars['String']>;
  workstream_contains_nocase?: InputMaybe<Scalars['String']>;
  workstream_not_contains?: InputMaybe<Scalars['String']>;
  workstream_not_contains_nocase?: InputMaybe<Scalars['String']>;
  workstream_starts_with?: InputMaybe<Scalars['String']>;
  workstream_starts_with_nocase?: InputMaybe<Scalars['String']>;
  workstream_not_starts_with?: InputMaybe<Scalars['String']>;
  workstream_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  workstream_ends_with?: InputMaybe<Scalars['String']>;
  workstream_ends_with_nocase?: InputMaybe<Scalars['String']>;
  workstream_not_ends_with?: InputMaybe<Scalars['String']>;
  workstream_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  workstream_?: InputMaybe<Workstream_filter>;
  contributors?: InputMaybe<Array<Scalars['String']>>;
  contributors_not?: InputMaybe<Array<Scalars['String']>>;
  contributors_contains?: InputMaybe<Array<Scalars['String']>>;
  contributors_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  contributors_not_contains?: InputMaybe<Array<Scalars['String']>>;
  contributors_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  contributors_?: InputMaybe<User_filter>;
  shares?: InputMaybe<Array<Scalars['BigInt']>>;
  shares_not?: InputMaybe<Array<Scalars['BigInt']>>;
  shares_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  shares_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  shares_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  shares_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RewardDistribution_filter>>>;
  or?: InputMaybe<Array<InputMaybe<RewardDistribution_filter>>>;
};

export type RewardDistribution_orderBy =
  | 'id'
  | 'workstream'
  | 'workstream__id'
  | 'workstream__name'
  | 'workstream__deadline'
  | 'workstream__uri'
  | 'workstream__status'
  | 'contributors'
  | 'shares';

export type Subscription = {
  user?: Maybe<User>;
  users: Array<User>;
  workstream?: Maybe<Workstream>;
  workstreams: Array<Workstream>;
  rewardDistribution?: Maybe<RewardDistribution>;
  rewardDistributions: Array<RewardDistribution>;
  evaluation?: Maybe<Evaluation>;
  evaluations: Array<Evaluation>;
  workstreamContributor?: Maybe<WorkstreamContributor>;
  workstreamContributors: Array<WorkstreamContributor>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  userBalance?: Maybe<UserBalance>;
  userBalances: Array<UserBalance>;
  workstreamBalance?: Maybe<WorkstreamBalance>;
  workstreamBalances: Array<WorkstreamBalance>;
  workstreamContestation?: Maybe<WorkstreamContestation>;
  workstreamContestations: Array<WorkstreamContestation>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionuserArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionusersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionworkstreamArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionworkstreamsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Workstream_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Workstream_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrewardDistributionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrewardDistributionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RewardDistribution_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RewardDistribution_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionevaluationArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionevaluationsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Evaluation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Evaluation_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionworkstreamContributorArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionworkstreamContributorsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WorkstreamContributor_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WorkstreamContributor_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Token_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionuserBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionuserBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserBalance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UserBalance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionworkstreamBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionworkstreamBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WorkstreamBalance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WorkstreamBalance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionworkstreamContestationArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionworkstreamContestationsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WorkstreamContestation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WorkstreamContestation_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Token = {
  id: Scalars['ID'];
  tokenID?: Maybe<Scalars['BigInt']>;
  decimals?: Maybe<Scalars['BigInt']>;
  name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  userBalances?: Maybe<Array<UserBalance>>;
  workstreamBalance?: Maybe<Array<WorkstreamBalance>>;
};


export type TokenuserBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserBalance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UserBalance_filter>;
};


export type TokenworkstreamBalanceArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WorkstreamBalance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WorkstreamBalance_filter>;
};

export type Token_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  tokenID?: InputMaybe<Scalars['BigInt']>;
  tokenID_not?: InputMaybe<Scalars['BigInt']>;
  tokenID_gt?: InputMaybe<Scalars['BigInt']>;
  tokenID_lt?: InputMaybe<Scalars['BigInt']>;
  tokenID_gte?: InputMaybe<Scalars['BigInt']>;
  tokenID_lte?: InputMaybe<Scalars['BigInt']>;
  tokenID_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenID_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  decimals?: InputMaybe<Scalars['BigInt']>;
  decimals_not?: InputMaybe<Scalars['BigInt']>;
  decimals_gt?: InputMaybe<Scalars['BigInt']>;
  decimals_lt?: InputMaybe<Scalars['BigInt']>;
  decimals_gte?: InputMaybe<Scalars['BigInt']>;
  decimals_lte?: InputMaybe<Scalars['BigInt']>;
  decimals_in?: InputMaybe<Array<Scalars['BigInt']>>;
  decimals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  userBalances_?: InputMaybe<UserBalance_filter>;
  workstreamBalance_?: InputMaybe<WorkstreamBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Token_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Token_filter>>>;
};

export type Token_orderBy =
  | 'id'
  | 'tokenID'
  | 'decimals'
  | 'name'
  | 'symbol'
  | 'userBalances'
  | 'workstreamBalance';

export type User = {
  id: Scalars['ID'];
  fuxer: Scalars['Boolean'];
  balances?: Maybe<Array<UserBalance>>;
  workstreams?: Maybe<Array<WorkstreamContributor>>;
  evaluations?: Maybe<Array<Evaluation>>;
};


export type UserbalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserBalance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UserBalance_filter>;
};


export type UserworkstreamsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WorkstreamContributor_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WorkstreamContributor_filter>;
};


export type UserevaluationsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Evaluation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Evaluation_filter>;
};

export type UserBalance = {
  id: Scalars['ID'];
  user: User;
  token: Token;
  amount: Scalars['BigInt'];
};

export type UserBalance_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  user?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_contains_nocase?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_?: InputMaybe<User_filter>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<UserBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<UserBalance_filter>>>;
};

export type UserBalance_orderBy =
  | 'id'
  | 'user'
  | 'user__id'
  | 'user__fuxer'
  | 'token'
  | 'token__id'
  | 'token__tokenID'
  | 'token__decimals'
  | 'token__name'
  | 'token__symbol'
  | 'amount';

export type User_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  fuxer?: InputMaybe<Scalars['Boolean']>;
  fuxer_not?: InputMaybe<Scalars['Boolean']>;
  fuxer_in?: InputMaybe<Array<Scalars['Boolean']>>;
  fuxer_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  balances_?: InputMaybe<UserBalance_filter>;
  workstreams_?: InputMaybe<WorkstreamContributor_filter>;
  evaluations_?: InputMaybe<Evaluation_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<User_filter>>>;
  or?: InputMaybe<Array<InputMaybe<User_filter>>>;
};

export type User_orderBy =
  | 'id'
  | 'fuxer'
  | 'balances'
  | 'workstreams'
  | 'evaluations';

export type Workstream = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  coordinator?: Maybe<User>;
  deadline?: Maybe<Scalars['BigInt']>;
  contributors?: Maybe<Array<WorkstreamContributor>>;
  evaluations?: Maybe<Array<Evaluation>>;
  funding?: Maybe<Array<WorkstreamBalance>>;
  contestings?: Maybe<Array<WorkstreamContestation>>;
  rewardDistribution?: Maybe<RewardDistribution>;
  uri?: Maybe<Scalars['String']>;
  status?: Maybe<WorkstreamStatus>;
};


export type WorkstreamcontributorsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WorkstreamContributor_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WorkstreamContributor_filter>;
};


export type WorkstreamevaluationsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Evaluation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Evaluation_filter>;
};


export type WorkstreamfundingArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WorkstreamBalance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WorkstreamBalance_filter>;
};


export type WorkstreamcontestingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WorkstreamContestation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WorkstreamContestation_filter>;
};

export type WorkstreamBalance = {
  id: Scalars['ID'];
  workstream: Workstream;
  token: Token;
  amount: Scalars['BigInt'];
};

export type WorkstreamBalance_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  workstream?: InputMaybe<Scalars['String']>;
  workstream_not?: InputMaybe<Scalars['String']>;
  workstream_gt?: InputMaybe<Scalars['String']>;
  workstream_lt?: InputMaybe<Scalars['String']>;
  workstream_gte?: InputMaybe<Scalars['String']>;
  workstream_lte?: InputMaybe<Scalars['String']>;
  workstream_in?: InputMaybe<Array<Scalars['String']>>;
  workstream_not_in?: InputMaybe<Array<Scalars['String']>>;
  workstream_contains?: InputMaybe<Scalars['String']>;
  workstream_contains_nocase?: InputMaybe<Scalars['String']>;
  workstream_not_contains?: InputMaybe<Scalars['String']>;
  workstream_not_contains_nocase?: InputMaybe<Scalars['String']>;
  workstream_starts_with?: InputMaybe<Scalars['String']>;
  workstream_starts_with_nocase?: InputMaybe<Scalars['String']>;
  workstream_not_starts_with?: InputMaybe<Scalars['String']>;
  workstream_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  workstream_ends_with?: InputMaybe<Scalars['String']>;
  workstream_ends_with_nocase?: InputMaybe<Scalars['String']>;
  workstream_not_ends_with?: InputMaybe<Scalars['String']>;
  workstream_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  workstream_?: InputMaybe<Workstream_filter>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<WorkstreamBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<WorkstreamBalance_filter>>>;
};

export type WorkstreamBalance_orderBy =
  | 'id'
  | 'workstream'
  | 'workstream__id'
  | 'workstream__name'
  | 'workstream__deadline'
  | 'workstream__uri'
  | 'workstream__status'
  | 'token'
  | 'token__id'
  | 'token__tokenID'
  | 'token__decimals'
  | 'token__name'
  | 'token__symbol'
  | 'amount';

export type WorkstreamContestation = {
  id: Scalars['ID'];
  user: User;
  workstream: Workstream;
  uri: Scalars['String'];
};

export type WorkstreamContestation_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  user?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_contains_nocase?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_?: InputMaybe<User_filter>;
  workstream?: InputMaybe<Scalars['String']>;
  workstream_not?: InputMaybe<Scalars['String']>;
  workstream_gt?: InputMaybe<Scalars['String']>;
  workstream_lt?: InputMaybe<Scalars['String']>;
  workstream_gte?: InputMaybe<Scalars['String']>;
  workstream_lte?: InputMaybe<Scalars['String']>;
  workstream_in?: InputMaybe<Array<Scalars['String']>>;
  workstream_not_in?: InputMaybe<Array<Scalars['String']>>;
  workstream_contains?: InputMaybe<Scalars['String']>;
  workstream_contains_nocase?: InputMaybe<Scalars['String']>;
  workstream_not_contains?: InputMaybe<Scalars['String']>;
  workstream_not_contains_nocase?: InputMaybe<Scalars['String']>;
  workstream_starts_with?: InputMaybe<Scalars['String']>;
  workstream_starts_with_nocase?: InputMaybe<Scalars['String']>;
  workstream_not_starts_with?: InputMaybe<Scalars['String']>;
  workstream_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  workstream_ends_with?: InputMaybe<Scalars['String']>;
  workstream_ends_with_nocase?: InputMaybe<Scalars['String']>;
  workstream_not_ends_with?: InputMaybe<Scalars['String']>;
  workstream_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  workstream_?: InputMaybe<Workstream_filter>;
  uri?: InputMaybe<Scalars['String']>;
  uri_not?: InputMaybe<Scalars['String']>;
  uri_gt?: InputMaybe<Scalars['String']>;
  uri_lt?: InputMaybe<Scalars['String']>;
  uri_gte?: InputMaybe<Scalars['String']>;
  uri_lte?: InputMaybe<Scalars['String']>;
  uri_in?: InputMaybe<Array<Scalars['String']>>;
  uri_not_in?: InputMaybe<Array<Scalars['String']>>;
  uri_contains?: InputMaybe<Scalars['String']>;
  uri_contains_nocase?: InputMaybe<Scalars['String']>;
  uri_not_contains?: InputMaybe<Scalars['String']>;
  uri_not_contains_nocase?: InputMaybe<Scalars['String']>;
  uri_starts_with?: InputMaybe<Scalars['String']>;
  uri_starts_with_nocase?: InputMaybe<Scalars['String']>;
  uri_not_starts_with?: InputMaybe<Scalars['String']>;
  uri_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  uri_ends_with?: InputMaybe<Scalars['String']>;
  uri_ends_with_nocase?: InputMaybe<Scalars['String']>;
  uri_not_ends_with?: InputMaybe<Scalars['String']>;
  uri_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<WorkstreamContestation_filter>>>;
  or?: InputMaybe<Array<InputMaybe<WorkstreamContestation_filter>>>;
};

export type WorkstreamContestation_orderBy =
  | 'id'
  | 'user'
  | 'user__id'
  | 'user__fuxer'
  | 'workstream'
  | 'workstream__id'
  | 'workstream__name'
  | 'workstream__deadline'
  | 'workstream__uri'
  | 'workstream__status'
  | 'uri';

export type WorkstreamContributor = {
  id: Scalars['ID'];
  workstream: Workstream;
  contributor: User;
  commitment?: Maybe<Scalars['BigInt']>;
  active?: Maybe<Scalars['Boolean']>;
};

export type WorkstreamContributor_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  workstream?: InputMaybe<Scalars['String']>;
  workstream_not?: InputMaybe<Scalars['String']>;
  workstream_gt?: InputMaybe<Scalars['String']>;
  workstream_lt?: InputMaybe<Scalars['String']>;
  workstream_gte?: InputMaybe<Scalars['String']>;
  workstream_lte?: InputMaybe<Scalars['String']>;
  workstream_in?: InputMaybe<Array<Scalars['String']>>;
  workstream_not_in?: InputMaybe<Array<Scalars['String']>>;
  workstream_contains?: InputMaybe<Scalars['String']>;
  workstream_contains_nocase?: InputMaybe<Scalars['String']>;
  workstream_not_contains?: InputMaybe<Scalars['String']>;
  workstream_not_contains_nocase?: InputMaybe<Scalars['String']>;
  workstream_starts_with?: InputMaybe<Scalars['String']>;
  workstream_starts_with_nocase?: InputMaybe<Scalars['String']>;
  workstream_not_starts_with?: InputMaybe<Scalars['String']>;
  workstream_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  workstream_ends_with?: InputMaybe<Scalars['String']>;
  workstream_ends_with_nocase?: InputMaybe<Scalars['String']>;
  workstream_not_ends_with?: InputMaybe<Scalars['String']>;
  workstream_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  workstream_?: InputMaybe<Workstream_filter>;
  contributor?: InputMaybe<Scalars['String']>;
  contributor_not?: InputMaybe<Scalars['String']>;
  contributor_gt?: InputMaybe<Scalars['String']>;
  contributor_lt?: InputMaybe<Scalars['String']>;
  contributor_gte?: InputMaybe<Scalars['String']>;
  contributor_lte?: InputMaybe<Scalars['String']>;
  contributor_in?: InputMaybe<Array<Scalars['String']>>;
  contributor_not_in?: InputMaybe<Array<Scalars['String']>>;
  contributor_contains?: InputMaybe<Scalars['String']>;
  contributor_contains_nocase?: InputMaybe<Scalars['String']>;
  contributor_not_contains?: InputMaybe<Scalars['String']>;
  contributor_not_contains_nocase?: InputMaybe<Scalars['String']>;
  contributor_starts_with?: InputMaybe<Scalars['String']>;
  contributor_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contributor_not_starts_with?: InputMaybe<Scalars['String']>;
  contributor_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  contributor_ends_with?: InputMaybe<Scalars['String']>;
  contributor_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contributor_not_ends_with?: InputMaybe<Scalars['String']>;
  contributor_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  contributor_?: InputMaybe<User_filter>;
  commitment?: InputMaybe<Scalars['BigInt']>;
  commitment_not?: InputMaybe<Scalars['BigInt']>;
  commitment_gt?: InputMaybe<Scalars['BigInt']>;
  commitment_lt?: InputMaybe<Scalars['BigInt']>;
  commitment_gte?: InputMaybe<Scalars['BigInt']>;
  commitment_lte?: InputMaybe<Scalars['BigInt']>;
  commitment_in?: InputMaybe<Array<Scalars['BigInt']>>;
  commitment_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  active?: InputMaybe<Scalars['Boolean']>;
  active_not?: InputMaybe<Scalars['Boolean']>;
  active_in?: InputMaybe<Array<Scalars['Boolean']>>;
  active_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<WorkstreamContributor_filter>>>;
  or?: InputMaybe<Array<InputMaybe<WorkstreamContributor_filter>>>;
};

export type WorkstreamContributor_orderBy =
  | 'id'
  | 'workstream'
  | 'workstream__id'
  | 'workstream__name'
  | 'workstream__deadline'
  | 'workstream__uri'
  | 'workstream__status'
  | 'contributor'
  | 'contributor__id'
  | 'contributor__fuxer'
  | 'commitment'
  | 'active';

export type WorkstreamStatus =
  | 'Started'
  | 'Evaluation'
  | 'Closed';

export type Workstream_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_contains_nocase?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  coordinator?: InputMaybe<Scalars['String']>;
  coordinator_not?: InputMaybe<Scalars['String']>;
  coordinator_gt?: InputMaybe<Scalars['String']>;
  coordinator_lt?: InputMaybe<Scalars['String']>;
  coordinator_gte?: InputMaybe<Scalars['String']>;
  coordinator_lte?: InputMaybe<Scalars['String']>;
  coordinator_in?: InputMaybe<Array<Scalars['String']>>;
  coordinator_not_in?: InputMaybe<Array<Scalars['String']>>;
  coordinator_contains?: InputMaybe<Scalars['String']>;
  coordinator_contains_nocase?: InputMaybe<Scalars['String']>;
  coordinator_not_contains?: InputMaybe<Scalars['String']>;
  coordinator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  coordinator_starts_with?: InputMaybe<Scalars['String']>;
  coordinator_starts_with_nocase?: InputMaybe<Scalars['String']>;
  coordinator_not_starts_with?: InputMaybe<Scalars['String']>;
  coordinator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  coordinator_ends_with?: InputMaybe<Scalars['String']>;
  coordinator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  coordinator_not_ends_with?: InputMaybe<Scalars['String']>;
  coordinator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  coordinator_?: InputMaybe<User_filter>;
  deadline?: InputMaybe<Scalars['BigInt']>;
  deadline_not?: InputMaybe<Scalars['BigInt']>;
  deadline_gt?: InputMaybe<Scalars['BigInt']>;
  deadline_lt?: InputMaybe<Scalars['BigInt']>;
  deadline_gte?: InputMaybe<Scalars['BigInt']>;
  deadline_lte?: InputMaybe<Scalars['BigInt']>;
  deadline_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deadline_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  contributors_?: InputMaybe<WorkstreamContributor_filter>;
  evaluations_?: InputMaybe<Evaluation_filter>;
  funding_?: InputMaybe<WorkstreamBalance_filter>;
  contestings_?: InputMaybe<WorkstreamContestation_filter>;
  rewardDistribution?: InputMaybe<Scalars['String']>;
  rewardDistribution_not?: InputMaybe<Scalars['String']>;
  rewardDistribution_gt?: InputMaybe<Scalars['String']>;
  rewardDistribution_lt?: InputMaybe<Scalars['String']>;
  rewardDistribution_gte?: InputMaybe<Scalars['String']>;
  rewardDistribution_lte?: InputMaybe<Scalars['String']>;
  rewardDistribution_in?: InputMaybe<Array<Scalars['String']>>;
  rewardDistribution_not_in?: InputMaybe<Array<Scalars['String']>>;
  rewardDistribution_contains?: InputMaybe<Scalars['String']>;
  rewardDistribution_contains_nocase?: InputMaybe<Scalars['String']>;
  rewardDistribution_not_contains?: InputMaybe<Scalars['String']>;
  rewardDistribution_not_contains_nocase?: InputMaybe<Scalars['String']>;
  rewardDistribution_starts_with?: InputMaybe<Scalars['String']>;
  rewardDistribution_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rewardDistribution_not_starts_with?: InputMaybe<Scalars['String']>;
  rewardDistribution_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  rewardDistribution_ends_with?: InputMaybe<Scalars['String']>;
  rewardDistribution_ends_with_nocase?: InputMaybe<Scalars['String']>;
  rewardDistribution_not_ends_with?: InputMaybe<Scalars['String']>;
  rewardDistribution_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  rewardDistribution_?: InputMaybe<RewardDistribution_filter>;
  uri?: InputMaybe<Scalars['String']>;
  uri_not?: InputMaybe<Scalars['String']>;
  uri_gt?: InputMaybe<Scalars['String']>;
  uri_lt?: InputMaybe<Scalars['String']>;
  uri_gte?: InputMaybe<Scalars['String']>;
  uri_lte?: InputMaybe<Scalars['String']>;
  uri_in?: InputMaybe<Array<Scalars['String']>>;
  uri_not_in?: InputMaybe<Array<Scalars['String']>>;
  uri_contains?: InputMaybe<Scalars['String']>;
  uri_contains_nocase?: InputMaybe<Scalars['String']>;
  uri_not_contains?: InputMaybe<Scalars['String']>;
  uri_not_contains_nocase?: InputMaybe<Scalars['String']>;
  uri_starts_with?: InputMaybe<Scalars['String']>;
  uri_starts_with_nocase?: InputMaybe<Scalars['String']>;
  uri_not_starts_with?: InputMaybe<Scalars['String']>;
  uri_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  uri_ends_with?: InputMaybe<Scalars['String']>;
  uri_ends_with_nocase?: InputMaybe<Scalars['String']>;
  uri_not_ends_with?: InputMaybe<Scalars['String']>;
  uri_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<WorkstreamStatus>;
  status_not?: InputMaybe<WorkstreamStatus>;
  status_in?: InputMaybe<Array<WorkstreamStatus>>;
  status_not_in?: InputMaybe<Array<WorkstreamStatus>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Workstream_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Workstream_filter>>>;
};

export type Workstream_orderBy =
  | 'id'
  | 'name'
  | 'coordinator'
  | 'coordinator__id'
  | 'coordinator__fuxer'
  | 'deadline'
  | 'contributors'
  | 'evaluations'
  | 'funding'
  | 'contestings'
  | 'rewardDistribution'
  | 'rewardDistribution__id'
  | 'uri'
  | 'status';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Evaluation: ResolverTypeWrapper<Evaluation>;
  Evaluation_filter: Evaluation_filter;
  Evaluation_orderBy: Evaluation_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']>;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  RewardDistribution: ResolverTypeWrapper<RewardDistribution>;
  RewardDistribution_filter: RewardDistribution_filter;
  RewardDistribution_orderBy: RewardDistribution_orderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Token: ResolverTypeWrapper<Token>;
  Token_filter: Token_filter;
  Token_orderBy: Token_orderBy;
  User: ResolverTypeWrapper<User>;
  UserBalance: ResolverTypeWrapper<UserBalance>;
  UserBalance_filter: UserBalance_filter;
  UserBalance_orderBy: UserBalance_orderBy;
  User_filter: User_filter;
  User_orderBy: User_orderBy;
  Workstream: ResolverTypeWrapper<Workstream>;
  WorkstreamBalance: ResolverTypeWrapper<WorkstreamBalance>;
  WorkstreamBalance_filter: WorkstreamBalance_filter;
  WorkstreamBalance_orderBy: WorkstreamBalance_orderBy;
  WorkstreamContestation: ResolverTypeWrapper<WorkstreamContestation>;
  WorkstreamContestation_filter: WorkstreamContestation_filter;
  WorkstreamContestation_orderBy: WorkstreamContestation_orderBy;
  WorkstreamContributor: ResolverTypeWrapper<WorkstreamContributor>;
  WorkstreamContributor_filter: WorkstreamContributor_filter;
  WorkstreamContributor_orderBy: WorkstreamContributor_orderBy;
  WorkstreamStatus: WorkstreamStatus;
  Workstream_filter: Workstream_filter;
  Workstream_orderBy: Workstream_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  Evaluation: Evaluation;
  Evaluation_filter: Evaluation_filter;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Int8: Scalars['Int8'];
  Query: {};
  RewardDistribution: RewardDistribution;
  RewardDistribution_filter: RewardDistribution_filter;
  String: Scalars['String'];
  Subscription: {};
  Token: Token;
  Token_filter: Token_filter;
  User: User;
  UserBalance: UserBalance;
  UserBalance_filter: UserBalance_filter;
  User_filter: User_filter;
  Workstream: Workstream;
  WorkstreamBalance: WorkstreamBalance;
  WorkstreamBalance_filter: WorkstreamBalance_filter;
  WorkstreamContestation: WorkstreamContestation;
  WorkstreamContestation_filter: WorkstreamContestation_filter;
  WorkstreamContributor: WorkstreamContributor;
  WorkstreamContributor_filter: WorkstreamContributor_filter;
  Workstream_filter: Workstream_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type EvaluationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Evaluation'] = ResolversParentTypes['Evaluation']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  workstream?: Resolver<ResolversTypes['Workstream'], ParentType, ContextType>;
  contributor?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryuserArgs, 'id' | 'subgraphError'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryusersArgs, 'skip' | 'first' | 'subgraphError'>>;
  workstream?: Resolver<Maybe<ResolversTypes['Workstream']>, ParentType, ContextType, RequireFields<QueryworkstreamArgs, 'id' | 'subgraphError'>>;
  workstreams?: Resolver<Array<ResolversTypes['Workstream']>, ParentType, ContextType, RequireFields<QueryworkstreamsArgs, 'skip' | 'first' | 'subgraphError'>>;
  rewardDistribution?: Resolver<Maybe<ResolversTypes['RewardDistribution']>, ParentType, ContextType, RequireFields<QueryrewardDistributionArgs, 'id' | 'subgraphError'>>;
  rewardDistributions?: Resolver<Array<ResolversTypes['RewardDistribution']>, ParentType, ContextType, RequireFields<QueryrewardDistributionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  evaluation?: Resolver<Maybe<ResolversTypes['Evaluation']>, ParentType, ContextType, RequireFields<QueryevaluationArgs, 'id' | 'subgraphError'>>;
  evaluations?: Resolver<Array<ResolversTypes['Evaluation']>, ParentType, ContextType, RequireFields<QueryevaluationsArgs, 'skip' | 'first' | 'subgraphError'>>;
  workstreamContributor?: Resolver<Maybe<ResolversTypes['WorkstreamContributor']>, ParentType, ContextType, RequireFields<QueryworkstreamContributorArgs, 'id' | 'subgraphError'>>;
  workstreamContributors?: Resolver<Array<ResolversTypes['WorkstreamContributor']>, ParentType, ContextType, RequireFields<QueryworkstreamContributorsArgs, 'skip' | 'first' | 'subgraphError'>>;
  token?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QuerytokenArgs, 'id' | 'subgraphError'>>;
  tokens?: Resolver<Array<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QuerytokensArgs, 'skip' | 'first' | 'subgraphError'>>;
  userBalance?: Resolver<Maybe<ResolversTypes['UserBalance']>, ParentType, ContextType, RequireFields<QueryuserBalanceArgs, 'id' | 'subgraphError'>>;
  userBalances?: Resolver<Array<ResolversTypes['UserBalance']>, ParentType, ContextType, RequireFields<QueryuserBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  workstreamBalance?: Resolver<Maybe<ResolversTypes['WorkstreamBalance']>, ParentType, ContextType, RequireFields<QueryworkstreamBalanceArgs, 'id' | 'subgraphError'>>;
  workstreamBalances?: Resolver<Array<ResolversTypes['WorkstreamBalance']>, ParentType, ContextType, RequireFields<QueryworkstreamBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  workstreamContestation?: Resolver<Maybe<ResolversTypes['WorkstreamContestation']>, ParentType, ContextType, RequireFields<QueryworkstreamContestationArgs, 'id' | 'subgraphError'>>;
  workstreamContestations?: Resolver<Array<ResolversTypes['WorkstreamContestation']>, ParentType, ContextType, RequireFields<QueryworkstreamContestationsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type RewardDistributionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RewardDistribution'] = ResolversParentTypes['RewardDistribution']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  workstream?: Resolver<ResolversTypes['Workstream'], ParentType, ContextType>;
  contributors?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<RewardDistributioncontributorsArgs, 'skip' | 'first'>>;
  shares?: Resolver<Array<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  user?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "user", ParentType, ContextType, RequireFields<SubscriptionuserArgs, 'id' | 'subgraphError'>>;
  users?: SubscriptionResolver<Array<ResolversTypes['User']>, "users", ParentType, ContextType, RequireFields<SubscriptionusersArgs, 'skip' | 'first' | 'subgraphError'>>;
  workstream?: SubscriptionResolver<Maybe<ResolversTypes['Workstream']>, "workstream", ParentType, ContextType, RequireFields<SubscriptionworkstreamArgs, 'id' | 'subgraphError'>>;
  workstreams?: SubscriptionResolver<Array<ResolversTypes['Workstream']>, "workstreams", ParentType, ContextType, RequireFields<SubscriptionworkstreamsArgs, 'skip' | 'first' | 'subgraphError'>>;
  rewardDistribution?: SubscriptionResolver<Maybe<ResolversTypes['RewardDistribution']>, "rewardDistribution", ParentType, ContextType, RequireFields<SubscriptionrewardDistributionArgs, 'id' | 'subgraphError'>>;
  rewardDistributions?: SubscriptionResolver<Array<ResolversTypes['RewardDistribution']>, "rewardDistributions", ParentType, ContextType, RequireFields<SubscriptionrewardDistributionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  evaluation?: SubscriptionResolver<Maybe<ResolversTypes['Evaluation']>, "evaluation", ParentType, ContextType, RequireFields<SubscriptionevaluationArgs, 'id' | 'subgraphError'>>;
  evaluations?: SubscriptionResolver<Array<ResolversTypes['Evaluation']>, "evaluations", ParentType, ContextType, RequireFields<SubscriptionevaluationsArgs, 'skip' | 'first' | 'subgraphError'>>;
  workstreamContributor?: SubscriptionResolver<Maybe<ResolversTypes['WorkstreamContributor']>, "workstreamContributor", ParentType, ContextType, RequireFields<SubscriptionworkstreamContributorArgs, 'id' | 'subgraphError'>>;
  workstreamContributors?: SubscriptionResolver<Array<ResolversTypes['WorkstreamContributor']>, "workstreamContributors", ParentType, ContextType, RequireFields<SubscriptionworkstreamContributorsArgs, 'skip' | 'first' | 'subgraphError'>>;
  token?: SubscriptionResolver<Maybe<ResolversTypes['Token']>, "token", ParentType, ContextType, RequireFields<SubscriptiontokenArgs, 'id' | 'subgraphError'>>;
  tokens?: SubscriptionResolver<Array<ResolversTypes['Token']>, "tokens", ParentType, ContextType, RequireFields<SubscriptiontokensArgs, 'skip' | 'first' | 'subgraphError'>>;
  userBalance?: SubscriptionResolver<Maybe<ResolversTypes['UserBalance']>, "userBalance", ParentType, ContextType, RequireFields<SubscriptionuserBalanceArgs, 'id' | 'subgraphError'>>;
  userBalances?: SubscriptionResolver<Array<ResolversTypes['UserBalance']>, "userBalances", ParentType, ContextType, RequireFields<SubscriptionuserBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  workstreamBalance?: SubscriptionResolver<Maybe<ResolversTypes['WorkstreamBalance']>, "workstreamBalance", ParentType, ContextType, RequireFields<SubscriptionworkstreamBalanceArgs, 'id' | 'subgraphError'>>;
  workstreamBalances?: SubscriptionResolver<Array<ResolversTypes['WorkstreamBalance']>, "workstreamBalances", ParentType, ContextType, RequireFields<SubscriptionworkstreamBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  workstreamContestation?: SubscriptionResolver<Maybe<ResolversTypes['WorkstreamContestation']>, "workstreamContestation", ParentType, ContextType, RequireFields<SubscriptionworkstreamContestationArgs, 'id' | 'subgraphError'>>;
  workstreamContestations?: SubscriptionResolver<Array<ResolversTypes['WorkstreamContestation']>, "workstreamContestations", ParentType, ContextType, RequireFields<SubscriptionworkstreamContestationsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type TokenResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  tokenID?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  decimals?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userBalances?: Resolver<Maybe<Array<ResolversTypes['UserBalance']>>, ParentType, ContextType, RequireFields<TokenuserBalancesArgs, 'skip' | 'first'>>;
  workstreamBalance?: Resolver<Maybe<Array<ResolversTypes['WorkstreamBalance']>>, ParentType, ContextType, RequireFields<TokenworkstreamBalanceArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  fuxer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  balances?: Resolver<Maybe<Array<ResolversTypes['UserBalance']>>, ParentType, ContextType, RequireFields<UserbalancesArgs, 'skip' | 'first'>>;
  workstreams?: Resolver<Maybe<Array<ResolversTypes['WorkstreamContributor']>>, ParentType, ContextType, RequireFields<UserworkstreamsArgs, 'skip' | 'first'>>;
  evaluations?: Resolver<Maybe<Array<ResolversTypes['Evaluation']>>, ParentType, ContextType, RequireFields<UserevaluationsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserBalanceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UserBalance'] = ResolversParentTypes['UserBalance']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkstreamResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Workstream'] = ResolversParentTypes['Workstream']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coordinator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  deadline?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  contributors?: Resolver<Maybe<Array<ResolversTypes['WorkstreamContributor']>>, ParentType, ContextType, RequireFields<WorkstreamcontributorsArgs, 'skip' | 'first'>>;
  evaluations?: Resolver<Maybe<Array<ResolversTypes['Evaluation']>>, ParentType, ContextType, RequireFields<WorkstreamevaluationsArgs, 'skip' | 'first'>>;
  funding?: Resolver<Maybe<Array<ResolversTypes['WorkstreamBalance']>>, ParentType, ContextType, RequireFields<WorkstreamfundingArgs, 'skip' | 'first'>>;
  contestings?: Resolver<Maybe<Array<ResolversTypes['WorkstreamContestation']>>, ParentType, ContextType, RequireFields<WorkstreamcontestingsArgs, 'skip' | 'first'>>;
  rewardDistribution?: Resolver<Maybe<ResolversTypes['RewardDistribution']>, ParentType, ContextType>;
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['WorkstreamStatus']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkstreamBalanceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['WorkstreamBalance'] = ResolversParentTypes['WorkstreamBalance']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  workstream?: Resolver<ResolversTypes['Workstream'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkstreamContestationResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['WorkstreamContestation'] = ResolversParentTypes['WorkstreamContestation']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  workstream?: Resolver<ResolversTypes['Workstream'], ParentType, ContextType>;
  uri?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkstreamContributorResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['WorkstreamContributor'] = ResolversParentTypes['WorkstreamContributor']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  workstream?: Resolver<ResolversTypes['Workstream'], ParentType, ContextType>;
  contributor?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  commitment?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Evaluation?: EvaluationResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  RewardDistribution?: RewardDistributionResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserBalance?: UserBalanceResolvers<ContextType>;
  Workstream?: WorkstreamResolvers<ContextType>;
  WorkstreamBalance?: WorkstreamBalanceResolvers<ContextType>;
  WorkstreamContestation?: WorkstreamContestationResolvers<ContextType>;
  WorkstreamContributor?: WorkstreamContributorResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = FuxTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/fux/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const fuxTransforms = [];
const additionalTypeDefs = [] as any[];
const fuxHandler = new GraphqlHandler({
              name: "fux",
              config: {"endpoint":"https://api.thegraph.com/subgraphs/name/bitbeckers/fux-goerli"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("fux"),
              logger: logger.child("fux"),
              importFn,
            });
sources[0] = {
          name: 'fux',
          handler: fuxHandler,
          transforms: fuxTransforms
        }
additionalEnvelopPlugins[0] = await UsePollingLive({
          ...({
  "defaultInterval": 2000
}),
          logger: logger.child("pollingLive"),
          cache,
          pubsub,
          baseDir,
          importFn,
        })
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: BalancesByUserDocument,
        get rawSDL() {
          return printWithCache(BalancesByUserDocument);
        },
        location: 'BalancesByUserDocument.graphql'
      },{
        document: BalancesByWorkstreamDocument,
        get rawSDL() {
          return printWithCache(BalancesByWorkstreamDocument);
        },
        location: 'BalancesByWorkstreamDocument.graphql'
      },{
        document: EvaluationsByWorkstreamIdDocument,
        get rawSDL() {
          return printWithCache(EvaluationsByWorkstreamIdDocument);
        },
        location: 'EvaluationsByWorkstreamIdDocument.graphql'
      },{
        document: UserByAddressDocument,
        get rawSDL() {
          return printWithCache(UserByAddressDocument);
        },
        location: 'UserByAddressDocument.graphql'
      },{
        document: WorkstreamsByContributorDocument,
        get rawSDL() {
          return printWithCache(WorkstreamsByContributorDocument);
        },
        location: 'WorkstreamsByContributorDocument.graphql'
      },{
        document: WorkstreamByIdDocument,
        get rawSDL() {
          return printWithCache(WorkstreamByIdDocument);
        },
        location: 'WorkstreamByIdDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type EvaluationFragmentFragment = (
  Pick<Evaluation, 'rating'>
  & { contributor: Pick<User, 'id'>, creator: Pick<User, 'id'> }
);

export type TokenFragmentFragment = Pick<Token, 'id' | 'decimals' | 'name' | 'symbol' | 'tokenID'>;

export type BalancesByUserQueryVariables = Exact<{
  address?: InputMaybe<Scalars['ID']>;
}>;


export type BalancesByUserQuery = { userBalances: Array<(
    Pick<UserBalance, 'amount'>
    & { token: Pick<Token, 'id' | 'decimals' | 'name' | 'symbol' | 'tokenID'> }
  )> };

export type BalancesByWorkstreamQueryVariables = Exact<{
  workstreamID?: InputMaybe<Scalars['ID']>;
}>;


export type BalancesByWorkstreamQuery = { workstreams: Array<{ funding?: Maybe<Array<(
      Pick<WorkstreamBalance, 'amount'>
      & { token: Pick<Token, 'id' | 'decimals' | 'name' | 'symbol' | 'tokenID'> }
    )>> }> };

export type EvaluationsByWorkstreamIDQueryVariables = Exact<{
  workstreamID?: InputMaybe<Scalars['ID']>;
}>;


export type EvaluationsByWorkstreamIDQuery = { evaluations: Array<(
    Pick<Evaluation, 'id' | 'rating'>
    & { creator: (
      Pick<User, 'id'>
      & { evaluations?: Maybe<Array<(
        Pick<Evaluation, 'rating'>
        & { contributor: Pick<User, 'id'>, creator: Pick<User, 'id'> }
      )>>, workstreams?: Maybe<Array<Pick<WorkstreamContributor, 'id'>>> }
    ), contributor: (
      Pick<User, 'id'>
      & { evaluations?: Maybe<Array<(
        Pick<Evaluation, 'rating'>
        & { contributor: Pick<User, 'id'>, creator: Pick<User, 'id'> }
      )>> }
    ) }
  )> };

export type EvaluationOverviewFragment = (
  Pick<Evaluation, 'id' | 'rating'>
  & { creator: (
    Pick<User, 'id'>
    & { evaluations?: Maybe<Array<(
      Pick<Evaluation, 'rating'>
      & { contributor: Pick<User, 'id'>, creator: Pick<User, 'id'> }
    )>>, workstreams?: Maybe<Array<Pick<WorkstreamContributor, 'id'>>> }
  ), contributor: (
    Pick<User, 'id'>
    & { evaluations?: Maybe<Array<(
      Pick<Evaluation, 'rating'>
      & { contributor: Pick<User, 'id'>, creator: Pick<User, 'id'> }
    )>> }
  ) }
);

export type UserByAddressQueryVariables = Exact<{
  address?: InputMaybe<Scalars['ID']>;
}>;


export type UserByAddressQuery = { user?: Maybe<(
    Pick<User, 'fuxer' | 'id'>
    & { balances?: Maybe<Array<(
      Pick<UserBalance, 'amount' | 'id'>
      & { token: Pick<Token, 'id' | 'decimals' | 'name' | 'symbol' | 'tokenID'> }
    )>>, workstreams?: Maybe<Array<Pick<WorkstreamContributor, 'id' | 'commitment' | 'active'>>> }
  )> };

export type WorkstreamContributorFragmentFragment = Pick<WorkstreamContributor, 'id' | 'commitment' | 'active'>;

export type UserBalanceFragmentFragment = (
  Pick<UserBalance, 'amount' | 'id'>
  & { token: Pick<Token, 'id' | 'decimals' | 'name' | 'symbol' | 'tokenID'> }
);

export type UserFragmentFragment = (
  Pick<User, 'fuxer' | 'id'>
  & { balances?: Maybe<Array<(
    Pick<UserBalance, 'amount' | 'id'>
    & { token: Pick<Token, 'id' | 'decimals' | 'name' | 'symbol' | 'tokenID'> }
  )>>, workstreams?: Maybe<Array<Pick<WorkstreamContributor, 'id' | 'commitment' | 'active'>>> }
);

export type WorkstreamsByContributorQueryVariables = Exact<{
  address?: InputMaybe<Scalars['ID']>;
}>;


export type WorkstreamsByContributorQuery = { workstreamContributors: Array<{ workstream: (
      Pick<Workstream, 'id' | 'name' | 'deadline' | 'status' | 'uri'>
      & { coordinator?: Maybe<Pick<User, 'id'>>, contributors?: Maybe<Array<(
        Pick<WorkstreamContributor, 'commitment' | 'active'>
        & { contributor: Pick<User, 'id'> }
      )>>, evaluations?: Maybe<Array<(
        Pick<Evaluation, 'rating'>
        & { contributor: Pick<User, 'id'>, creator: Pick<User, 'id'> }
      )>>, funding?: Maybe<Array<(
        Pick<WorkstreamBalance, 'amount'>
        & { token: Pick<Token, 'id' | 'decimals' | 'name' | 'symbol' | 'tokenID'> }
      )>>, rewardDistribution?: Maybe<(
        Pick<RewardDistribution, 'shares' | 'id'>
        & { contributors: Array<Pick<User, 'id'>> }
      )> }
    ) }> };

export type WorkstreamByIDQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type WorkstreamByIDQuery = { workstreamContributors: Array<{ workstream: (
      Pick<Workstream, 'id' | 'name' | 'deadline' | 'status' | 'uri'>
      & { coordinator?: Maybe<Pick<User, 'id'>>, contributors?: Maybe<Array<(
        Pick<WorkstreamContributor, 'commitment' | 'active'>
        & { contributor: Pick<User, 'id'> }
      )>>, evaluations?: Maybe<Array<(
        Pick<Evaluation, 'rating'>
        & { contributor: Pick<User, 'id'>, creator: Pick<User, 'id'> }
      )>>, funding?: Maybe<Array<(
        Pick<WorkstreamBalance, 'amount'>
        & { token: Pick<Token, 'id' | 'decimals' | 'name' | 'symbol' | 'tokenID'> }
      )>>, rewardDistribution?: Maybe<(
        Pick<RewardDistribution, 'shares' | 'id'>
        & { contributors: Array<Pick<User, 'id'>> }
      )> }
    ) }> };

export type RewardDistributionFragmentFragment = (
  Pick<RewardDistribution, 'shares' | 'id'>
  & { contributors: Array<Pick<User, 'id'>> }
);

export type ContributorFragmentFragment = (
  Pick<WorkstreamContributor, 'commitment' | 'active'>
  & { contributor: Pick<User, 'id'> }
);

export type WorkstreamFragmentFragment = { workstream: (
    Pick<Workstream, 'id' | 'name' | 'deadline' | 'status' | 'uri'>
    & { coordinator?: Maybe<Pick<User, 'id'>>, contributors?: Maybe<Array<(
      Pick<WorkstreamContributor, 'commitment' | 'active'>
      & { contributor: Pick<User, 'id'> }
    )>>, evaluations?: Maybe<Array<(
      Pick<Evaluation, 'rating'>
      & { contributor: Pick<User, 'id'>, creator: Pick<User, 'id'> }
    )>>, funding?: Maybe<Array<(
      Pick<WorkstreamBalance, 'amount'>
      & { token: Pick<Token, 'id' | 'decimals' | 'name' | 'symbol' | 'tokenID'> }
    )>>, rewardDistribution?: Maybe<(
      Pick<RewardDistribution, 'shares' | 'id'>
      & { contributors: Array<Pick<User, 'id'>> }
    )> }
  ) };

export const EvaluationFragmentFragmentDoc = gql`
    fragment EvaluationFragment on Evaluation {
  contributor {
    id
  }
  rating
  creator {
    id
  }
}
    ` as unknown as DocumentNode<EvaluationFragmentFragment, unknown>;
export const EvaluationOverviewFragmentDoc = gql`
    fragment EvaluationOverview on Evaluation {
  id
  rating
  creator {
    evaluations(where: {workstream_: {id: $workstreamID}}) {
      ...EvaluationFragment
    }
    id
    workstreams(where: {workstream_: {id: $workstreamID}}) {
      id
    }
  }
  contributor {
    evaluations(where: {workstream_: {id: $workstreamID}}) {
      ...EvaluationFragment
    }
    id
  }
}
    ${EvaluationFragmentFragmentDoc}` as unknown as DocumentNode<EvaluationOverviewFragment, unknown>;
export const TokenFragmentFragmentDoc = gql`
    fragment TokenFragment on Token {
  id
  decimals
  name
  symbol
  tokenID
}
    ` as unknown as DocumentNode<TokenFragmentFragment, unknown>;
export const UserBalanceFragmentFragmentDoc = gql`
    fragment UserBalanceFragment on UserBalance {
  amount
  id
  token {
    ...TokenFragment
  }
}
    ${TokenFragmentFragmentDoc}` as unknown as DocumentNode<UserBalanceFragmentFragment, unknown>;
export const WorkstreamContributorFragmentFragmentDoc = gql`
    fragment WorkstreamContributorFragment on WorkstreamContributor {
  id
  commitment
  active
}
    ` as unknown as DocumentNode<WorkstreamContributorFragmentFragment, unknown>;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  balances {
    ...UserBalanceFragment
  }
  fuxer
  id
  workstreams(where: {contributor_: {id: $address}}) {
    ...WorkstreamContributorFragment
  }
}
    ${UserBalanceFragmentFragmentDoc}
${WorkstreamContributorFragmentFragmentDoc}` as unknown as DocumentNode<UserFragmentFragment, unknown>;
export const ContributorFragmentFragmentDoc = gql`
    fragment ContributorFragment on WorkstreamContributor {
  commitment
  active
  contributor {
    id
  }
}
    ` as unknown as DocumentNode<ContributorFragmentFragment, unknown>;
export const RewardDistributionFragmentFragmentDoc = gql`
    fragment RewardDistributionFragment on RewardDistribution {
  contributors {
    id
  }
  shares
  id
}
    ` as unknown as DocumentNode<RewardDistributionFragmentFragment, unknown>;
export const WorkstreamFragmentFragmentDoc = gql`
    fragment WorkstreamFragment on WorkstreamContributor {
  workstream {
    id
    name
    coordinator {
      id
    }
    contributors {
      ...ContributorFragment
    }
    deadline
    evaluations {
      ...EvaluationFragment
    }
    funding {
      amount
      token {
        ...TokenFragment
      }
    }
    rewardDistribution {
      ...RewardDistributionFragment
    }
    status
    uri
  }
}
    ${ContributorFragmentFragmentDoc}
${EvaluationFragmentFragmentDoc}
${TokenFragmentFragmentDoc}
${RewardDistributionFragmentFragmentDoc}` as unknown as DocumentNode<WorkstreamFragmentFragment, unknown>;
export const BalancesByUserDocument = gql`
    query BalancesByUser($address: ID = "") {
  userBalances(where: {user_: {id: $address}}) {
    amount
    token {
      ...TokenFragment
    }
  }
}
    ${TokenFragmentFragmentDoc}` as unknown as DocumentNode<BalancesByUserQuery, BalancesByUserQueryVariables>;
export const BalancesByWorkstreamDocument = gql`
    query BalancesByWorkstream($workstreamID: ID = "") {
  workstreams {
    funding(where: {id: $workstreamID}) {
      amount
      token {
        ...TokenFragment
      }
    }
  }
}
    ${TokenFragmentFragmentDoc}` as unknown as DocumentNode<BalancesByWorkstreamQuery, BalancesByWorkstreamQueryVariables>;
export const EvaluationsByWorkstreamIDDocument = gql`
    query EvaluationsByWorkstreamID($workstreamID: ID = "") {
  evaluations {
    ...EvaluationOverview
  }
}
    ${EvaluationOverviewFragmentDoc}` as unknown as DocumentNode<EvaluationsByWorkstreamIDQuery, EvaluationsByWorkstreamIDQueryVariables>;
export const UserByAddressDocument = gql`
    query UserByAddress($address: ID = "") {
  user(id: $address) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}` as unknown as DocumentNode<UserByAddressQuery, UserByAddressQueryVariables>;
export const WorkstreamsByContributorDocument = gql`
    query WorkstreamsByContributor($address: ID = "") {
  workstreamContributors(where: {contributor_: {id: $address}}) {
    ...WorkstreamFragment
  }
}
    ${WorkstreamFragmentFragmentDoc}` as unknown as DocumentNode<WorkstreamsByContributorQuery, WorkstreamsByContributorQueryVariables>;
export const WorkstreamByIDDocument = gql`
    query WorkstreamByID($id: ID = "") {
  workstreamContributors(where: {workstream_: {id: $id}}) {
    ...WorkstreamFragment
  }
}
    ${WorkstreamFragmentFragmentDoc}` as unknown as DocumentNode<WorkstreamByIDQuery, WorkstreamByIDQueryVariables>;







export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    BalancesByUser(variables?: BalancesByUserQueryVariables, options?: C): Promise<BalancesByUserQuery> {
      return requester<BalancesByUserQuery, BalancesByUserQueryVariables>(BalancesByUserDocument, variables, options) as Promise<BalancesByUserQuery>;
    },
    BalancesByWorkstream(variables?: BalancesByWorkstreamQueryVariables, options?: C): Promise<BalancesByWorkstreamQuery> {
      return requester<BalancesByWorkstreamQuery, BalancesByWorkstreamQueryVariables>(BalancesByWorkstreamDocument, variables, options) as Promise<BalancesByWorkstreamQuery>;
    },
    EvaluationsByWorkstreamID(variables?: EvaluationsByWorkstreamIDQueryVariables, options?: C): Promise<EvaluationsByWorkstreamIDQuery> {
      return requester<EvaluationsByWorkstreamIDQuery, EvaluationsByWorkstreamIDQueryVariables>(EvaluationsByWorkstreamIDDocument, variables, options) as Promise<EvaluationsByWorkstreamIDQuery>;
    },
    UserByAddress(variables?: UserByAddressQueryVariables, options?: C): Promise<UserByAddressQuery> {
      return requester<UserByAddressQuery, UserByAddressQueryVariables>(UserByAddressDocument, variables, options) as Promise<UserByAddressQuery>;
    },
    WorkstreamsByContributor(variables?: WorkstreamsByContributorQueryVariables, options?: C): Promise<WorkstreamsByContributorQuery> {
      return requester<WorkstreamsByContributorQuery, WorkstreamsByContributorQueryVariables>(WorkstreamsByContributorDocument, variables, options) as Promise<WorkstreamsByContributorQuery>;
    },
    WorkstreamByID(variables?: WorkstreamByIDQueryVariables, options?: C): Promise<WorkstreamByIDQuery> {
      return requester<WorkstreamByIDQuery, WorkstreamByIDQueryVariables>(WorkstreamByIDDocument, variables, options) as Promise<WorkstreamByIDQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;