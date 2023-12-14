/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  /**
   * 8 bytes signed integer
   *
   */
  Int8: { input: any; output: any; }
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type Evaluation = {
  __typename?: 'Evaluation';
  contributor: User;
  creator: User;
  id: Scalars['ID']['output'];
  rating: Scalars['BigInt']['output'];
  workstream: Workstream;
};

export type Evaluation_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Evaluation_Filter>>>;
  contributor?: InputMaybe<Scalars['String']['input']>;
  contributor_?: InputMaybe<User_Filter>;
  contributor_contains?: InputMaybe<Scalars['String']['input']>;
  contributor_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contributor_ends_with?: InputMaybe<Scalars['String']['input']>;
  contributor_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contributor_gt?: InputMaybe<Scalars['String']['input']>;
  contributor_gte?: InputMaybe<Scalars['String']['input']>;
  contributor_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contributor_lt?: InputMaybe<Scalars['String']['input']>;
  contributor_lte?: InputMaybe<Scalars['String']['input']>;
  contributor_not?: InputMaybe<Scalars['String']['input']>;
  contributor_not_contains?: InputMaybe<Scalars['String']['input']>;
  contributor_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contributor_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  contributor_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contributor_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contributor_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  contributor_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contributor_starts_with?: InputMaybe<Scalars['String']['input']>;
  contributor_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creator?: InputMaybe<Scalars['String']['input']>;
  creator_?: InputMaybe<User_Filter>;
  creator_contains?: InputMaybe<Scalars['String']['input']>;
  creator_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  creator_ends_with?: InputMaybe<Scalars['String']['input']>;
  creator_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creator_gt?: InputMaybe<Scalars['String']['input']>;
  creator_gte?: InputMaybe<Scalars['String']['input']>;
  creator_in?: InputMaybe<Array<Scalars['String']['input']>>;
  creator_lt?: InputMaybe<Scalars['String']['input']>;
  creator_lte?: InputMaybe<Scalars['String']['input']>;
  creator_not?: InputMaybe<Scalars['String']['input']>;
  creator_not_contains?: InputMaybe<Scalars['String']['input']>;
  creator_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  creator_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  creator_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creator_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  creator_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  creator_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  creator_starts_with?: InputMaybe<Scalars['String']['input']>;
  creator_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Evaluation_Filter>>>;
  rating?: InputMaybe<Scalars['BigInt']['input']>;
  rating_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rating_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rating_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rating_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rating_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rating_not?: InputMaybe<Scalars['BigInt']['input']>;
  rating_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  workstream?: InputMaybe<Scalars['String']['input']>;
  workstream_?: InputMaybe<Workstream_Filter>;
  workstream_contains?: InputMaybe<Scalars['String']['input']>;
  workstream_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_ends_with?: InputMaybe<Scalars['String']['input']>;
  workstream_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_gt?: InputMaybe<Scalars['String']['input']>;
  workstream_gte?: InputMaybe<Scalars['String']['input']>;
  workstream_in?: InputMaybe<Array<Scalars['String']['input']>>;
  workstream_lt?: InputMaybe<Scalars['String']['input']>;
  workstream_lte?: InputMaybe<Scalars['String']['input']>;
  workstream_not?: InputMaybe<Scalars['String']['input']>;
  workstream_not_contains?: InputMaybe<Scalars['String']['input']>;
  workstream_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  workstream_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  workstream_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  workstream_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_starts_with?: InputMaybe<Scalars['String']['input']>;
  workstream_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Evaluation_OrderBy {
  Contributor = 'contributor',
  ContributorFuxer = 'contributor__fuxer',
  ContributorId = 'contributor__id',
  Creator = 'creator',
  CreatorFuxer = 'creator__fuxer',
  CreatorId = 'creator__id',
  Id = 'id',
  Rating = 'rating',
  Workstream = 'workstream',
  WorkstreamDeadline = 'workstream__deadline',
  WorkstreamId = 'workstream__id',
  WorkstreamName = 'workstream__name',
  WorkstreamStatus = 'workstream__status',
  WorkstreamUri = 'workstream__uri'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  evaluation?: Maybe<Evaluation>;
  evaluations: Array<Evaluation>;
  rewardDistribution?: Maybe<RewardDistribution>;
  rewardDistributions: Array<RewardDistribution>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  user?: Maybe<User>;
  userBalance?: Maybe<UserBalance>;
  userBalances: Array<UserBalance>;
  users: Array<User>;
  workstream?: Maybe<Workstream>;
  workstreamBalance?: Maybe<WorkstreamBalance>;
  workstreamBalances: Array<WorkstreamBalance>;
  workstreamContestation?: Maybe<WorkstreamContestation>;
  workstreamContestations: Array<WorkstreamContestation>;
  workstreamContributor?: Maybe<WorkstreamContributor>;
  workstreamContributors: Array<WorkstreamContributor>;
  workstreams: Array<Workstream>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryEvaluationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryEvaluationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Evaluation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Evaluation_Filter>;
};


