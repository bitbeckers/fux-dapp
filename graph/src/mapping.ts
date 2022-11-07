import {
  ContributorsAdded,
  EvaluationSubmitted,
  FuxClaimed,
  FuxGiven,
  FuxWithdraw,
  TransferSingle,
  VFuxClaimed,
  WorkstreamMinted,
  FUX,
  RewardsReserved,
  RewardsClaimed,
  WorkstreamClosed,
} from "../generated/FUX/FUX";
import {
  User,

  Workstream,
  Evaluation,
  UserWorkstream,
} from "../generated/schema";
import { FUX_TOKEN } from "./utils/constants";
import {
  getOrCreateFuxGiven,
  getOrCreateToken,
  getOrCreateTokenBalance,
  getOrCreateUser,
  getOrCreateUserWorkstreams,
  getOrCreateVFuxWorkstream,
  getOrCreateWorkstream,
} from "./utils/helpers";
import { BigInt } from "@graphprotocol/graph-ts";

//TODO error handling and logging

// workaround Closure error
let workstream: Workstream;

export function handleContributorsAdded(event: ContributorsAdded): void {
  workstream = getOrCreateWorkstream(event.params.id);
  let contributors = event.params.contributors.map<User>((contributor) =>
    getOrCreateUser(contributor.toHexString())
  );

  contributors.map<UserWorkstream>((contributor) =>
    getOrCreateUserWorkstreams(contributor, workstream)
  );
}

export function handleWorkstreamClosed(event: WorkstreamClosed): void {
  let workstream = getOrCreateWorkstream(event.params.workstreamID);
  workstream.resolved = true;
  workstream.save();
}

export function handleEvaluationSubmitted(event: EvaluationSubmitted): void {
  let user = getOrCreateUser(event.params.creator.toHexString());
  let workstream = getOrCreateWorkstream(event.params.workstreamID);

  let evaluationID = user.id.concat(workstream.id);
  let contributors = event.params.contributors.map<User>((contributor) =>
    getOrCreateUser(contributor.toHexString())
  );

  let evaluation = new Evaluation(evaluationID);
  evaluation.creator = user.id;
  evaluation.workstream = workstream.id;
  evaluation.contributors = contributors.map<string>(
    (contributor) => contributor.id
  );
  evaluation.ratings = event.params.ratings;
  evaluation.save();
}

export function handleFuxClaimed(event: FuxClaimed): void {
  let user = getOrCreateUser(event.params.user.toHexString());
  let token = getOrCreateToken(FUX_TOKEN);
  let tokenBalance = getOrCreateTokenBalance(user, token);

  tokenBalance.balance = BigInt.fromI32(100);
  tokenBalance.save();

  user.fuxer = true;
  user.save();
}

export function handleFuxGiven(event: FuxGiven): void {
  let user = getOrCreateUser(event.params.user.toHexString());
  let workstream = getOrCreateWorkstream(event.params.workstreamId);
  let fuxGiven = getOrCreateFuxGiven(user, workstream);

  fuxGiven.balance = event.params.amount;
  fuxGiven.save();
}

export function handleFuxWithdraw(event: FuxWithdraw): void {
  let user = getOrCreateUser(event.params.user.toHexString());
  let workstream = getOrCreateWorkstream(event.params.workstreamId);
  let fuxGiven = getOrCreateFuxGiven(user, workstream);

  fuxGiven.balance = fuxGiven.balance.minus(event.params.amount);
  fuxGiven.save();
}

export function handleTransfer(event: TransferSingle): void {
  let user = getOrCreateUser(event.transaction.from.toHexString());
  let token = getOrCreateToken(event.params.id);
  let tokenBalance = getOrCreateTokenBalance(user, token);

  // deposit to contract
  if (event.params.to == event.address) {
    tokenBalance.balance = tokenBalance.balance.minus(event.params.value);
  }

  // returned from contract
  if (event.params.to.toHexString() == user.id) {
    tokenBalance.balance = tokenBalance.balance.plus(event.params.value);
  }

  tokenBalance.save();
}

export function handleRewardsReserved(event: RewardsReserved): void {
  let user = getOrCreateUser(event.params.user.toHexString());
  let rewards = user.rewards;
  user.rewards = rewards
    ? rewards.plus(event.params.amount)
    : event.params.amount;

  user.save();
}

export function handleRewardsClaimed(event: RewardsClaimed): void {
  let user = getOrCreateUser(event.transaction.from.toHexString());
  user.rewards = BigInt.fromI32(0);
  user.save();
}

export function handleVFuxClaimed(event: VFuxClaimed): void {
  let user = getOrCreateUser(event.params.user.toHexString());
  let workstream = getOrCreateWorkstream(event.params.workstreamID);
  getOrCreateVFuxWorkstream(user, workstream);
}

export function handleWorkstreamMinted(event: WorkstreamMinted): void {
  let contract = FUX.bind(event.address);
  let wsOnChain = contract.getWorkstreamByID(event.params.id);

  let workstream = new Workstream(event.params.id.toString());
  workstream.coordinator = event.transaction.from.toHexString();
  workstream.funding = event.params.funds;
  workstream.deadline = event.params.deadline;
  workstream.name = wsOnChain.name;
  workstream.save();
}
