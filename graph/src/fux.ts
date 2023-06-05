import {
  ContributorsUpdated,
  EvaluationSubmitted,
  FUX,
  FuxClaimed,
  FuxGiven,
  FuxWithdrawn,
  StateUpdated,
  TransferSingle,
  UpdatedWorkstreamURI,
  WorkstreamMinted,
  WorkstreamClosed,
  WorkstreamContested,
} from "../generated/FUX/FUX";
import { User, Workstream, Evaluation } from "../generated/schema";
import { ZERO_ADDRESS } from "./utils/constants";
import {
  getOrCreate1155Token,
  getOrCreateUserBalance,
  getOrCreateWorkstreamBalance,
  getOrCreateUser,
  getOrCreateWorkstream,
  getOrCreateWorkstreamContestation,
  getOrCreateWorkstreamContributor,
  getStateFromInt,
  getOrCreateERC20Token,
  getOrCreateRewardDistribution,
} from "./utils/helpers";
import { BigInt, log } from "@graphprotocol/graph-ts";

//TODO error handling and logging

export function handleContributorsUpdates(event: ContributorsUpdated): void {
  let workstream = getOrCreateWorkstream(event.params.workstreamID);
  let contributors = event.params.contributors.map<User>((contributor) =>
    getOrCreateUser(contributor.toHexString())
  );

  for (let i = 0; i < contributors.length; i++) {
    let contributor = getOrCreateWorkstreamContributor(
      contributors[i],
      workstream
    );
    contributor.active = event.params.add;
    contributor.save();
  }
}

export function handleEvaluationSubmitted(event: EvaluationSubmitted): void {
  let workstream = getOrCreateWorkstream(event.params.workstreamID);
  let contributors = event.params.contributors;
  let creator = getOrCreateUser(event.params.creator.toHexString());

  for (let i = 0; i < contributors.length; i++) {
    let cont = getOrCreateUser(contributors[i].toHexString());

    let evaluationID = creator.id + "-" + workstream.id + "-" + cont.id;
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
}

export function handleFuxGiven(event: FuxGiven): void {
  let contributor = getOrCreateUser(event.params.user.toHexString());
  let workstream = getOrCreateWorkstream(event.params.workstreamID);
  let workstreamContributor = getOrCreateWorkstreamContributor(
    contributor,
    workstream
  );

  workstreamContributor.commitment = event.params.amount;
  workstreamContributor.save();
}

export function handleFuxWithdrawn(event: FuxWithdrawn): void {
  let contributor = getOrCreateUser(event.params.user.toHexString());
  let workstream = getOrCreateWorkstream(event.params.workstreamID);
  let workstreamContributor = getOrCreateWorkstreamContributor(
    contributor,
    workstream
  );

  workstreamContributor.commitment = BigInt.fromI32(0);
  workstreamContributor.save();
}

export function handleTransferSingle(event: TransferSingle): void {
  let token = getOrCreate1155Token(
    event.address.toHexString(),
    event.params.id
  );

  let recipient = getOrCreateUser(event.params.to.toHexString());
  let tokenBalanceRecipient = getOrCreateUserBalance(recipient, token);

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
  let tokenBalanceSender = getOrCreateUserBalance(sender, token);

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

export function handleWorkstreamClosed(event: WorkstreamClosed): void {
  let workstream = getOrCreateWorkstream(event.params.workstreamID);
  let distribution = getOrCreateRewardDistribution(event);
  workstream.rewardDistribution = distribution.id;
  workstream.status = "Closed";
  workstream.save();
}

export function handleWorkstreamMinted(event: WorkstreamMinted): void {
  let contract = FUX.bind(event.address);
  let wsOnChain = contract.getWorkstream(event.params.workstreamID);

  let coordinator = getOrCreateUser(event.transaction.from.toHexString());

  let workstream = new Workstream(event.params.workstreamID.toString());
  workstream.coordinator = coordinator.id;
  workstream.deadline = event.params.deadline;
  workstream.name = wsOnChain.name;
  workstream.uri = event.params.metadataUri;

  workstream.status = "Started";

  // for loop to map tokens and amounts
  for (let i = 0; i < event.params.rewardsToken.length; i++) {
    let token = getOrCreateERC20Token(
      event.params.rewardsToken[i].toHexString()
    );
    let tokenBalance = getOrCreateWorkstreamBalance(workstream, token);
    tokenBalance.amount = event.params.rewards[i];
    tokenBalance.save();
  }

  workstream.save();
}

export function handleWorkstreamContested(event: WorkstreamContested): void {
  let workstream = getOrCreateWorkstream(event.params.workstreamID);
  let user = getOrCreateUser(event.params.user.toHexString());
  let contestation = getOrCreateWorkstreamContestation(user, workstream);

  contestation.uri = event.params.uri;
  contestation.save();
}

export function handleStateUpdated(event: StateUpdated): void {
  let workstream = getOrCreateWorkstream(event.params.workstreamID);
  let status = getStateFromInt(BigInt.fromI32(event.params.state));

  if (status && status != workstream.status) {
    workstream.status = status;
    workstream.save();
  }
}

export function handleUpdatedWorkstreamUri(event: UpdatedWorkstreamURI): void {
  let workstream = getOrCreateWorkstream(event.params.workstreamID);
  workstream.uri = event.params.uri;
  workstream.save();
}