export type QueryRewardDistributionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRewardDistributionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RewardDistribution_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RewardDistribution_Filter>;
};


export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};


export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUserBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUserBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UserBalance_Filter>;
};


export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};


export type QueryWorkstreamArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWorkstreamBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWorkstreamBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WorkstreamBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WorkstreamBalance_Filter>;
};


export type QueryWorkstreamContestationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWorkstreamContestationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WorkstreamContestation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WorkstreamContestation_Filter>;
};


export type QueryWorkstreamContributorArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWorkstreamContributorsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WorkstreamContributor_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WorkstreamContributor_Filter>;
};


export type QueryWorkstreamsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Workstream_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Workstream_Filter>;
};

export type RewardDistribution = {
  __typename?: 'RewardDistribution';
  contributors: Array<User>;
  id: Scalars['ID']['output'];
  shares: Array<Scalars['BigInt']['output']>;
  workstream: Workstream;
};


export type RewardDistributionContributorsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<User_Filter>;
};

export type RewardDistribution_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<RewardDistribution_Filter>>>;
  contributors?: InputMaybe<Array<Scalars['String']['input']>>;
  contributors_?: InputMaybe<User_Filter>;
  contributors_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  contributors_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  contributors_not?: InputMaybe<Array<Scalars['String']['input']>>;
  contributors_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  contributors_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<RewardDistribution_Filter>>>;
  shares?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  shares_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  shares_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  shares_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  shares_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  shares_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  workstream?: InputMaybe<Scalars['String']['input']>;
  workstream_?: InputMaybe<Workstream_Filter>;
  workstream_contains?: InputMaybe<Scalars['String']['input']>;
  workstream_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_ends_with?: InputMaybe<Scalars['String']['input']>;
  workstream_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_gt?: InputMaybe<Scalars['String']['input']>;
  workstream_gte?: InputMaybe<Scalars['String']['input']>;
  workstream_in?: InputMaybe<Array<Scalars['String']['input']>>;
  workstream_lt?: InputMaybe<Scalars['String']['input']>;
  workstream_lte?: InputMaybe<Scalars['String']['input']>;
  workstream_not?: InputMaybe<Scalars['String']['input']>;
  workstream_not_contains?: InputMaybe<Scalars['String']['input']>;
  workstream_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  workstream_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  workstream_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  workstream_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_starts_with?: InputMaybe<Scalars['String']['input']>;
  workstream_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum RewardDistribution_OrderBy {
  Contributors = 'contributors',
  Id = 'id',
  Shares = 'shares',
  Workstream = 'workstream',
  WorkstreamDeadline = 'workstream__deadline',
  WorkstreamId = 'workstream__id',
  WorkstreamName = 'workstream__name',
  WorkstreamStatus = 'workstream__status',
  WorkstreamUri = 'workstream__uri'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  evaluation?: Maybe<Evaluation>;
  evaluations: Array<Evaluation>;
  rewardDistribution?: Maybe<RewardDistribution>;
  rewardDistributions: Array<RewardDistribution>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  user?: Maybe<User>;
  userBalance?: Maybe<UserBalance>;
  userBalances: Array<UserBalance>;
  users: Array<User>;
  workstream?: Maybe<Workstream>;
  workstreamBalance?: Maybe<WorkstreamBalance>;
  workstreamBalances: Array<WorkstreamBalance>;
  workstreamContestation?: Maybe<WorkstreamContestation>;
  workstreamContestations: Array<WorkstreamContestation>;
  workstreamContributor?: Maybe<WorkstreamContributor>;
  workstreamContributors: Array<WorkstreamContributor>;
  workstreams: Array<Workstream>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionEvaluationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionEvaluationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Evaluation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Evaluation_Filter>;
};


export type SubscriptionRewardDistributionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRewardDistributionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<RewardDistribution_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RewardDistribution_Filter>;
};


export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};


export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUserBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUserBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UserBalance_Filter>;
};


export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};


export type SubscriptionWorkstreamArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWorkstreamBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWorkstreamBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WorkstreamBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WorkstreamBalance_Filter>;
};


export type SubscriptionWorkstreamContestationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWorkstreamContestationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WorkstreamContestation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WorkstreamContestation_Filter>;
};


export type SubscriptionWorkstreamContributorArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWorkstreamContributorsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WorkstreamContributor_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WorkstreamContributor_Filter>;
};


export type SubscriptionWorkstreamsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Workstream_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Workstream_Filter>;
};

