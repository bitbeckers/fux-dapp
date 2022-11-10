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
  contributors: Array<User>;
  ratings: Array<Scalars['BigInt']>;
};


export type EvaluationcontributorsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_filter>;
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
  contributors?: InputMaybe<Array<Scalars['String']>>;
  contributors_not?: InputMaybe<Array<Scalars['String']>>;
  contributors_contains?: InputMaybe<Array<Scalars['String']>>;
  contributors_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  contributors_not_contains?: InputMaybe<Array<Scalars['String']>>;
  contributors_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  contributors_?: InputMaybe<User_filter>;
  ratings?: InputMaybe<Array<Scalars['BigInt']>>;
  ratings_not?: InputMaybe<Array<Scalars['BigInt']>>;
  ratings_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  ratings_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  ratings_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  ratings_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Evaluation_orderBy =
  | 'id'
  | 'creator'
  | 'workstream'
  | 'contributors'
  | 'ratings';

export type FuxGiven = {
  id: Scalars['ID'];
  user: User;
  workstream: Workstream;
  balance: Scalars['BigInt'];
};

export type FuxGiven_filter = {
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
  balance?: InputMaybe<Scalars['BigInt']>;
  balance_not?: InputMaybe<Scalars['BigInt']>;
  balance_gt?: InputMaybe<Scalars['BigInt']>;
  balance_lt?: InputMaybe<Scalars['BigInt']>;
  balance_gte?: InputMaybe<Scalars['BigInt']>;
  balance_lte?: InputMaybe<Scalars['BigInt']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type FuxGiven_orderBy =
  | 'id'
  | 'user'
  | 'workstream'
  | 'balance';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Query = {
  user?: Maybe<User>;
  users: Array<User>;
  workstream?: Maybe<Workstream>;
  workstreams: Array<Workstream>;
  userWorkstream?: Maybe<UserWorkstream>;
  userWorkstreams: Array<UserWorkstream>;
  evaluation?: Maybe<Evaluation>;
  evaluations: Array<Evaluation>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  tokenBalance?: Maybe<TokenBalance>;
  tokenBalances: Array<TokenBalance>;
  fuxGiven?: Maybe<FuxGiven>;
  fuxGivens: Array<FuxGiven>;
  vfuxWorkstream?: Maybe<VFuxWorkstream>;
  vfuxWorkstreams: Array<VFuxWorkstream>;
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


export type QueryuserWorkstreamArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryuserWorkstreamsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserWorkstream_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UserWorkstream_filter>;
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


export type QuerytokenBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenBalance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenBalance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfuxGivenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryfuxGivensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuxGiven_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FuxGiven_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvfuxWorkstreamArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvfuxWorkstreamsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VFuxWorkstream_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VFuxWorkstream_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  user?: Maybe<User>;
  users: Array<User>;
  workstream?: Maybe<Workstream>;
  workstreams: Array<Workstream>;
  userWorkstream?: Maybe<UserWorkstream>;
  userWorkstreams: Array<UserWorkstream>;
  evaluation?: Maybe<Evaluation>;
  evaluations: Array<Evaluation>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  tokenBalance?: Maybe<TokenBalance>;
  tokenBalances: Array<TokenBalance>;
  fuxGiven?: Maybe<FuxGiven>;
  fuxGivens: Array<FuxGiven>;
  vfuxWorkstream?: Maybe<VFuxWorkstream>;
  vfuxWorkstreams: Array<VFuxWorkstream>;
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


export type SubscriptionuserWorkstreamArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionuserWorkstreamsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserWorkstream_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UserWorkstream_filter>;
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


export type SubscriptiontokenBalanceArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenBalance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenBalance_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfuxGivenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionfuxGivensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuxGiven_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FuxGiven_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvfuxWorkstreamArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvfuxWorkstreamsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VFuxWorkstream_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VFuxWorkstream_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Token = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  tokenBalances?: Maybe<Array<TokenBalance>>;
};


export type TokentokenBalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenBalance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenBalance_filter>;
};

export type TokenBalance = {
  id: Scalars['ID'];
  user: User;
  token: Token;
  balance: Scalars['BigInt'];
};

