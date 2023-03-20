import {
  ContributorsAdded,
  EvaluationSubmitted,
  FuxClaimed,
  FuxGiven,
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
} from "../generated/schema";
import { FUX_TOKEN, ZERO_ADDRESS, VFUX_TOKEN } from "./utils/constants";
import {
  getOrCreateToken,
  getOrCreateTokenBalance,
  getOrCreateUser,
  getOrCreateWorkstream,
  getOrCreateWorkstreamContributor,
} from "./utils/helpers";
import { BigInt } from "@graphprotocol/graph-ts";

//TODO error handling and logging

export function handleContributorsAdded(event: ContributorsAdded): void {
  let workstream = getOrCreateWorkstream(event.params.id);
  let contributors = event.params.contributors.map<User>((contributor) =>
    getOrCreateUser(contributor.toHexString())
  );

  for (let i = 0; i < contributors.length; i++) {
    getOrCreateWorkstreamContributor(contributors[i], workstream);
  }
}

export function handleEvaluationSubmitted(event: EvaluationSubmitted): void {
  let workstream = getOrCreateWorkstream(event.params.workstreamID);
  let contributors = event.params.contributors;
  let creator = getOrCreateUser(event.params.creator.toHexString());

  for (let i = 0; i < contributors.length; i++) {
    let cont = getOrCreateUser(contributors[i].toHexString());

    let evaluationID = creator.id.concat(workstream.id);

    let evaluation = new Evaluation(evaluationID);
    evaluation.creator = creator.id;
    evaluation.workstream = workstream.id;
    evaluation.contributor = cont.id;
    evaluation.rating = event.params.ratings[i];
    evaluation.save();
  }
}

export function handleFuxClaimed(event: FuxClaimed): void {
  let user = getOrCreateUser(event.params.user.toHexString());
  user.fuxer = true;
  user.save();

  let token = getOrCreateToken(FUX_TOKEN);

  let tokenBalance = getOrCreateTokenBalance(user, token);
  tokenBalance.amount = BigInt.fromI32(100);
  tokenBalance.save();
}

export function handleFuxGiven(event: FuxGiven): void {
  let contributor = getOrCreateUser(event.params.user.toHexString());
  let workstream = getOrCreateWorkstream(event.params.workstreamId);
  let workstreamContributor = getOrCreateWorkstreamContributor(
    contributor,
    workstream
  );

  workstreamContributor.commitment = event.params.amount;
  workstreamContributor.save();
}

export function handleTransfer(event: TransferSingle): void {
  let token = getOrCreateToken(event.params.id);

  let recipient = getOrCreateUser(event.params.to.toHexString());
  let tokenBalanceRecipient = getOrCreateTokenBalance(recipient, token);

  //Mint
  if (event.params.from == ZERO_ADDRESS) {
    tokenBalanceRecipient.amount = tokenBalanceRecipient.amount.plus(
      event.params.value
    );
    tokenBalanceRecipient.save();
    return;
  }

  // Transfer
  let sender = getOrCreateUser(event.params.from.toHexString());
  let tokenBalanceSender = getOrCreateTokenBalance(sender, token);

  // deposit to contract
  if (event.params.to == event.address) {
    tokenBalanceSender.amount = tokenBalanceSender.amount.minus(
      event.params.value
    );
    tokenBalanceSender.save();
  }

  // returned from contract
  if (event.params.from == event.address) {
    tokenBalanceRecipient.amount = tokenBalanceRecipient.amount.plus(
      event.params.value
    );
    tokenBalanceRecipient.save();
  }

  // Transfer between users
  if (event.params.from != event.address && event.params.to != event.address) {
    tokenBalanceSender.amount = tokenBalanceSender.amount.minus(
      event.params.value
    );
    tokenBalanceRecipient.amount = tokenBalanceRecipient.amount.plus(
      event.params.value
    );
    tokenBalanceSender.save();
    tokenBalanceRecipient.save();
  }
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
  let token = getOrCreateToken(VFUX_TOKEN);

  let tokenBalance = getOrCreateTokenBalance(user, token);
  tokenBalance.amount = BigInt.fromI32(100);
  tokenBalance.save();

  let workstream = getOrCreateWorkstream(event.params.workstreamID);
  workstream.status = "Evaluation";

  workstream.save();
}

export function handleWorkstreamClosed(event: WorkstreamClosed): void {
  let workstream = getOrCreateWorkstream(event.params.workstreamID);
  workstream.status = "Closed";
  workstream.save();
}

export function handleWorkstreamMinted(event: WorkstreamMinted): void {
  let contract = FUX.bind(event.address);
  let wsOnChain = contract.getWorkstream(event.params.id);

  let coordinator = getOrCreateUser(event.transaction.from.toHexString());

  let workstream = new Workstream(event.params.id.toString());
  workstream.coordinator = coordinator.id;
  workstream.funding = event.params.funds;
  workstream.deadline = event.params.deadline;
  workstream.name = wsOnChain.name;
  workstream.status = "Started";

  workstream.save();
}