export type Token = {
  __typename?: 'Token';
  decimals?: Maybe<Scalars['BigInt']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  tokenID?: Maybe<Scalars['BigInt']['output']>;
  userBalances?: Maybe<Array<UserBalance>>;
  workstreamBalance?: Maybe<Array<WorkstreamBalance>>;
};


export type TokenUserBalancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserBalance_Filter>;
};


export type TokenWorkstreamBalanceArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WorkstreamBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WorkstreamBalance_Filter>;
};

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  decimals?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_gt?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_gte?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  decimals_lt?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_lte?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_not?: InputMaybe<Scalars['BigInt']['input']>;
  decimals_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenID?: InputMaybe<Scalars['BigInt']['input']>;
  tokenID_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenID_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenID_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenID_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenID_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenID_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenID_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  userBalances_?: InputMaybe<UserBalance_Filter>;
  workstreamBalance_?: InputMaybe<WorkstreamBalance_Filter>;
};

export enum Token_OrderBy {
  Decimals = 'decimals',
  Id = 'id',
  Name = 'name',
  Symbol = 'symbol',
  TokenId = 'tokenID',
  UserBalances = 'userBalances',
  WorkstreamBalance = 'workstreamBalance'
}

export type User = {
  __typename?: 'User';
  balances?: Maybe<Array<UserBalance>>;
  evaluations?: Maybe<Array<Evaluation>>;
  fuxer: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  workstreams?: Maybe<Array<WorkstreamContributor>>;
};


export type UserBalancesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UserBalance_Filter>;
};


export type UserEvaluationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Evaluation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Evaluation_Filter>;
};


export type UserWorkstreamsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WorkstreamContributor_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WorkstreamContributor_Filter>;
};

export type UserBalance = {
  __typename?: 'UserBalance';
  amount: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  token: Token;
  user: User;
};

export type UserBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<UserBalance_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<UserBalance_Filter>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum UserBalance_OrderBy {
  Amount = 'amount',
  Id = 'id',
  Token = 'token',
  TokenDecimals = 'token__decimals',
  TokenId = 'token__id',
  TokenName = 'token__name',
  TokenSymbol = 'token__symbol',
  TokenTokenId = 'token__tokenID',
  User = 'user',
  UserFuxer = 'user__fuxer',
  UserId = 'user__id'
}

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  balances_?: InputMaybe<UserBalance_Filter>;
  evaluations_?: InputMaybe<Evaluation_Filter>;
  fuxer?: InputMaybe<Scalars['Boolean']['input']>;
  fuxer_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  fuxer_not?: InputMaybe<Scalars['Boolean']['input']>;
  fuxer_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  workstreams_?: InputMaybe<WorkstreamContributor_Filter>;
};

export enum User_OrderBy {
  Balances = 'balances',
  Evaluations = 'evaluations',
  Fuxer = 'fuxer',
  Id = 'id',
  Workstreams = 'workstreams'
}

export type Workstream = {
  __typename?: 'Workstream';
  contestings?: Maybe<Array<WorkstreamContestation>>;
  contributors?: Maybe<Array<WorkstreamContributor>>;
  coordinator?: Maybe<User>;
  deadline?: Maybe<Scalars['BigInt']['output']>;
  evaluations?: Maybe<Array<Evaluation>>;
  funding?: Maybe<Array<WorkstreamBalance>>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  rewardDistribution?: Maybe<RewardDistribution>;
  status?: Maybe<WorkstreamStatus>;
  uri?: Maybe<Scalars['String']['output']>;
};


export type WorkstreamContestingsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WorkstreamContestation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WorkstreamContestation_Filter>;
};


export type WorkstreamContributorsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WorkstreamContributor_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WorkstreamContributor_Filter>;
};


export type WorkstreamEvaluationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Evaluation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Evaluation_Filter>;
};


export type WorkstreamFundingArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<WorkstreamBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<WorkstreamBalance_Filter>;
};

export type WorkstreamBalance = {
  __typename?: 'WorkstreamBalance';
  amount: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  token: Token;
  workstream: Workstream;
};