export type TokenBalance_filter = {
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
  balance?: InputMaybe<Scalars['BigInt']>;
  balance_not?: InputMaybe<Scalars['BigInt']>;
  balance_gt?: InputMaybe<Scalars['BigInt']>;
  balance_lt?: InputMaybe<Scalars['BigInt']>;
  balance_gte?: InputMaybe<Scalars['BigInt']>;
  balance_lte?: InputMaybe<Scalars['BigInt']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type TokenBalance_orderBy =
  | 'id'
  | 'user'
  | 'token'
  | 'balance';

export type Token_filter = {
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
  tokenBalances_?: InputMaybe<TokenBalance_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Token_orderBy =
  | 'id'
  | 'name'
  | 'symbol'
  | 'tokenBalances';

export type User = {
  id: Scalars['ID'];
  fuxer?: Maybe<Scalars['Boolean']>;
  balances?: Maybe<Array<TokenBalance>>;
  workstreams?: Maybe<Array<UserWorkstream>>;
  fuxGiven?: Maybe<Array<FuxGiven>>;
  rewards?: Maybe<Scalars['BigInt']>;
};


export type UserbalancesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenBalance_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TokenBalance_filter>;
};


export type UserworkstreamsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserWorkstream_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UserWorkstream_filter>;
};


export type UserfuxGivenArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuxGiven_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FuxGiven_filter>;
};

export type UserWorkstream = {
  id: Scalars['ID'];
  user: User;
  workstream: Workstream;
};

export type UserWorkstream_filter = {
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
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type UserWorkstream_orderBy =
  | 'id'
  | 'user'
  | 'workstream';

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
  balances_?: InputMaybe<TokenBalance_filter>;
  workstreams_?: InputMaybe<UserWorkstream_filter>;
  fuxGiven_?: InputMaybe<FuxGiven_filter>;
  rewards?: InputMaybe<Scalars['BigInt']>;
  rewards_not?: InputMaybe<Scalars['BigInt']>;
  rewards_gt?: InputMaybe<Scalars['BigInt']>;
  rewards_lt?: InputMaybe<Scalars['BigInt']>;
  rewards_gte?: InputMaybe<Scalars['BigInt']>;
  rewards_lte?: InputMaybe<Scalars['BigInt']>;
  rewards_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rewards_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type User_orderBy =
  | 'id'
  | 'fuxer'
  | 'balances'
  | 'workstreams'
  | 'fuxGiven'
  | 'rewards';

export type VFuxWorkstream = {
  id: Scalars['ID'];
  user: User;
  workstream: Workstream;
  balance: Scalars['BigInt'];
};

export type VFuxWorkstream_filter = {
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
  balance?: InputMaybe<Scalars['BigInt']>;
  balance_not?: InputMaybe<Scalars['BigInt']>;
  balance_gt?: InputMaybe<Scalars['BigInt']>;
  balance_lt?: InputMaybe<Scalars['BigInt']>;
  balance_gte?: InputMaybe<Scalars['BigInt']>;
  balance_lte?: InputMaybe<Scalars['BigInt']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type VFuxWorkstream_orderBy =
  | 'id'
  | 'user'
  | 'workstream'
  | 'balance';

export type Workstream = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  coordinator?: Maybe<User>;
  contributors?: Maybe<Array<UserWorkstream>>;
  evaluations?: Maybe<Array<Evaluation>>;
  fuxGiven?: Maybe<Array<FuxGiven>>;
  funding?: Maybe<Scalars['BigInt']>;
  deadline?: Maybe<Scalars['BigInt']>;
  resolved?: Maybe<Scalars['Boolean']>;
};


export type WorkstreamcontributorsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserWorkstream_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UserWorkstream_filter>;
};


export type WorkstreamevaluationsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Evaluation_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Evaluation_filter>;
};


export type WorkstreamfuxGivenArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FuxGiven_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<FuxGiven_filter>;
};

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
  contributors_?: InputMaybe<UserWorkstream_filter>;
  evaluations_?: InputMaybe<Evaluation_filter>;
  fuxGiven_?: InputMaybe<FuxGiven_filter>;
  funding?: InputMaybe<Scalars['BigInt']>;
  funding_not?: InputMaybe<Scalars['BigInt']>;
  funding_gt?: InputMaybe<Scalars['BigInt']>;
  funding_lt?: InputMaybe<Scalars['BigInt']>;
  funding_gte?: InputMaybe<Scalars['BigInt']>;
  funding_lte?: InputMaybe<Scalars['BigInt']>;
  funding_in?: InputMaybe<Array<Scalars['BigInt']>>;
  funding_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deadline?: InputMaybe<Scalars['BigInt']>;
  deadline_not?: InputMaybe<Scalars['BigInt']>;
  deadline_gt?: InputMaybe<Scalars['BigInt']>;
  deadline_lt?: InputMaybe<Scalars['BigInt']>;
  deadline_gte?: InputMaybe<Scalars['BigInt']>;
  deadline_lte?: InputMaybe<Scalars['BigInt']>;
  deadline_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deadline_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  resolved?: InputMaybe<Scalars['Boolean']>;
  resolved_not?: InputMaybe<Scalars['Boolean']>;
  resolved_in?: InputMaybe<Array<Scalars['Boolean']>>;
  resolved_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Workstream_orderBy =
  | 'id'
  | 'name'
  | 'coordinator'
  | 'contributors'
  | 'evaluations'
  | 'fuxGiven'
  | 'funding'
  | 'deadline'
  | 'resolved';

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
  FuxGiven: ResolverTypeWrapper<FuxGiven>;
  FuxGiven_filter: FuxGiven_filter;
  FuxGiven_orderBy: FuxGiven_orderBy;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  OrderDirection: OrderDirection;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Token: ResolverTypeWrapper<Token>;
  TokenBalance: ResolverTypeWrapper<TokenBalance>;
  TokenBalance_filter: TokenBalance_filter;
  TokenBalance_orderBy: TokenBalance_orderBy;
  Token_filter: Token_filter;
  Token_orderBy: Token_orderBy;
  User: ResolverTypeWrapper<User>;
  UserWorkstream: ResolverTypeWrapper<UserWorkstream>;
  UserWorkstream_filter: UserWorkstream_filter;
  UserWorkstream_orderBy: UserWorkstream_orderBy;
  User_filter: User_filter;
  User_orderBy: User_orderBy;
  VFuxWorkstream: ResolverTypeWrapper<VFuxWorkstream>;
  VFuxWorkstream_filter: VFuxWorkstream_filter;
  VFuxWorkstream_orderBy: VFuxWorkstream_orderBy;
  Workstream: ResolverTypeWrapper<Workstream>;
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
  FuxGiven: FuxGiven;
  FuxGiven_filter: FuxGiven_filter;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  Token: Token;
  TokenBalance: TokenBalance;
  TokenBalance_filter: TokenBalance_filter;
  Token_filter: Token_filter;
  User: User;
  UserWorkstream: UserWorkstream;
  UserWorkstream_filter: UserWorkstream_filter;
  User_filter: User_filter;
  VFuxWorkstream: VFuxWorkstream;
  VFuxWorkstream_filter: VFuxWorkstream_filter;
  Workstream: Workstream;
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
  contributors?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<EvaluationcontributorsArgs, 'skip' | 'first'>>;
  ratings?: Resolver<Array<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FuxGivenResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['FuxGiven'] = ResolversParentTypes['FuxGiven']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  workstream?: Resolver<ResolversTypes['Workstream'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryuserArgs, 'id' | 'subgraphError'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryusersArgs, 'skip' | 'first' | 'subgraphError'>>;
  workstream?: Resolver<Maybe<ResolversTypes['Workstream']>, ParentType, ContextType, RequireFields<QueryworkstreamArgs, 'id' | 'subgraphError'>>;
  workstreams?: Resolver<Array<ResolversTypes['Workstream']>, ParentType, ContextType, RequireFields<QueryworkstreamsArgs, 'skip' | 'first' | 'subgraphError'>>;
  userWorkstream?: Resolver<Maybe<ResolversTypes['UserWorkstream']>, ParentType, ContextType, RequireFields<QueryuserWorkstreamArgs, 'id' | 'subgraphError'>>;
  userWorkstreams?: Resolver<Array<ResolversTypes['UserWorkstream']>, ParentType, ContextType, RequireFields<QueryuserWorkstreamsArgs, 'skip' | 'first' | 'subgraphError'>>;
  evaluation?: Resolver<Maybe<ResolversTypes['Evaluation']>, ParentType, ContextType, RequireFields<QueryevaluationArgs, 'id' | 'subgraphError'>>;
  evaluations?: Resolver<Array<ResolversTypes['Evaluation']>, ParentType, ContextType, RequireFields<QueryevaluationsArgs, 'skip' | 'first' | 'subgraphError'>>;
  token?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QuerytokenArgs, 'id' | 'subgraphError'>>;
  tokens?: Resolver<Array<ResolversTypes['Token']>, ParentType, ContextType, RequireFields<QuerytokensArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokenBalance?: Resolver<Maybe<ResolversTypes['TokenBalance']>, ParentType, ContextType, RequireFields<QuerytokenBalanceArgs, 'id' | 'subgraphError'>>;
  tokenBalances?: Resolver<Array<ResolversTypes['TokenBalance']>, ParentType, ContextType, RequireFields<QuerytokenBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  fuxGiven?: Resolver<Maybe<ResolversTypes['FuxGiven']>, ParentType, ContextType, RequireFields<QueryfuxGivenArgs, 'id' | 'subgraphError'>>;
  fuxGivens?: Resolver<Array<ResolversTypes['FuxGiven']>, ParentType, ContextType, RequireFields<QueryfuxGivensArgs, 'skip' | 'first' | 'subgraphError'>>;
  vfuxWorkstream?: Resolver<Maybe<ResolversTypes['VFuxWorkstream']>, ParentType, ContextType, RequireFields<QueryvfuxWorkstreamArgs, 'id' | 'subgraphError'>>;
  vfuxWorkstreams?: Resolver<Array<ResolversTypes['VFuxWorkstream']>, ParentType, ContextType, RequireFields<QueryvfuxWorkstreamsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  user?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "user", ParentType, ContextType, RequireFields<SubscriptionuserArgs, 'id' | 'subgraphError'>>;
  users?: SubscriptionResolver<Array<ResolversTypes['User']>, "users", ParentType, ContextType, RequireFields<SubscriptionusersArgs, 'skip' | 'first' | 'subgraphError'>>;
  workstream?: SubscriptionResolver<Maybe<ResolversTypes['Workstream']>, "workstream", ParentType, ContextType, RequireFields<SubscriptionworkstreamArgs, 'id' | 'subgraphError'>>;
  workstreams?: SubscriptionResolver<Array<ResolversTypes['Workstream']>, "workstreams", ParentType, ContextType, RequireFields<SubscriptionworkstreamsArgs, 'skip' | 'first' | 'subgraphError'>>;
  userWorkstream?: SubscriptionResolver<Maybe<ResolversTypes['UserWorkstream']>, "userWorkstream", ParentType, ContextType, RequireFields<SubscriptionuserWorkstreamArgs, 'id' | 'subgraphError'>>;
  userWorkstreams?: SubscriptionResolver<Array<ResolversTypes['UserWorkstream']>, "userWorkstreams", ParentType, ContextType, RequireFields<SubscriptionuserWorkstreamsArgs, 'skip' | 'first' | 'subgraphError'>>;
  evaluation?: SubscriptionResolver<Maybe<ResolversTypes['Evaluation']>, "evaluation", ParentType, ContextType, RequireFields<SubscriptionevaluationArgs, 'id' | 'subgraphError'>>;
  evaluations?: SubscriptionResolver<Array<ResolversTypes['Evaluation']>, "evaluations", ParentType, ContextType, RequireFields<SubscriptionevaluationsArgs, 'skip' | 'first' | 'subgraphError'>>;
  token?: SubscriptionResolver<Maybe<ResolversTypes['Token']>, "token", ParentType, ContextType, RequireFields<SubscriptiontokenArgs, 'id' | 'subgraphError'>>;
  tokens?: SubscriptionResolver<Array<ResolversTypes['Token']>, "tokens", ParentType, ContextType, RequireFields<SubscriptiontokensArgs, 'skip' | 'first' | 'subgraphError'>>;
  tokenBalance?: SubscriptionResolver<Maybe<ResolversTypes['TokenBalance']>, "tokenBalance", ParentType, ContextType, RequireFields<SubscriptiontokenBalanceArgs, 'id' | 'subgraphError'>>;
  tokenBalances?: SubscriptionResolver<Array<ResolversTypes['TokenBalance']>, "tokenBalances", ParentType, ContextType, RequireFields<SubscriptiontokenBalancesArgs, 'skip' | 'first' | 'subgraphError'>>;
  fuxGiven?: SubscriptionResolver<Maybe<ResolversTypes['FuxGiven']>, "fuxGiven", ParentType, ContextType, RequireFields<SubscriptionfuxGivenArgs, 'id' | 'subgraphError'>>;
  fuxGivens?: SubscriptionResolver<Array<ResolversTypes['FuxGiven']>, "fuxGivens", ParentType, ContextType, RequireFields<SubscriptionfuxGivensArgs, 'skip' | 'first' | 'subgraphError'>>;
  vfuxWorkstream?: SubscriptionResolver<Maybe<ResolversTypes['VFuxWorkstream']>, "vfuxWorkstream", ParentType, ContextType, RequireFields<SubscriptionvfuxWorkstreamArgs, 'id' | 'subgraphError'>>;
  vfuxWorkstreams?: SubscriptionResolver<Array<ResolversTypes['VFuxWorkstream']>, "vfuxWorkstreams", ParentType, ContextType, RequireFields<SubscriptionvfuxWorkstreamsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type TokenResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tokenBalances?: Resolver<Maybe<Array<ResolversTypes['TokenBalance']>>, ParentType, ContextType, RequireFields<TokentokenBalancesArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokenBalanceResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TokenBalance'] = ResolversParentTypes['TokenBalance']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['Token'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  fuxer?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  balances?: Resolver<Maybe<Array<ResolversTypes['TokenBalance']>>, ParentType, ContextType, RequireFields<UserbalancesArgs, 'skip' | 'first'>>;
  workstreams?: Resolver<Maybe<Array<ResolversTypes['UserWorkstream']>>, ParentType, ContextType, RequireFields<UserworkstreamsArgs, 'skip' | 'first'>>;
  fuxGiven?: Resolver<Maybe<Array<ResolversTypes['FuxGiven']>>, ParentType, ContextType, RequireFields<UserfuxGivenArgs, 'skip' | 'first'>>;
  rewards?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserWorkstreamResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UserWorkstream'] = ResolversParentTypes['UserWorkstream']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  workstream?: Resolver<ResolversTypes['Workstream'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VFuxWorkstreamResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['VFuxWorkstream'] = ResolversParentTypes['VFuxWorkstream']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  workstream?: Resolver<ResolversTypes['Workstream'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WorkstreamResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Workstream'] = ResolversParentTypes['Workstream']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coordinator?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  contributors?: Resolver<Maybe<Array<ResolversTypes['UserWorkstream']>>, ParentType, ContextType, RequireFields<WorkstreamcontributorsArgs, 'skip' | 'first'>>;
  evaluations?: Resolver<Maybe<Array<ResolversTypes['Evaluation']>>, ParentType, ContextType, RequireFields<WorkstreamevaluationsArgs, 'skip' | 'first'>>;
  fuxGiven?: Resolver<Maybe<Array<ResolversTypes['FuxGiven']>>, ParentType, ContextType, RequireFields<WorkstreamfuxGivenArgs, 'skip' | 'first'>>;
  funding?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  deadline?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  resolved?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
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
  FuxGiven?: FuxGivenResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  TokenBalance?: TokenBalanceResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserWorkstream?: UserWorkstreamResolvers<ContextType>;
  VFuxWorkstream?: VFuxWorkstreamResolvers<ContextType>;
  Workstream?: WorkstreamResolvers<ContextType>;
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
      return import("./sources/fux/introspectionSchema") as T;
    
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
        document: BalancesDocument,
        get rawSDL() {
          return printWithCache(BalancesDocument);
        },
        location: 'BalancesDocument.graphql'
      },{
        document: TokenBalanceDocument,
        get rawSDL() {
          return printWithCache(TokenBalanceDocument);
        },
        location: 'TokenBalanceDocument.graphql'
      },{
        document: WorkstreamEvaluationsDocument,
        get rawSDL() {
          return printWithCache(WorkstreamEvaluationsDocument);
        },
        location: 'WorkstreamEvaluationsDocument.graphql'
      },{
        document: WorkstreamHistoryDocument,
        get rawSDL() {
          return printWithCache(WorkstreamHistoryDocument);
        },
        location: 'WorkstreamHistoryDocument.graphql'
      },{
        document: UserDocument,
        get rawSDL() {
          return printWithCache(UserDocument);
        },
        location: 'UserDocument.graphql'
      },{
        document: WorkstreamsByUserDocument,
        get rawSDL() {
          return printWithCache(WorkstreamsByUserDocument);
        },
        location: 'WorkstreamsByUserDocument.graphql'
      },{
        document: WorkstreamByIdDocument,
        get rawSDL() {
          return printWithCache(WorkstreamByIdDocument);
        },
        location: 'WorkstreamByIdDocument.graphql'
      },{
        document: WorkstreamVFuxDocument,
        get rawSDL() {
          return printWithCache(WorkstreamVFuxDocument);
        },
        location: 'WorkstreamVFuxDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler(): MeshHTTPHandler<MeshContext> {
  return createMeshHTTPHandler<MeshContext>({
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
export type BalancesQueryVariables = Exact<{
  address: Scalars['ID'];
}>;


export type BalancesQuery = { user?: Maybe<(
    Pick<User, 'id'>
    & { balances?: Maybe<Array<(
      Pick<TokenBalance, 'balance'>
      & { token: Pick<Token, 'name' | 'symbol'> }
    )>> }
  )> };

export type TokenBalanceQueryVariables = Exact<{
  address: Scalars['ID'];
  symbol: Scalars['String'];
}>;


export type TokenBalanceQuery = { tokenBalances: Array<Pick<TokenBalance, 'balance'>> };

export type WorkstreamEvaluationsQueryVariables = Exact<{
  address: Scalars['ID'];
  workstreamID: Scalars['ID'];
}>;


export type WorkstreamEvaluationsQuery = { userWorkstreams: Array<{ workstream: (
      Pick<Workstream, 'id' | 'name' | 'deadline' | 'funding' | 'resolved'>
      & { contributors?: Maybe<Array<Pick<UserWorkstream, 'id'>>>, coordinator?: Maybe<Pick<User, 'id'>>, evaluations?: Maybe<Array<(
        Pick<Evaluation, 'ratings'>
        & { creator: Pick<User, 'id'>, contributors: Array<Pick<User, 'id'>> }
      )>> }
    ) }> };

export type WorkstreamFragmentFragment = (
  Pick<Workstream, 'id' | 'name' | 'deadline' | 'funding' | 'resolved'>
  & { contributors?: Maybe<Array<Pick<UserWorkstream, 'id'>>>, coordinator?: Maybe<Pick<User, 'id'>>, evaluations?: Maybe<Array<(
    Pick<Evaluation, 'ratings'>
    & { creator: Pick<User, 'id'>, contributors: Array<Pick<User, 'id'>> }
  )>> }
);

export type EvaluationFragmentFragment = (
  Pick<Evaluation, 'ratings'>
  & { creator: Pick<User, 'id'>, contributors: Array<Pick<User, 'id'>> }
);

export type WorkstreamHistoryQueryVariables = Exact<{
  address: Scalars['ID'];
}>;


export type WorkstreamHistoryQuery = { userWorkstreams: Array<{ workstream: (
      Pick<Workstream, 'deadline' | 'funding' | 'id' | 'name' | 'resolved'>
      & { coordinator?: Maybe<Pick<User, 'id'>>, contributors?: Maybe<Array<{ user: Pick<User, 'id'> }>>, evaluations?: Maybe<Array<(
        Pick<Evaluation, 'ratings'>
        & { creator: Pick<User, 'id'>, contributors: Array<Pick<User, 'id'>> }
      )>>, fuxGiven?: Maybe<Array<(
        Pick<FuxGiven, 'balance'>
        & { user: Pick<User, 'id'> }
      )>> }
    ) }> };

export type UserWorkstreamFragmentFragment = { workstream: (
    Pick<Workstream, 'deadline' | 'funding' | 'id' | 'name' | 'resolved'>
    & { coordinator?: Maybe<Pick<User, 'id'>>, contributors?: Maybe<Array<{ user: Pick<User, 'id'> }>>, evaluations?: Maybe<Array<(
      Pick<Evaluation, 'ratings'>
      & { creator: Pick<User, 'id'>, contributors: Array<Pick<User, 'id'>> }
    )>>, fuxGiven?: Maybe<Array<(
      Pick<FuxGiven, 'balance'>
      & { user: Pick<User, 'id'> }
    )>> }
  ) };

export type UserQueryVariables = Exact<{
  address: Scalars['ID'];
}>;


export type UserQuery = { user?: Maybe<(
    Pick<User, 'id' | 'fuxer' | 'rewards'>
    & { balances?: Maybe<Array<(
      Pick<TokenBalance, 'balance'>
      & { token: Pick<Token, 'name' | 'symbol'> }
    )>> }
  )> };

export type WorkstreamsByUserQueryVariables = Exact<{
  address: Scalars['ID'];
}>;


export type WorkstreamsByUserQuery = { userWorkstreams: Array<{ workstream: (
      Pick<Workstream, 'deadline' | 'funding' | 'id' | 'name' | 'resolved'>
      & { fuxGiven?: Maybe<Array<(
        Pick<FuxGiven, 'balance'>
        & { user: Pick<User, 'id'> }
      )>>, contributors?: Maybe<Array<{ user: Pick<User, 'id'> }>>, coordinator?: Maybe<Pick<User, 'id'>> }
    ) }> };

export type WorkstreamsByUserFragmentFragment = (
  Pick<Workstream, 'deadline' | 'funding' | 'id' | 'name' | 'resolved'>
  & { fuxGiven?: Maybe<Array<(
    Pick<FuxGiven, 'balance'>
    & { user: Pick<User, 'id'> }
  )>>, contributors?: Maybe<Array<{ user: Pick<User, 'id'> }>>, coordinator?: Maybe<Pick<User, 'id'>> }
);

export type WorkstreamByIDQueryVariables = Exact<{
  workstreamID: Scalars['ID'];
}>;


export type WorkstreamByIDQuery = { workstream?: Maybe<(
    Pick<Workstream, 'deadline' | 'funding' | 'id' | 'name' | 'resolved'>
    & { contributors?: Maybe<Array<Pick<UserWorkstream, 'id'>>>, coordinator?: Maybe<Pick<User, 'id'>>, evaluations?: Maybe<Array<(
      Pick<Evaluation, 'ratings'>
      & { contributors: Array<Pick<User, 'id'>> }
    )>>, fuxGiven?: Maybe<Array<(
      Pick<FuxGiven, 'balance'>
      & { user: Pick<User, 'id'> }
    )>> }
  )> };

export type WorkstreamByIDFragmentFragment = (
  Pick<Workstream, 'deadline' | 'funding' | 'id' | 'name' | 'resolved'>
  & { contributors?: Maybe<Array<Pick<UserWorkstream, 'id'>>>, coordinator?: Maybe<Pick<User, 'id'>>, evaluations?: Maybe<Array<(
    Pick<Evaluation, 'ratings'>
    & { contributors: Array<Pick<User, 'id'>> }
  )>>, fuxGiven?: Maybe<Array<(
    Pick<FuxGiven, 'balance'>
    & { user: Pick<User, 'id'> }
  )>> }
);

export type WorkstreamVFuxQueryVariables = Exact<{
  address: Scalars['ID'];
  workstreamID: Scalars['ID'];
}>;


export type WorkstreamVFuxQuery = { vfuxWorkstreams: Array<Pick<VFuxWorkstream, 'balance'>> };

export const EvaluationFragmentFragmentDoc = gql`
    fragment EvaluationFragment on Evaluation {
  creator {
    id
  }
  contributors {
    id
  }
  ratings
}
    ` as unknown as DocumentNode<EvaluationFragmentFragment, unknown>;
export const WorkstreamFragmentFragmentDoc = gql`
    fragment WorkstreamFragment on Workstream {
  id
  name
  contributors {
    id
  }
  coordinator {
    id
  }
  deadline
  funding
  resolved
  evaluations(where: {creator_: {id: $address}}) {
    ...EvaluationFragment
  }
}
    ${EvaluationFragmentFragmentDoc}` as unknown as DocumentNode<WorkstreamFragmentFragment, unknown>;
export const UserWorkstreamFragmentFragmentDoc = gql`
    fragment UserWorkstreamFragment on UserWorkstream {
  workstream {
    coordinator {
      id
    }
    contributors {
      user {
        id
      }
    }
    deadline
    evaluations {
      creator {
        id
      }
      ratings
      contributors {
        id
      }
    }
    funding
    id
    name
    resolved
    fuxGiven {
      balance
      user {
        id
      }
    }
  }
}
    ` as unknown as DocumentNode<UserWorkstreamFragmentFragment, unknown>;
export const WorkstreamsByUserFragmentFragmentDoc = gql`
    fragment WorkstreamsByUserFragment on Workstream {
  fuxGiven(where: {user_: {id: $address}}) {
    balance
    user {
      id
    }
  }
  deadline
  funding
  id
  name
  resolved
  contributors {
    user {
      id
    }
  }
  coordinator {
    id
  }
}
    ` as unknown as DocumentNode<WorkstreamsByUserFragmentFragment, unknown>;
export const WorkstreamByIDFragmentFragmentDoc = gql`
    fragment WorkstreamByIDFragment on Workstream {
  contributors {
    id
  }
  coordinator {
    id
  }
  deadline
  funding
  id
  name
  resolved
  evaluations {
    contributors {
      id
    }
    ratings
  }
  fuxGiven {
    balance
    user {
      id
    }
  }
}
    ` as unknown as DocumentNode<WorkstreamByIDFragmentFragment, unknown>;
export const BalancesDocument = gql`
    query Balances($address: ID!) @live {
  user(id: $address) {
    id
    balances {
      token {
        name
        symbol
      }
      balance
    }
  }
}
    ` as unknown as DocumentNode<BalancesQuery, BalancesQueryVariables>;
export const TokenBalanceDocument = gql`
    query TokenBalance($address: ID!, $symbol: String!) @live {
  tokenBalances(where: {token_: {symbol: $symbol}, user_: {id: $address}}) {
    balance
  }
}
    ` as unknown as DocumentNode<TokenBalanceQuery, TokenBalanceQueryVariables>;
export const WorkstreamEvaluationsDocument = gql`
    query WorkstreamEvaluations($address: ID!, $workstreamID: ID!) {
  userWorkstreams(
    where: {user_: {id: $address}, workstream_: {id: $workstreamID}}
  ) {
    workstream {
      ...WorkstreamFragment
    }
  }
}
    ${WorkstreamFragmentFragmentDoc}` as unknown as DocumentNode<WorkstreamEvaluationsQuery, WorkstreamEvaluationsQueryVariables>;
export const WorkstreamHistoryDocument = gql`
    query WorkstreamHistory($address: ID!) {
  userWorkstreams(where: {user_: {id: $address}}) {
    ...UserWorkstreamFragment
  }
}
    ${UserWorkstreamFragmentFragmentDoc}` as unknown as DocumentNode<WorkstreamHistoryQuery, WorkstreamHistoryQueryVariables>;
export const UserDocument = gql`
    query User($address: ID!) @live {
  user(id: $address) {
    id
    fuxer
    rewards
    balances {
      token {
        name
        symbol
      }
      balance
    }
  }
}
    ` as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const WorkstreamsByUserDocument = gql`
    query WorkstreamsByUser($address: ID!) {
  userWorkstreams(where: {user_: {id: $address}}) {
    workstream {
      ...WorkstreamsByUserFragment
    }
  }
}
    ${WorkstreamsByUserFragmentFragmentDoc}` as unknown as DocumentNode<WorkstreamsByUserQuery, WorkstreamsByUserQueryVariables>;
export const WorkstreamByIDDocument = gql`
    query WorkstreamByID($workstreamID: ID!) {
  workstream(id: $workstreamID) {
    ...WorkstreamByIDFragment
  }
}
    ${WorkstreamByIDFragmentFragmentDoc}` as unknown as DocumentNode<WorkstreamByIDQuery, WorkstreamByIDQueryVariables>;
export const WorkstreamVFuxDocument = gql`
    query WorkstreamVFux($address: ID!, $workstreamID: ID!) {
  vfuxWorkstreams(
    where: {user_: {id: $address}, workstream_: {id: $workstreamID}}
  ) {
    balance
  }
}
    ` as unknown as DocumentNode<WorkstreamVFuxQuery, WorkstreamVFuxQueryVariables>;









export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    Balances(variables: BalancesQueryVariables, options?: C): AsyncIterable<BalancesQuery> {
      return requester<BalancesQuery, BalancesQueryVariables>(BalancesDocument, variables, options) as AsyncIterable<BalancesQuery>;
    },
    TokenBalance(variables: TokenBalanceQueryVariables, options?: C): AsyncIterable<TokenBalanceQuery> {
      return requester<TokenBalanceQuery, TokenBalanceQueryVariables>(TokenBalanceDocument, variables, options) as AsyncIterable<TokenBalanceQuery>;
    },
    WorkstreamEvaluations(variables: WorkstreamEvaluationsQueryVariables, options?: C): Promise<WorkstreamEvaluationsQuery> {
      return requester<WorkstreamEvaluationsQuery, WorkstreamEvaluationsQueryVariables>(WorkstreamEvaluationsDocument, variables, options) as Promise<WorkstreamEvaluationsQuery>;
    },
    WorkstreamHistory(variables: WorkstreamHistoryQueryVariables, options?: C): Promise<WorkstreamHistoryQuery> {
      return requester<WorkstreamHistoryQuery, WorkstreamHistoryQueryVariables>(WorkstreamHistoryDocument, variables, options) as Promise<WorkstreamHistoryQuery>;
    },
    User(variables: UserQueryVariables, options?: C): AsyncIterable<UserQuery> {
      return requester<UserQuery, UserQueryVariables>(UserDocument, variables, options) as AsyncIterable<UserQuery>;
    },
    WorkstreamsByUser(variables: WorkstreamsByUserQueryVariables, options?: C): Promise<WorkstreamsByUserQuery> {
      return requester<WorkstreamsByUserQuery, WorkstreamsByUserQueryVariables>(WorkstreamsByUserDocument, variables, options) as Promise<WorkstreamsByUserQuery>;
    },
    WorkstreamByID(variables: WorkstreamByIDQueryVariables, options?: C): Promise<WorkstreamByIDQuery> {
      return requester<WorkstreamByIDQuery, WorkstreamByIDQueryVariables>(WorkstreamByIDDocument, variables, options) as Promise<WorkstreamByIDQuery>;
    },
    WorkstreamVFux(variables: WorkstreamVFuxQueryVariables, options?: C): Promise<WorkstreamVFuxQuery> {
      return requester<WorkstreamVFuxQuery, WorkstreamVFuxQueryVariables>(WorkstreamVFuxDocument, variables, options) as Promise<WorkstreamVFuxQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;