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

/**
 * Handles updates to the contributors of a workstream.
 * @param event The event containing the updated contributors.
 */
export function handleContributorsUpdates(event: ContributorsUpdated): void {
  // Get or create the workstream associated with the event.
  let workstream = getOrCreateWorkstream(event.params.workstreamID);

  // Get or create the users associated with the updated contributors.
  let contributors = event.params.contributors.map<User>((contributor) =>
    getOrCreateUser(contributor.toHexString())
  );

  // Update the active status of each contributor on the workstream.
  for (let i = 0; i < contributors.length; i++) {
    let contributor = getOrCreateWorkstreamContributor(
      contributors[i],
      workstream
    );
    contributor.active = event.params.add;
    contributor.save();
  }
}

/**
 * Handles the submission of an evaluation for a workstream.
 * @param event The event containing the submitted evaluation.
 */
export function handleEvaluationSubmitted(event: EvaluationSubmitted): void {
  // Get or create the workstream associated with the event.
  let workstream = getOrCreateWorkstream(event.params.workstreamID);

  // Get or create the users associated with the creator and contributors of the evaluation.
  let contributors = event.params.contributors;
  let creator = getOrCreateUser(event.params.creator.toHexString());

  // Create an evaluation for each contributor.
  for (let i = 0; i < contributors.length; i++) {
    let cont = getOrCreateUser(contributors[i].toHexString());

    // Create a unique ID for the evaluation.
    let evaluationID = creator.id + "-" + workstream.id + "-" + cont.id;

    // Create and save the evaluation.
    let evaluation = new Evaluation(evaluationID);
    evaluation.creator = creator.id;
    evaluation.workstream = workstream.id;
    evaluation.contributor = cont.id;
    evaluation.rating = event.params.ratings[i];
    evaluation.save();
  }
}

/**
 * Handles the claiming of FUX tokens by a user.
 * @param event The event containing the claimed FUX tokens.
 */
export function handleFuxClaimed(event: FuxClaimed): void {
  // Get or create the user associated with the event.
  let user = getOrCreateUser(event.params.user.toHexString());

  // Set the user's fuxer status to true and save the user.
  user.fuxer = true;
  user.save();
}

/**
 * Handles the giving of FUX tokens to a contributor on a workstream.
 * @param event The event containing the given FUX tokens.
 */
export function handleFuxGiven(event: FuxGiven): void {
  // Get or create the user and workstream associated with the event.
  let contributor = getOrCreateUser(event.params.user.toHexString());
  let workstream = getOrCreateWorkstream(event.params.workstreamID);

  // Get or create the workstream contributor associated with the user and workstream.
  let workstreamContributor = getOrCreateWorkstreamContributor(
    contributor,
    workstream
  );

  // Set the workstream contributor's commitment to the given amount and save the workstream contributor.
  workstreamContributor.commitment = event.params.amount;
  workstreamContributor.save();
}

/**
 * Handles the withdrawal of FUX tokens by a contributor on a workstream.
 * @param event The event containing the withdrawn FUX tokens.
 */
export function handleFuxWithdrawn(event: FuxWithdrawn): void {
  // Get or create the user and workstream associated with the event.
  let contributor = getOrCreateUser(event.params.user.toHexString());
  let workstream = getOrCreateWorkstream(event.params.workstreamID);

  // Get or create the workstream contributor associated with the user and workstream.
  let workstreamContributor = getOrCreateWorkstreamContributor(
    contributor,
    workstream
  );

  // Set the workstream contributor's commitment to zero and save the workstream contributor.
  workstreamContributor.commitment = BigInt.fromI32(0);
  workstreamContributor.save();
}

/**
 * Handles a single token transfer event.
 * @param event The event containing the transfer information.
 */