export type WorkstreamBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<WorkstreamBalance_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<WorkstreamBalance_Filter>>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream?: InputMaybe<Scalars['String']['input']>;
  workstream_?: InputMaybe<Workstream_Filter>;
  workstream_contains?: InputMaybe<Scalars['String']['input']>;
  workstream_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_ends_with?: InputMaybe<Scalars['String']['input']>;
  workstream_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_gt?: InputMaybe<Scalars['String']['input']>;
  workstream_gte?: InputMaybe<Scalars['String']['input']>;
  workstream_in?: InputMaybe<Array<Scalars['String']['input']>>;
  workstream_lt?: InputMaybe<Scalars['String']['input']>;
  workstream_lte?: InputMaybe<Scalars['String']['input']>;
  workstream_not?: InputMaybe<Scalars['String']['input']>;
  workstream_not_contains?: InputMaybe<Scalars['String']['input']>;
  workstream_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  workstream_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  workstream_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  workstream_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_starts_with?: InputMaybe<Scalars['String']['input']>;
  workstream_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum WorkstreamBalance_OrderBy {
  Amount = 'amount',
  Id = 'id',
  Token = 'token',
  TokenDecimals = 'token__decimals',
  TokenId = 'token__id',
  TokenName = 'token__name',
  TokenSymbol = 'token__symbol',
  TokenTokenId = 'token__tokenID',
  Workstream = 'workstream',
  WorkstreamDeadline = 'workstream__deadline',
  WorkstreamId = 'workstream__id',
  WorkstreamName = 'workstream__name',
  WorkstreamStatus = 'workstream__status',
  WorkstreamUri = 'workstream__uri'
}

export type WorkstreamContestation = {
  __typename?: 'WorkstreamContestation';
  id: Scalars['ID']['output'];
  uri: Scalars['String']['output'];
  user: User;
  workstream: Workstream;
};

export type WorkstreamContestation_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<WorkstreamContestation_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<WorkstreamContestation_Filter>>>;
  uri?: InputMaybe<Scalars['String']['input']>;
  uri_contains?: InputMaybe<Scalars['String']['input']>;
  uri_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_ends_with?: InputMaybe<Scalars['String']['input']>;
  uri_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_gt?: InputMaybe<Scalars['String']['input']>;
  uri_gte?: InputMaybe<Scalars['String']['input']>;
  uri_in?: InputMaybe<Array<Scalars['String']['input']>>;
  uri_lt?: InputMaybe<Scalars['String']['input']>;
  uri_lte?: InputMaybe<Scalars['String']['input']>;
  uri_not?: InputMaybe<Scalars['String']['input']>;
  uri_not_contains?: InputMaybe<Scalars['String']['input']>;
  uri_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  uri_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  uri_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  uri_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_starts_with?: InputMaybe<Scalars['String']['input']>;
  uri_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['String']['input']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']['input']>;
  user_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_gt?: InputMaybe<Scalars['String']['input']>;
  user_gte?: InputMaybe<Scalars['String']['input']>;
  user_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_lt?: InputMaybe<Scalars['String']['input']>;
  user_lte?: InputMaybe<Scalars['String']['input']>;
  user_not?: InputMaybe<Scalars['String']['input']>;
  user_not_contains?: InputMaybe<Scalars['String']['input']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  user_starts_with?: InputMaybe<Scalars['String']['input']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream?: InputMaybe<Scalars['String']['input']>;
  workstream_?: InputMaybe<Workstream_Filter>;
  workstream_contains?: InputMaybe<Scalars['String']['input']>;
  workstream_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_ends_with?: InputMaybe<Scalars['String']['input']>;
  workstream_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_gt?: InputMaybe<Scalars['String']['input']>;
  workstream_gte?: InputMaybe<Scalars['String']['input']>;
  workstream_in?: InputMaybe<Array<Scalars['String']['input']>>;
  workstream_lt?: InputMaybe<Scalars['String']['input']>;
  workstream_lte?: InputMaybe<Scalars['String']['input']>;
  workstream_not?: InputMaybe<Scalars['String']['input']>;
  workstream_not_contains?: InputMaybe<Scalars['String']['input']>;
  workstream_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  workstream_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  workstream_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  workstream_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_starts_with?: InputMaybe<Scalars['String']['input']>;
  workstream_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum WorkstreamContestation_OrderBy {
  Id = 'id',
  Uri = 'uri',
  User = 'user',
  UserFuxer = 'user__fuxer',
  UserId = 'user__id',
  Workstream = 'workstream',
  WorkstreamDeadline = 'workstream__deadline',
  WorkstreamId = 'workstream__id',
  WorkstreamName = 'workstream__name',
  WorkstreamStatus = 'workstream__status',
  WorkstreamUri = 'workstream__uri'
}

export type WorkstreamContributor = {
  __typename?: 'WorkstreamContributor';
  active?: Maybe<Scalars['Boolean']['output']>;
  commitment?: Maybe<Scalars['BigInt']['output']>;
  contributor: User;
  id: Scalars['ID']['output'];
  workstream: Workstream;
};

