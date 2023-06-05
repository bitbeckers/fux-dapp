import {
  ContributorsUpdated,
  EvaluationSubmitted,
  FuxClaimed,
  FuxGiven,
  FuxWithdrawn,
  StateUpdated,
  TransferSingle,
  UpdatedWorkstreamURI,
  WorkstreamClosed,
  WorkstreamContested,
  WorkstreamMinted,
} from "../generated/FUX/FUX";
import { handleWorkstreamMinted } from "../src/fux";
import { ethereum, Address, BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import { createMockedFunction, newMockEvent } from "matchstick-as";

export function defaultAddress(): Address {
  return Address.fromString("0x999999cf1046e68e36E1aA2E0E07105eDDD1f08E");
}

export function getAddressList(): Array<Address> {
  return [
    Address.fromString("0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed"),
    Address.fromString("0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359"),
    Address.fromString("0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF"),
  ];
}

export function getDefaultRewardToken(): Address {
  return Address.fromString("0xc0ffee254729296a45a3885639AC7E10F9d54979");
}

export function setUpWorkstream(workstreamID: BigInt): void {
  let event = newWorkstreamMintedEvent(
    workstreamID,
    BigInt.fromI32(1), //deadline
    [getDefaultRewardToken()], //rewardTokens
    [BigInt.fromI32(30)], //rewardAmounts
    BigInt.fromI32(42), //totalRewardAmount
    "test.fux.gg" //uri
  );

  setUpMockERC20ContractCall(getDefaultRewardToken());
  setUpMockWorkstreamContractCall(event.address, workstreamID);

  handleWorkstreamMinted(event);
}

export function setUpMockERC20ContractCall(erc20Contract: Address): void {
  createMockedFunction(erc20Contract, "name", "name():(string)").returns([
    ethereum.Value.fromString("MOCK"),
  ]);

  createMockedFunction(erc20Contract, "symbol", "symbol():(string)").returns([
    ethereum.Value.fromString("MOCK"),
  ]);
}

export function setUpMockWorkstreamContractCall(
  fuxContract: Address,
  workstreamID: BigInt
): void {
  let name = ethereum.Value.fromString("Mock Workstream");

  let creator = ethereum.Value.fromAddress(defaultAddress());
  let deadline = ethereum.Value.fromI32(0);
  let state = ethereum.Value.fromI32(0);
  let exists = ethereum.Value.fromBoolean(true);

  let tupleArray = new Array<ethereum.Value>();
  tupleArray.push(name);
  tupleArray.push(creator);
  tupleArray.push(deadline);
  tupleArray.push(state);
  tupleArray.push(exists);

  let tuple = changetype<ethereum.Tuple>(tupleArray);
  let tupleValue = ethereum.Value.fromTuple(tuple);

  let idAsValue = ethereum.Value.fromUnsignedBigInt(workstreamID);

  log.info("Mocking workstream {}", [workstreamID.toString()]);

  createMockedFunction(
    fuxContract,
    "getWorkstream",
    "getWorkstream(uint256):((string,address,uint256,uint8,bool))"
  )
    .withArgs([idAsValue])
    .returns([tupleValue]);
}

// Function to create mock ContributorsUpdated event
// event ContributorsUpdated(uint256 workstreamID, address[] contributors, bool add);
export function newContributorsUpdatedEvent(
  workstreamID: BigInt,
  contributors: Array<Address>,
  add: boolean
): ContributorsUpdated {
  let mockEvent = newMockEvent();
  let event = new ContributorsUpdated(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );
  event.parameters = new Array();
  event.parameters.push(
    new ethereum.EventParam(
      "workstreamID",
      ethereum.Value.fromUnsignedBigInt(workstreamID)
    )
  );
  event.parameters.push(
    new ethereum.EventParam(
      "contributors",
      ethereum.Value.fromAddressArray(contributors)
    )
  );
  event.parameters.push(
    new ethereum.EventParam("add", ethereum.Value.fromBoolean(add))
  );

  return event;
}

// Function to create mock EvaluationSubmitted event
// event EvaluationSubmitted(uint256 workstreamID, address creator, address[] contributors, uint256[] ratings);
export function newEvaluationSubmittedEvent(
  workstreamID: BigInt,
  creator: Address,
  contributors: Array<Address>,
  ratings: Array<BigInt>
): EvaluationSubmitted {
  let mockEvent = newMockEvent();
  let event = new EvaluationSubmitted(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );
  event.parameters = new Array();
  event.parameters = new Array();
  event.parameters.push(
    new ethereum.EventParam(
      "workstreamID",
      ethereum.Value.fromUnsignedBigInt(workstreamID)
    )
  );
  event.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  );
  event.parameters.push(
    new ethereum.EventParam(
      "contributors",
      ethereum.Value.fromAddressArray(contributors)
    )
  );
  event.parameters.push(
    new ethereum.EventParam(
      "ratings",
      ethereum.Value.fromUnsignedBigIntArray(ratings)
    )
  );

  return event;
}

