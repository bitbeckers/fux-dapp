// Test the mapping functions to create and update the desired entities
import {
  User,
  Workstream,
  Token,
  UserBalance,
  WorkstreamBalance,
  Evaluation,
} from "../generated/schema";
import {
  handleContributorsUpdates,
  handleEvaluationSubmitted,
  handleFuxClaimed,
  handleFuxGiven,
  handleFuxWithdrawn,
  handleStateUpdated,
  handleTransferSingle,
  handleUpdatedWorkstreamUri,
  handleWorkstreamClosed,
  handleWorkstreamContested,
  handleWorkstreamMinted,
} from "../src/fux";
import { FUX_TOKEN, ZERO_ADDRESS } from "../src/utils/constants";
import {
  getOrCreateUser,
  getOrCreateWorkstream,
  getOrCreate1155Token,
  getOrCreateERC20Token,
  getOrCreateUserBalance,
  getOrCreateWorkstreamBalance,
  getOrCreateWorkstreamContributor,
} from "../src/utils/helpers";
import {
  defaultAddress,
  getDefaultRewardToken,
  newFuxClaimedEvent,
  newWorkstreamMintedEvent,
  setUpWorkstream,
  setUpMockWorkstreamContractCall,
  newFuxGivenEvent,
  newFuxWithdrawnEvent,
  newContributorsUpdatedEvent,
  getAddressList,
  newEvaluationSubmittedEvent,
  newTransferSingleEvent,
  newWorkstreamClosedEvent,
  newWorkstreamContestedEvent,
  newStateUpdatedEvent,
  newUpdatedWorkstreamURIEvent,
  setUpMockERC20ContractCall,
} from "./utils";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  assert,
  describe,
  test,
  clearStore,
  afterEach,
  beforeAll,
  afterAll,
  log,
} from "matchstick-as";

// Test the mapping functions to create and update the desired entities