export type WorkstreamContributor_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  active?: InputMaybe<Scalars['Boolean']['input']>;
  active_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  active_not?: InputMaybe<Scalars['Boolean']['input']>;
  active_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  and?: InputMaybe<Array<InputMaybe<WorkstreamContributor_Filter>>>;
  commitment?: InputMaybe<Scalars['BigInt']['input']>;
  commitment_gt?: InputMaybe<Scalars['BigInt']['input']>;
  commitment_gte?: InputMaybe<Scalars['BigInt']['input']>;
  commitment_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  commitment_lt?: InputMaybe<Scalars['BigInt']['input']>;
  commitment_lte?: InputMaybe<Scalars['BigInt']['input']>;
  commitment_not?: InputMaybe<Scalars['BigInt']['input']>;
  commitment_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  contributor?: InputMaybe<Scalars['String']['input']>;
  contributor_?: InputMaybe<User_Filter>;
  contributor_contains?: InputMaybe<Scalars['String']['input']>;
  contributor_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contributor_ends_with?: InputMaybe<Scalars['String']['input']>;
  contributor_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contributor_gt?: InputMaybe<Scalars['String']['input']>;
  contributor_gte?: InputMaybe<Scalars['String']['input']>;
  contributor_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contributor_lt?: InputMaybe<Scalars['String']['input']>;
  contributor_lte?: InputMaybe<Scalars['String']['input']>;
  contributor_not?: InputMaybe<Scalars['String']['input']>;
  contributor_not_contains?: InputMaybe<Scalars['String']['input']>;
  contributor_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contributor_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  contributor_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contributor_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contributor_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  contributor_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contributor_starts_with?: InputMaybe<Scalars['String']['input']>;
  contributor_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<WorkstreamContributor_Filter>>>;
  workstream?: InputMaybe<Scalars['String']['input']>;
  workstream_?: InputMaybe<Workstream_Filter>;
  workstream_contains?: InputMaybe<Scalars['String']['input']>;
  workstream_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_ends_with?: InputMaybe<Scalars['String']['input']>;
  workstream_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_gt?: InputMaybe<Scalars['String']['input']>;
  workstream_gte?: InputMaybe<Scalars['String']['input']>;
  workstream_in?: InputMaybe<Array<Scalars['String']['input']>>;
  workstream_lt?: InputMaybe<Scalars['String']['input']>;
  workstream_lte?: InputMaybe<Scalars['String']['input']>;
  workstream_not?: InputMaybe<Scalars['String']['input']>;
  workstream_not_contains?: InputMaybe<Scalars['String']['input']>;
  workstream_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  workstream_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  workstream_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  workstream_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  workstream_starts_with?: InputMaybe<Scalars['String']['input']>;
  workstream_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum WorkstreamContributor_OrderBy {
  Active = 'active',
  Commitment = 'commitment',
  Contributor = 'contributor',
  ContributorFuxer = 'contributor__fuxer',
  ContributorId = 'contributor__id',
  Id = 'id',
  Workstream = 'workstream',
  WorkstreamDeadline = 'workstream__deadline',
  WorkstreamId = 'workstream__id',
  WorkstreamName = 'workstream__name',
  WorkstreamStatus = 'workstream__status',
  WorkstreamUri = 'workstream__uri'
}

export enum WorkstreamStatus {
  Closed = 'Closed',
  Evaluation = 'Evaluation',
  Started = 'Started'
}