// Function to create mock FuxClaimed event
// event FuxClaimed(address user);
export function newFuxClaimedEvent(account: string): FuxClaimed {
  let mockEvent = newMockEvent();
  let event = new FuxClaimed(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );
  event.parameters = new Array();
  let user = new ethereum.EventParam(
    "user",
    ethereum.Value.fromAddress(Address.fromString(account))
  );

  event.parameters.push(user);

  return event;
}

// Function to create mock FuxGiven event
// event FuxGiven(address user, uint256 workstreamID, uint256 amount);
export function newFuxGivenEvent(
  user: Address,
  workstreamID: BigInt,
  amount: BigInt
): FuxGiven {
  let mockEvent = newMockEvent();
  let event = new FuxGiven(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );
  event.parameters = new Array();
  event.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  );
  event.parameters.push(
    new ethereum.EventParam(
      "workstreamID",
      ethereum.Value.fromUnsignedBigInt(workstreamID)
    )
  );
  event.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  );

  return event;
}

// Function to create mock FuxWithdrawn event
// event FuxWithdrawn(address user, uint256 workstreamID, uint256 amount);
export function newFuxWithdrawnEvent(
  account: Address,
  workstreamID: BigInt,
  amount: BigInt
): FuxWithdrawn {
  let mockEvent = newMockEvent();
  let event = new FuxWithdrawn(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  event.parameters = new Array();
  event.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(account))
  );
  event.parameters.push(
    new ethereum.EventParam(
      "workstreamID",
      ethereum.Value.fromUnsignedBigInt(workstreamID)
    )
  );
  event.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  );

  return event;
}

// Function to create mock StateUpdated event
// event StateUpdated(uint256 workstreamID, WorkstreamState state);
export function newStateUpdatedEvent(
  workstreamID: BigInt,
  state: BigInt
): StateUpdated {
  let mockEvent = newMockEvent();
  let event = new StateUpdated(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  event.parameters = new Array();
  event.parameters.push(
    new ethereum.EventParam(
      "workstreamID",
      ethereum.Value.fromUnsignedBigInt(workstreamID)
    )
  );
  event.parameters.push(
    new ethereum.EventParam("state", ethereum.Value.fromUnsignedBigInt(state))
  );

  return event;
}

// Function to create mock TransferSingle event
export function newTransferSingleEvent(
  operator: Address,
  from: Address,
  to: Address,
  id: BigInt,
  value: BigInt
): TransferSingle {
  let mockEvent = newMockEvent();

  let event = new TransferSingle(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  event.parameters = new Array();
  event.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  );
  event.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  );
  event.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  );
  event.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  );
  event.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  );

  return event;
}