describe("FUX Workstreams", () => {
  afterEach(() => {
    clearStore();
  });
  test("should create a user when FUX are minted", () => {
    let address = defaultAddress();
    let event = newFuxClaimedEvent(address.toHexString());
    assert.entityCount("User", 0);

    handleFuxClaimed(event);

    assert.entityCount("User", 1);
    let user = User.load(address.toHexString());
    if (!user) {
      throw new Error("User not found");
    }
    assert.fieldEquals("User", user.id, "id", address.toHexString());
    assert.fieldEquals("User", user.id, "fuxer", "true");

    handleFuxClaimed(event);

    //And only once
    assert.entityCount("User", 1);
  });

  test("should create a workstream when WorkstreamMinted is detected including rewardTokens", () => {
    let workstreamID = BigInt.fromI32(1);
    let event = newWorkstreamMintedEvent(
      workstreamID,
      BigInt.fromI32(1), //deadline
      [getDefaultRewardToken()], //rewardTokens
      [BigInt.fromI32(30)], //rewardAmounts
      BigInt.fromI32(42), //totalRewardAmount
      "test.fux.gg" //uri
    );
    assert.entityCount("Workstream", 0);
    assert.entityCount("Token", 0);

    log.info("Workstream address: {}", [event.address.toHexString()]);

    setUpMockERC20ContractCall(getDefaultRewardToken());
    setUpMockWorkstreamContractCall(event.address, workstreamID);

    log.info("Workstream address: {}", [event.address.toHexString()]);

    handleWorkstreamMinted(event);

    assert.entityCount("Workstream", 1);
    assert.entityCount("Token", 1);

    let workstream = Workstream.load(workstreamID.toString());
    if (!workstream) {
      throw new Error("Workstream not found");
    }
    assert.fieldEquals(
      "Workstream",
      workstream.id,
      "id",
      workstreamID.toString()
    );
    assert.fieldEquals("Workstream", workstream.id, "uri", "test.fux.gg");
    assert.fieldEquals("Workstream", workstream.id, "deadline", "1");
    assert.fieldEquals("Workstream", workstream.id, "status", "Started");

    let token = Token.load(getDefaultRewardToken().toHexString());
    if (!token) {
      throw new Error("Token not found");
    }
    assert.fieldEquals(
      "Token",
      token.id,
      "id",
      getDefaultRewardToken().toHexString()
    );
  });

  test("stores the correct balances for a user when committing to a workstream, updating it and withdrawing", () => {
    let workstreamID = BigInt.fromI32(1);

    setUpWorkstream(workstreamID);

    assert.entityCount("WorkstreamContributor", 0);

    let claimFux = newFuxClaimedEvent(defaultAddress().toHexString());
    handleFuxClaimed(claimFux);

    let user = getOrCreateUser(defaultAddress().toHexString());
    let workstream = getOrCreateWorkstream(workstreamID);
    let commitFux = newFuxGivenEvent(
      defaultAddress(), //from
      workstreamID, //to
      BigInt.fromI32(11) //amount
    );

    // Give first time
    handleFuxGiven(commitFux);

    assert.entityCount("WorkstreamContributor", 1);

    let workstreamContributor = getOrCreateWorkstreamContributor(
      user,
      workstream
    );

    assert.fieldEquals(
      "WorkstreamContributor",
      workstreamContributor.id,
      "active",
      "true"
    );

    assert.fieldEquals(
      "WorkstreamContributor",
      workstreamContributor.id,
      "commitment",
      "11"
    );

    // Update commitment
    handleFuxGiven(
      newFuxGivenEvent(
        defaultAddress(), //from
        workstreamID, //to
        BigInt.fromI32(42) //amount
      )
    );

    assert.fieldEquals(
      "WorkstreamContributor",
      workstreamContributor.id,
      "commitment",
      "42"
    );

    // Withdraw from commitment
    handleFuxWithdrawn(
      newFuxWithdrawnEvent(
        defaultAddress(), //from
        workstreamID, //to
        BigInt.fromString("42") //amount
      )
    );

    assert.fieldEquals(
      "WorkstreamContributor",
      workstreamContributor.id,
      "commitment",
      "0"
    );
  });

  test("Should create users for new contributors", () => {
    let workstreamID = BigInt.fromI32(1);

    assert.entityCount("WorkstreamContributor", 0);

    let contributors = getAddressList();
    let updateContributors = newContributorsUpdatedEvent(
      workstreamID,
      contributors,
      true
    );

    handleContributorsUpdates(updateContributors);

    assert.entityCount("WorkstreamContributor", 3);
  });

  test("should create evaluations and users when an EvaluationSubmitted event is detected", () => {
    // Set up test data
    const workstreamID = BigInt.fromI32(1);
    setUpWorkstream(workstreamID);
    const creator = defaultAddress();
    const contributors = getAddressList();
    const ratings = [BigInt.fromI32(1), BigInt.fromI32(2), BigInt.fromI32(3)];

    // Check that there is one user and no evaluations
    assert.entityCount("User", 1);
    assert.entityCount("Evaluation", 0);

    // Submit evaluations for the contributors
    const submitEvaluations = newEvaluationSubmittedEvent(
      workstreamID,
      creator,
      contributors,
      ratings
    );
    handleEvaluationSubmitted(submitEvaluations);

    // Check that new users and evaluations were created
    assert.entityCount("User", 5);
    assert.entityCount("Evaluation", 3);

    // Submit more evaluations for the same workstream
    const newContributors = [
      Address.fromString("0x1111111111111111111111111111111111111111"),
      Address.fromString("0x2222222222222222222222222222222222222222"),
      Address.fromString("0x3333333333333333333333333333333333333333"),
      Address.fromString("0x4444444444444444444444444444444444444444"),
    ];
    const newRatings = [
      BigInt.fromI32(4),
      BigInt.fromI32(5),
      BigInt.fromI32(1),
      BigInt.fromI32(2),
    ];
    const newSubmitEvaluations = newEvaluationSubmittedEvent(
      workstreamID,
      creator,
      newContributors,
      newRatings
    );
    handleEvaluationSubmitted(newSubmitEvaluations);

    // Check that new users and evaluations were created
    assert.entityCount("User", 9);
    assert.entityCount("Evaluation", 7);
  });

  test("should registed the deposit and withdrawal of tokens via TransferSingle events", () => {
    let workstreamID = BigInt.fromI32(1);

    assert.entityCount("Token", 0);
    assert.entityCount("UserBalance", 0);

    setUpWorkstream(workstreamID);

    assert.entityCount("Token", 1);
    assert.entityCount("WorkstreamBalance", 1);
    assert.entityCount("UserBalance", 0);

    let token = getDefaultRewardToken();

    let mint = newTransferSingleEvent(
      defaultAddress(),
      ZERO_ADDRESS,
      defaultAddress(),
      FUX_TOKEN,
      BigInt.fromI32(100)
    );

    handleTransferSingle(mint);

    assert.entityCount("Token", 2);
    assert.entityCount("WorkstreamBalance", 1);
    assert.entityCount("UserBalance", 1);

    let addressList = getAddressList();

    let withdrawal = newTransferSingleEvent(
      defaultAddress(),
      defaultAddress(),
      addressList[0],
      FUX_TOKEN,
      BigInt.fromI32(0)
    );

    handleTransferSingle(withdrawal);

    assert.entityCount("Token", 2);
    assert.entityCount("WorkstreamBalance", 1);
    assert.entityCount("UserBalance", 2);
  });

  test("should update the workstream status when a workstream is closed", () => {
    let workstreamID = BigInt.fromI32(1);

    setUpWorkstream(workstreamID);

    let workstream = getOrCreateWorkstream(workstreamID);

    assert.fieldEquals("Workstream", workstream.id, "status", "Started");

    let contributors = getAddressList();
    let vFux = BigInt.fromI32(100);
    let closeWorkstream = newWorkstreamClosedEvent(workstreamID, contributors, [
      BigInt.fromI32(100),
      BigInt.fromI32(100),
      BigInt.fromI32(100),
    ]);

    handleWorkstreamClosed(closeWorkstream);

    assert.fieldEquals("Workstream", workstream.id, "status", "Closed");
  });

  test("should register when a workstream is contested", () => {
    let workstreamID = BigInt.fromI32(1);

    setUpWorkstream(workstreamID);

    let workstream = getOrCreateWorkstream(workstreamID);

    assert.fieldEquals("Workstream", workstream.id, "status", "Started");
    assert.entityCount("WorkstreamContestation", 0);

    let contester = defaultAddress();
    let uri = "contest.fux.gg";

    let contestWorkstream = newWorkstreamContestedEvent(
      workstreamID,
      contester,
      uri
    );

    handleWorkstreamContested(contestWorkstream);

    assert.entityCount("WorkstreamContestation", 1);
  });

  test("should update the workstream status when StateUpdated is emmitted", () => {
    let workstreamID = BigInt.fromI32(1);

    setUpWorkstream(workstreamID);

    let workstream = getOrCreateWorkstream(workstreamID);

    assert.fieldEquals("Workstream", workstream.id, "status", "Started");

    let stateUpdated = newStateUpdatedEvent(
      workstreamID,
      BigInt.fromString("1")
    );

    handleStateUpdated(stateUpdated);

    assert.fieldEquals("Workstream", workstream.id, "status", "Evaluation");

    stateUpdated = newStateUpdatedEvent(workstreamID, BigInt.fromString("2"));

    handleStateUpdated(stateUpdated);

    assert.fieldEquals("Workstream", workstream.id, "status", "Closed");
  });

  test("should update the URI when a URIUpdated event is emmitted", () => {
    let workstreamID = BigInt.fromI32(1);

    setUpWorkstream(workstreamID);

    let workstream = getOrCreateWorkstream(workstreamID);

    assert.fieldEquals("Workstream", workstream.id, "uri", "test.fux.gg");

    let uriUpdated = newUpdatedWorkstreamURIEvent(
      workstreamID,
      "update.fux.gg"
    );

    handleUpdatedWorkstreamUri(uriUpdated);

    assert.fieldEquals("Workstream", workstream.id, "uri", "update.fux.gg");
  });
});