export type Workstream_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Workstream_Filter>>>;
  contestings_?: InputMaybe<WorkstreamContestation_Filter>;
  contributors_?: InputMaybe<WorkstreamContributor_Filter>;
  coordinator?: InputMaybe<Scalars['String']['input']>;
  coordinator_?: InputMaybe<User_Filter>;
  coordinator_contains?: InputMaybe<Scalars['String']['input']>;
  coordinator_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  coordinator_ends_with?: InputMaybe<Scalars['String']['input']>;
  coordinator_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  coordinator_gt?: InputMaybe<Scalars['String']['input']>;
  coordinator_gte?: InputMaybe<Scalars['String']['input']>;
  coordinator_in?: InputMaybe<Array<Scalars['String']['input']>>;
  coordinator_lt?: InputMaybe<Scalars['String']['input']>;
  coordinator_lte?: InputMaybe<Scalars['String']['input']>;
  coordinator_not?: InputMaybe<Scalars['String']['input']>;
  coordinator_not_contains?: InputMaybe<Scalars['String']['input']>;
  coordinator_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  coordinator_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  coordinator_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  coordinator_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  coordinator_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  coordinator_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  coordinator_starts_with?: InputMaybe<Scalars['String']['input']>;
  coordinator_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deadline?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_gt?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_gte?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  deadline_lt?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_lte?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_not?: InputMaybe<Scalars['BigInt']['input']>;
  deadline_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  evaluations_?: InputMaybe<Evaluation_Filter>;
  funding_?: InputMaybe<WorkstreamBalance_Filter>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Workstream_Filter>>>;
  rewardDistribution?: InputMaybe<Scalars['String']['input']>;
  rewardDistribution_?: InputMaybe<RewardDistribution_Filter>;
  rewardDistribution_contains?: InputMaybe<Scalars['String']['input']>;
  rewardDistribution_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  rewardDistribution_ends_with?: InputMaybe<Scalars['String']['input']>;
  rewardDistribution_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  rewardDistribution_gt?: InputMaybe<Scalars['String']['input']>;
  rewardDistribution_gte?: InputMaybe<Scalars['String']['input']>;
  rewardDistribution_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rewardDistribution_lt?: InputMaybe<Scalars['String']['input']>;
  rewardDistribution_lte?: InputMaybe<Scalars['String']['input']>;
  rewardDistribution_not?: InputMaybe<Scalars['String']['input']>;
  rewardDistribution_not_contains?: InputMaybe<Scalars['String']['input']>;
  rewardDistribution_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  rewardDistribution_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  rewardDistribution_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  rewardDistribution_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rewardDistribution_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  rewardDistribution_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  rewardDistribution_starts_with?: InputMaybe<Scalars['String']['input']>;
  rewardDistribution_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<WorkstreamStatus>;
  status_in?: InputMaybe<Array<WorkstreamStatus>>;
  status_not?: InputMaybe<WorkstreamStatus>;
  status_not_in?: InputMaybe<Array<WorkstreamStatus>>;
  uri?: InputMaybe<Scalars['String']['input']>;
  uri_contains?: InputMaybe<Scalars['String']['input']>;
  uri_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_ends_with?: InputMaybe<Scalars['String']['input']>;
  uri_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_gt?: InputMaybe<Scalars['String']['input']>;
  uri_gte?: InputMaybe<Scalars['String']['input']>;
  uri_in?: InputMaybe<Array<Scalars['String']['input']>>;
  uri_lt?: InputMaybe<Scalars['String']['input']>;
  uri_lte?: InputMaybe<Scalars['String']['input']>;
  uri_not?: InputMaybe<Scalars['String']['input']>;
  uri_not_contains?: InputMaybe<Scalars['String']['input']>;
  uri_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  uri_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  uri_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  uri_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  uri_starts_with?: InputMaybe<Scalars['String']['input']>;
  uri_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Workstream_OrderBy {
  Contestings = 'contestings',
  Contributors = 'contributors',
  Coordinator = 'coordinator',
  CoordinatorFuxer = 'coordinator__fuxer',
  CoordinatorId = 'coordinator__id',
  Deadline = 'deadline',
  Evaluations = 'evaluations',
  Funding = 'funding',
  Id = 'id',
  Name = 'name',
  RewardDistribution = 'rewardDistribution',
  RewardDistributionId = 'rewardDistribution__id',
  Status = 'status',
  Uri = 'uri'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type EvaluationFragmentFragment = { __typename?: 'Evaluation', rating: any, contributor: { __typename?: 'User', id: string }, creator: { __typename?: 'User', id: string } } & { ' $fragmentName'?: 'EvaluationFragmentFragment' };

export type TokenFragmentFragment = { __typename?: 'Token', id: string, decimals?: any | null, name?: string | null, symbol?: string | null, tokenID?: any | null } & { ' $fragmentName'?: 'TokenFragmentFragment' };

export type BalancesByUserQueryVariables = Exact<{
  address?: InputMaybe<Scalars['ID']['input']>;
}>;


export type BalancesByUserQuery = { __typename?: 'Query', userBalances: Array<{ __typename?: 'UserBalance', amount: any, token: (
      { __typename?: 'Token' }
      & { ' $fragmentRefs'?: { 'TokenFragmentFragment': TokenFragmentFragment } }
    ) }> };

export type BalancesByWorkstreamQueryVariables = Exact<{
  workstreamID?: InputMaybe<Scalars['ID']['input']>;
}>;


export type BalancesByWorkstreamQuery = { __typename?: 'Query', workstreams: Array<{ __typename?: 'Workstream', funding?: Array<{ __typename?: 'WorkstreamBalance', amount: any, token: (
        { __typename?: 'Token' }
        & { ' $fragmentRefs'?: { 'TokenFragmentFragment': TokenFragmentFragment } }
      ) }> | null }> };

export type EvaluationsByWorkstreamIdQueryVariables = Exact<{
  workstreamID?: InputMaybe<Scalars['ID']['input']>;
}>;


export type EvaluationsByWorkstreamIdQuery = { __typename?: 'Query', evaluations: Array<(
    { __typename?: 'Evaluation' }
    & { ' $fragmentRefs'?: { 'EvaluationOverviewFragment': EvaluationOverviewFragment } }
  )> };

export type EvaluationOverviewFragment = { __typename?: 'Evaluation', id: string, rating: any, creator: { __typename?: 'User', id: string, evaluations?: Array<(
      { __typename?: 'Evaluation' }
      & { ' $fragmentRefs'?: { 'EvaluationFragmentFragment': EvaluationFragmentFragment } }
    )> | null, workstreams?: Array<{ __typename?: 'WorkstreamContributor', id: string }> | null }, contributor: { __typename?: 'User', id: string, evaluations?: Array<(
      { __typename?: 'Evaluation' }
      & { ' $fragmentRefs'?: { 'EvaluationFragmentFragment': EvaluationFragmentFragment } }
    )> | null } } & { ' $fragmentName'?: 'EvaluationOverviewFragment' };

export type UserByAddressQueryVariables = Exact<{
  address?: InputMaybe<Scalars['ID']['input']>;
}>;


export type UserByAddressQuery = { __typename?: 'Query', user?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ) | null };