// Function to create mock UpdatedWorkstreamURI event
// event UpdatedWorkstreamURI(uint256 workstreamID, string uri);
export function newUpdatedWorkstreamURIEvent(
  workstreamID: BigInt,
  uri: string
): UpdatedWorkstreamURI {
  let mockEvent = newMockEvent();
  let event = new UpdatedWorkstreamURI(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  event.parameters = new Array();
  event.parameters.push(
    new ethereum.EventParam(
      "workstreamID",
      ethereum.Value.fromUnsignedBigInt(workstreamID)
    )
  );
  event.parameters.push(
    new ethereum.EventParam("uri", ethereum.Value.fromString(uri))
  );

  return event;
}

// Function to create mock WorkstreamClosed event
// event WorkstreamClosed(uint256 workstreamID, address[] contributors, uint256[] vFux);
export function newWorkstreamClosedEvent(
  workstreamID: BigInt,
  contributors: Array<Address>,
  vFux: Array<BigInt>
): WorkstreamClosed {
  let mockEvent = newMockEvent();

  let event = new WorkstreamClosed(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  event.parameters = new Array();
  event.parameters.push(
    new ethereum.EventParam(
      "workstreamID",
      ethereum.Value.fromUnsignedBigInt(workstreamID)
    )
  );
  event.parameters.push(
    new ethereum.EventParam(
      "contributors",
      ethereum.Value.fromAddressArray(contributors)
    )
  );
  event.parameters.push(
    new ethereum.EventParam(
      "vFux",
      ethereum.Value.fromUnsignedBigIntArray(vFux)
    )
  );

  return event;
}

// Function to create mock WorkstreamContested event
// event WorkstreamContested(uint256 workstreamID, address user, string uri);
export function newWorkstreamContestedEvent(
  workstreamID: BigInt,
  creator: Address,
  uri: string
): WorkstreamContested {
  let mockEvent = newMockEvent();
  let event = new WorkstreamContested(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );

  event.parameters = new Array();
  event.parameters.push(
    new ethereum.EventParam(
      "workstreamID",
      ethereum.Value.fromUnsignedBigInt(workstreamID)
    )
  );
  event.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  );
  event.parameters.push(
    new ethereum.EventParam("uri", ethereum.Value.fromString(uri))
  );

  return event;
}

// Function to create mock WorkstreamMinted event
//event WorkstreamMinted(
//     uint256 workstreamID,
//     uint256 deadline,
//     address[] rewardsToken,
//     uint256[] rewards,
//     uint256 value,
//     string metadataUri
// );
export function newWorkstreamMintedEvent(
  workstreamID: BigInt,
  deadline: BigInt,
  rewardsToken: Array<Address>,
  rewards: Array<BigInt>,
  value: BigInt,
  metadataUri: string
): WorkstreamMinted {
  let mockEvent = newMockEvent();

  log.info(
    "mockEvent address {} logIndex {} txLogIndex {} logType {} block {} transaction {} parameters {} receipt {}",
    [
      mockEvent.address ? mockEvent.address.toHexString() : "null",
      mockEvent.logIndex ? mockEvent.logIndex.toString() : "null",
      mockEvent.transactionLogIndex
        ? mockEvent.transactionLogIndex.toString()
        : "null",
      mockEvent.logType ? "yes" : "null",
      mockEvent.block ? "yes" : "null",
      mockEvent.transaction ? "yes" : "null",
      mockEvent.parameters ? "yes" : "null",
      mockEvent.receipt ? "yes" : "null",
    ]
  );
  let event = new WorkstreamMinted(
    mockEvent.address,
    mockEvent.logIndex,
    mockEvent.transactionLogIndex,
    mockEvent.logType,
    mockEvent.block,
    mockEvent.transaction,
    mockEvent.parameters,
    mockEvent.receipt
  );
  event.parameters = new Array();
  event.parameters.push(
    new ethereum.EventParam(
      "workstreamID",
      ethereum.Value.fromUnsignedBigInt(workstreamID)
    )
  );
  event.parameters.push(
    new ethereum.EventParam(
      "deadline",
      ethereum.Value.fromUnsignedBigInt(deadline)
    )
  );
  event.parameters.push(
    new ethereum.EventParam(
      "rewardsToken",
      ethereum.Value.fromAddressArray(rewardsToken)
    )
  );
  event.parameters.push(
    new ethereum.EventParam(
      "rewards",
      ethereum.Value.fromUnsignedBigIntArray(rewards)
    )
  );
  event.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  );
  event.parameters.push(
    new ethereum.EventParam(
      "metadataUri",
      ethereum.Value.fromString(metadataUri)
    )
  );

  return event;
}
