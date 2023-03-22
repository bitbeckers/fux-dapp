// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace FuxTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  | 'creator__rewards'
  | 'workstream'
  | 'workstream__id'
  | 'workstream__name'
  | 'workstream__funding'
  | 'workstream__deadline'
  | 'workstream__status'
  | 'contributor'
  | 'contributor__id'
  | 'contributor__fuxer'
  | 'contributor__rewards'
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
  evaluation?: Maybe<Evaluation>;
  evaluations: Array<Evaluation>;
  workstreamContributor?: Maybe<WorkstreamContributor>;
  workstreamContributors: Array<WorkstreamContributor>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  tokenBalance?: Maybe<TokenBalance>;
  tokenBalances: Array<TokenBalance>;
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


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  user?: Maybe<User>;
  users: Array<User>;
  workstream?: Maybe<Workstream>;
  workstreams: Array<Workstream>;
  evaluation?: Maybe<Evaluation>;
  evaluations: Array<Evaluation>;
  workstreamContributor?: Maybe<WorkstreamContributor>;
  workstreamContributors: Array<WorkstreamContributor>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  tokenBalance?: Maybe<TokenBalance>;
  tokenBalances: Array<TokenBalance>;
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
  amount: Scalars['BigInt'];
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
  and?: InputMaybe<Array<InputMaybe<TokenBalance_filter>>>;
  or?: InputMaybe<Array<InputMaybe<TokenBalance_filter>>>;
};

export type TokenBalance_orderBy =
  | 'id'
  | 'user'
  | 'user__id'
  | 'user__fuxer'
  | 'user__rewards'
  | 'token'
  | 'token__id'
  | 'token__name'
  | 'token__symbol'
  | 'amount';

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
  and?: InputMaybe<Array<InputMaybe<Token_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Token_filter>>>;
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
  workstreams?: Maybe<Array<WorkstreamContributor>>;
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
  orderBy?: InputMaybe<WorkstreamContributor_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WorkstreamContributor_filter>;
};

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
  workstreams_?: InputMaybe<WorkstreamContributor_filter>;
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
  and?: InputMaybe<Array<InputMaybe<User_filter>>>;
  or?: InputMaybe<Array<InputMaybe<User_filter>>>;
};

export type User_orderBy =
  | 'id'
  | 'fuxer'
  | 'balances'
  | 'workstreams'
  | 'rewards';

export type Workstream = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  coordinator?: Maybe<User>;
  contributors?: Maybe<Array<WorkstreamContributor>>;
  evaluations?: Maybe<Array<Evaluation>>;
  funding?: Maybe<Scalars['BigInt']>;
  deadline?: Maybe<Scalars['BigInt']>;
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

export type WorkstreamContributor = {
  id: Scalars['ID'];
  workstream: Workstream;
  contributor: User;
  commitment?: Maybe<Scalars['BigInt']>;
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
  | 'workstream__funding'
  | 'workstream__deadline'
  | 'workstream__status'
  | 'contributor'
  | 'contributor__id'
  | 'contributor__fuxer'
  | 'contributor__rewards'
  | 'commitment';

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
  contributors_?: InputMaybe<WorkstreamContributor_filter>;
  evaluations_?: InputMaybe<Evaluation_filter>;
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
  | 'coordinator__rewards'
  | 'contributors'
  | 'evaluations'
  | 'funding'
  | 'deadline'
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

  export type QuerySdk = {
      /** null **/
  user: InContextSdkMethod<Query['user'], QueryuserArgs, MeshContext>,
  /** null **/
  users: InContextSdkMethod<Query['users'], QueryusersArgs, MeshContext>,
  /** null **/
  workstream: InContextSdkMethod<Query['workstream'], QueryworkstreamArgs, MeshContext>,
  /** null **/
  workstreams: InContextSdkMethod<Query['workstreams'], QueryworkstreamsArgs, MeshContext>,
  /** null **/
  evaluation: InContextSdkMethod<Query['evaluation'], QueryevaluationArgs, MeshContext>,
  /** null **/
  evaluations: InContextSdkMethod<Query['evaluations'], QueryevaluationsArgs, MeshContext>,
  /** null **/
  workstreamContributor: InContextSdkMethod<Query['workstreamContributor'], QueryworkstreamContributorArgs, MeshContext>,
  /** null **/
  workstreamContributors: InContextSdkMethod<Query['workstreamContributors'], QueryworkstreamContributorsArgs, MeshContext>,
  /** null **/
  token: InContextSdkMethod<Query['token'], QuerytokenArgs, MeshContext>,
  /** null **/
  tokens: InContextSdkMethod<Query['tokens'], QuerytokensArgs, MeshContext>,
  /** null **/
  tokenBalance: InContextSdkMethod<Query['tokenBalance'], QuerytokenBalanceArgs, MeshContext>,
  /** null **/
  tokenBalances: InContextSdkMethod<Query['tokenBalances'], QuerytokenBalancesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  user: InContextSdkMethod<Subscription['user'], SubscriptionuserArgs, MeshContext>,
  /** null **/
  users: InContextSdkMethod<Subscription['users'], SubscriptionusersArgs, MeshContext>,
  /** null **/
  workstream: InContextSdkMethod<Subscription['workstream'], SubscriptionworkstreamArgs, MeshContext>,
  /** null **/
  workstreams: InContextSdkMethod<Subscription['workstreams'], SubscriptionworkstreamsArgs, MeshContext>,
  /** null **/
  evaluation: InContextSdkMethod<Subscription['evaluation'], SubscriptionevaluationArgs, MeshContext>,
  /** null **/
  evaluations: InContextSdkMethod<Subscription['evaluations'], SubscriptionevaluationsArgs, MeshContext>,
  /** null **/
  workstreamContributor: InContextSdkMethod<Subscription['workstreamContributor'], SubscriptionworkstreamContributorArgs, MeshContext>,
  /** null **/
  workstreamContributors: InContextSdkMethod<Subscription['workstreamContributors'], SubscriptionworkstreamContributorsArgs, MeshContext>,
  /** null **/
  token: InContextSdkMethod<Subscription['token'], SubscriptiontokenArgs, MeshContext>,
  /** null **/
  tokens: InContextSdkMethod<Subscription['tokens'], SubscriptiontokensArgs, MeshContext>,
  /** null **/
  tokenBalance: InContextSdkMethod<Subscription['tokenBalance'], SubscriptiontokenBalanceArgs, MeshContext>,
  /** null **/
  tokenBalances: InContextSdkMethod<Subscription['tokenBalances'], SubscriptiontokenBalancesArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["fux"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