export type WorkstreamContributorFragmentFragment = { __typename?: 'WorkstreamContributor', id: string, commitment?: any | null, active?: boolean | null } & { ' $fragmentName'?: 'WorkstreamContributorFragmentFragment' };

export type UserBalanceFragmentFragment = { __typename?: 'UserBalance', amount: any, id: string, token: (
    { __typename?: 'Token' }
    & { ' $fragmentRefs'?: { 'TokenFragmentFragment': TokenFragmentFragment } }
  ) } & { ' $fragmentName'?: 'UserBalanceFragmentFragment' };

export type UserFragmentFragment = { __typename?: 'User', fuxer: boolean, id: string, balances?: Array<(
    { __typename?: 'UserBalance' }
    & { ' $fragmentRefs'?: { 'UserBalanceFragmentFragment': UserBalanceFragmentFragment } }
  )> | null, workstreams?: Array<(
    { __typename?: 'WorkstreamContributor' }
    & { ' $fragmentRefs'?: { 'WorkstreamContributorFragmentFragment': WorkstreamContributorFragmentFragment } }
  )> | null } & { ' $fragmentName'?: 'UserFragmentFragment' };

export type WorkstreamsByContributorQueryVariables = Exact<{
  address?: InputMaybe<Scalars['ID']['input']>;
}>;


export type WorkstreamsByContributorQuery = { __typename?: 'Query', workstreamContributors: Array<(
    { __typename?: 'WorkstreamContributor' }
    & { ' $fragmentRefs'?: { 'WorkstreamFragmentFragment': WorkstreamFragmentFragment } }
  )> };

export type WorkstreamByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type WorkstreamByIdQuery = { __typename?: 'Query', workstreamContributors: Array<(
    { __typename?: 'WorkstreamContributor' }
    & { ' $fragmentRefs'?: { 'WorkstreamFragmentFragment': WorkstreamFragmentFragment } }
  )> };

export type RewardDistributionFragmentFragment = { __typename?: 'RewardDistribution', shares: Array<any>, id: string, contributors: Array<{ __typename?: 'User', id: string }> } & { ' $fragmentName'?: 'RewardDistributionFragmentFragment' };

export type ContributorFragmentFragment = { __typename?: 'WorkstreamContributor', commitment?: any | null, active?: boolean | null, contributor: { __typename?: 'User', id: string } } & { ' $fragmentName'?: 'ContributorFragmentFragment' };

export type WorkstreamFragmentFragment = { __typename?: 'WorkstreamContributor', workstream: { __typename?: 'Workstream', id: string, name?: string | null, deadline?: any | null, status?: WorkstreamStatus | null, uri?: string | null, coordinator?: { __typename?: 'User', id: string } | null, contributors?: Array<(
      { __typename?: 'WorkstreamContributor' }
      & { ' $fragmentRefs'?: { 'ContributorFragmentFragment': ContributorFragmentFragment } }
    )> | null, evaluations?: Array<(
      { __typename?: 'Evaluation' }
      & { ' $fragmentRefs'?: { 'EvaluationFragmentFragment': EvaluationFragmentFragment } }
    )> | null, funding?: Array<{ __typename?: 'WorkstreamBalance', amount: any, token: (
        { __typename?: 'Token' }
        & { ' $fragmentRefs'?: { 'TokenFragmentFragment': TokenFragmentFragment } }
      ) }> | null, rewardDistribution?: (
      { __typename?: 'RewardDistribution' }
      & { ' $fragmentRefs'?: { 'RewardDistributionFragmentFragment': RewardDistributionFragmentFragment } }
    ) | null } } & { ' $fragmentName'?: 'WorkstreamFragmentFragment' };