export function handleTransferSingle(event: TransferSingle): void {
  // Get or create the token associated with the event.
  let token = getOrCreate1155Token(
    event.address.toHexString(),
    event.params.id
  );

  // Get or create the recipient user and their token balance.
  let recipient = getOrCreateUser(event.params.to.toHexString());
  let tokenBalanceRecipient = getOrCreateUserBalance(recipient, token);

  // Mint
  if (event.params.from == ZERO_ADDRESS) {
    // Increase the recipient's token balance by the transferred amount and save the balance.
    tokenBalanceRecipient.amount = tokenBalanceRecipient.amount.plus(
      event.params.value
    );
    tokenBalanceRecipient.save();
    return;
  }

  // Transfer
  // Get or create the sender user and their token balance.
  let sender = getOrCreateUser(event.params.from.toHexString());
  let tokenBalanceSender = getOrCreateUserBalance(sender, token);

  // Deposit to contract
  if (event.params.to == event.address) {
    // Decrease the sender's token balance by the transferred amount and save the balance.
    tokenBalanceSender.amount = tokenBalanceSender.amount.minus(
      event.params.value
    );
    tokenBalanceSender.save();
  }

  // Returned from contract
  if (event.params.from == event.address) {
    // Increase the recipient's token balance by the transferred amount and save the balance.
    tokenBalanceRecipient.amount = tokenBalanceRecipient.amount.plus(
      event.params.value
    );
    tokenBalanceRecipient.save();
  }

  // Transfer between users
  if (event.params.from != event.address && event.params.to != event.address) {
    // Decrease the sender's token balance by the transferred amount and save the balance.
    tokenBalanceSender.amount = tokenBalanceSender.amount.minus(
      event.params.value
    );

    // Increase the recipient's token balance by the transferred amount and save the balance.
    tokenBalanceRecipient.amount = tokenBalanceRecipient.amount.plus(
      event.params.value
    );

    // Save both token balances.
    tokenBalanceSender.save();
    tokenBalanceRecipient.save();
  }
}

/**
 * Handles the closing of a workstream.
 * @param event The event containing the workstream ID.
 */
export function handleWorkstreamClosed(event: WorkstreamClosed): void {
  // Get or create the workstream associated with the event.
  let workstream = getOrCreateWorkstream(event.params.workstreamID);

  // Get or create the reward distribution associated with the event.
  let distribution = getOrCreateRewardDistribution(event);

  // Set the workstream's reward distribution and status to "Closed", and save the workstream.
  workstream.rewardDistribution = distribution.id;
  workstream.status = "Closed";
  workstream.save();
}

/**
 * Handles the minting of a workstream.
 * @param event The event containing the workstream information.
 */
export function handleWorkstreamMinted(event: WorkstreamMinted): void {
  // Get the FUX contract instance.
  let contract = FUX.bind(event.address);

  // Get the workstream information from the contract.
  let wsOnChain = contract.getWorkstream(event.params.workstreamID);

  // Get or create the coordinator user associated with the transaction.
  let coordinator = getOrCreateUser(event.transaction.from.toHexString());

  // Get or create the workstream associated with the event.
  let workstream = new Workstream(event.params.workstreamID.toString());

  // Set the workstream's coordinator, deadline, name, URI, and status to "Started".
  workstream.coordinator = coordinator.id;
  workstream.deadline = event.params.deadline;
  workstream.name = wsOnChain.name;
  workstream.uri = event.params.metadataUri;
  workstream.status = "Started";

  // Map tokens and amounts to workstream balances.
  for (let i = 0; i < event.params.rewardsToken.length; i++) {
    let token = getOrCreateERC20Token(
      event.params.rewardsToken[i].toHexString()
    );
    let tokenBalance = getOrCreateWorkstreamBalance(workstream, token);
    tokenBalance.amount = event.params.rewards[i];
    tokenBalance.save();
  }

  // Save the workstream.
  workstream.save();
}

/**
 * Handles the contestation of a workstream.
 * @param event The event containing the contestation information.
 */
export function handleWorkstreamContested(event: WorkstreamContested): void {
  // Get or create the workstream associated with the event.
  let workstream = getOrCreateWorkstream(event.params.workstreamID);

  // Get or create the user associated with the contestation.
  let user = getOrCreateUser(event.params.user.toHexString());

  // Get or create the workstream contestation associated with the user and workstream.
  let contestation = getOrCreateWorkstreamContestation(user, workstream);

  // Set the contestation URI and save the contestation.
  contestation.uri = event.params.uri;
  contestation.save();
}

/**
 * Handles the update of a workstream's state.
 * @param event The event containing the workstream ID and state.
 */
export function handleStateUpdated(event: StateUpdated): void {
  // Get or create the workstream associated with the event.
  let workstream = getOrCreateWorkstream(event.params.workstreamID);

  // Get the state from the event and convert it to a string.
  let status = getStateFromInt(BigInt.fromI32(event.params.state));

  // If the status is valid and different from the workstream's current status, update the workstream's status and save it.
  if (status && status != workstream.status) {
    workstream.status = status;
    workstream.save();
  }
}

/**
 * Handles the update of a workstream's URI.
 * @param event The event containing the workstream ID and URI.
 */
export function handleUpdatedWorkstreamUri(event: UpdatedWorkstreamURI): void {
  // Get or create the workstream associated with the event.
  let workstream = getOrCreateWorkstream(event.params.workstreamID);

  // Set the workstream's URI and save it.
  workstream.uri = event.params.uri;
  workstream.save();
}