export const EvaluationFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvaluationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Evaluation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contributor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<EvaluationFragmentFragment, unknown>;
export const EvaluationOverviewFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvaluationOverview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Evaluation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"evaluations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"workstream_"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workstreamID"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvaluationFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"workstreams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"workstream_"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workstreamID"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"contributor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"evaluations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"workstream_"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workstreamID"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvaluationFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvaluationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Evaluation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contributor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<EvaluationOverviewFragment, unknown>;
export const TokenFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TokenFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"tokenID"}}]}}]} as unknown as DocumentNode<TokenFragmentFragment, unknown>;
export const UserBalanceFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBalanceFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserBalance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TokenFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TokenFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"tokenID"}}]}}]} as unknown as DocumentNode<UserBalanceFragmentFragment, unknown>;
export const WorkstreamContributorFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkstreamContributorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkstreamContributor"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"commitment"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]} as unknown as DocumentNode<WorkstreamContributorFragmentFragment, unknown>;
export const UserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"balances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBalanceFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fuxer"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"workstreams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contributor_"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkstreamContributorFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TokenFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"tokenID"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBalanceFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserBalance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TokenFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkstreamContributorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkstreamContributor"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"commitment"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}}]} as unknown as DocumentNode<UserFragmentFragment, unknown>;
export const ContributorFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContributorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkstreamContributor"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commitment"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"contributor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ContributorFragmentFragment, unknown>;
export const RewardDistributionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RewardDistributionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RewardDistribution"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contributors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<RewardDistributionFragmentFragment, unknown>;
export const WorkstreamFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkstreamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkstreamContributor"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workstream"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"coordinator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contributors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContributorFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}},{"kind":"Field","name":{"kind":"Name","value":"evaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvaluationFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"funding"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TokenFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardDistribution"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RewardDistributionFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContributorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkstreamContributor"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commitment"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"contributor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvaluationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Evaluation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contributor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TokenFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"tokenID"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RewardDistributionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RewardDistribution"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contributors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<WorkstreamFragmentFragment, unknown>;
export const BalancesByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BalancesByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userBalances"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TokenFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TokenFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"tokenID"}}]}}]} as unknown as DocumentNode<BalancesByUserQuery, BalancesByUserQueryVariables>;
export const BalancesByWorkstreamDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BalancesByWorkstream"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workstreamID"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workstreams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"funding"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workstreamID"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TokenFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TokenFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"tokenID"}}]}}]} as unknown as DocumentNode<BalancesByWorkstreamQuery, BalancesByWorkstreamQueryVariables>;
export const EvaluationsByWorkstreamIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EvaluationsByWorkstreamID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workstreamID"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"evaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvaluationOverview"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvaluationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Evaluation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contributor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvaluationOverview"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Evaluation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"evaluations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"workstream_"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workstreamID"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvaluationFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"workstreams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"workstream_"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workstreamID"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"contributor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"evaluations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"workstream_"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workstreamID"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvaluationFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<EvaluationsByWorkstreamIdQuery, EvaluationsByWorkstreamIdQueryVariables>;
export const UserByAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserByAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TokenFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"tokenID"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserBalanceFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserBalance"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TokenFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkstreamContributorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkstreamContributor"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"commitment"}},{"kind":"Field","name":{"kind":"Name","value":"active"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"balances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserBalanceFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fuxer"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"workstreams"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contributor_"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkstreamContributorFragment"}}]}}]}}]} as unknown as DocumentNode<UserByAddressQuery, UserByAddressQueryVariables>;
export const WorkstreamsByContributorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkstreamsByContributor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workstreamContributors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"contributor_"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkstreamFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContributorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkstreamContributor"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commitment"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"contributor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvaluationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Evaluation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contributor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TokenFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"tokenID"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RewardDistributionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RewardDistribution"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contributors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkstreamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkstreamContributor"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workstream"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"coordinator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contributors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContributorFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}},{"kind":"Field","name":{"kind":"Name","value":"evaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvaluationFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"funding"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TokenFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardDistribution"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RewardDistributionFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]}}]} as unknown as DocumentNode<WorkstreamsByContributorQuery, WorkstreamsByContributorQueryVariables>;
export const WorkstreamByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WorkstreamByID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workstreamContributors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"workstream_"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkstreamFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContributorFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkstreamContributor"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commitment"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"contributor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvaluationFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Evaluation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contributor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TokenFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Token"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"tokenID"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RewardDistributionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RewardDistribution"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contributors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shares"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkstreamFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WorkstreamContributor"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workstream"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"coordinator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contributors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContributorFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deadline"}},{"kind":"Field","name":{"kind":"Name","value":"evaluations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvaluationFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"funding"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TokenFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardDistribution"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RewardDistributionFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"uri"}}]}}]}}]} as unknown as DocumentNode<WorkstreamByIdQuery, WorkstreamByIdQueryVariables>;