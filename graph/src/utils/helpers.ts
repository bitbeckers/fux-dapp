import { WorkstreamClosed } from "../../generated/FUX/FUX";
import {
  Token,
  UserBalance,
  WorkstreamBalance,
  WorkstreamContestation,
  User,
  Workstream,
  WorkstreamContributor,
  RewardDistribution,
} from "../../generated/schema";
import { ERC20 } from "../../generated/templates/ERC20/ERC20";
import { FUX_ADDRESS, FUX_TOKEN, VFUX_TOKEN } from "./constants";
import { Address, BigInt } from "@graphprotocol/graph-ts";

export function getOrCreateUser(address: string): User {
  let user = User.load(address);

  if (user != null) {
    return user;
  }

  user = new User(address);
  user.fuxer = false;
  user.save();

  return user;
}

export function getOrCreateWorkstream(workstreamID: BigInt): Workstream {
  let id = workstreamID.toString();
  let workstream = Workstream.load(id);

  if (workstream != null) {
    return workstream;
  }

  workstream = new Workstream(id);
  workstream.save();

  return workstream;
}

export function getOrCreateERC20Token(address: string): Token {
  let id = address;
  let token = Token.load(id);
  let erc20 = ERC20.bind(Address.fromString(address));

  if (token != null) {
    return token;
  }

  token = new Token(id);
  token.symbol = erc20.symbol();
  token.name = erc20.name();

  token.save();

  return token;
}

export function getOrCreate1155Token(address: string, tokenID: BigInt): Token {
  let id = address;
  let token = Token.load(id);

  if (token != null) {
    return token;
  }

  token = new Token(id);

  token.tokenID = tokenID;

  if (tokenID === FUX_TOKEN && address === FUX_ADDRESS.toHexString()) {
    token.symbol = "FUX";
    token.name = "FUX";
  }

  if (tokenID === VFUX_TOKEN && address === FUX_ADDRESS.toHexString()) {
    token.symbol = "vFUX";
    token.name = "vFUX";
  }
  token.save();

  return token;
}

export function getOrCreateWorkstreamBalance(
  workstream: Workstream,
  token: Token
): WorkstreamBalance {
  let id = workstream.id.concat(token.id);
  let balance = WorkstreamBalance.load(id);

  if (balance != null) {
    return balance;
  }

  balance = new WorkstreamBalance(id);
  balance.workstream = workstream.id;
  balance.token = token.id;
  balance.amount = BigInt.fromI32(0);
  balance.save();

  return balance;
}

export function getOrCreateUserBalance(user: User, token: Token): UserBalance {
  let id = user.id.concat(token.id);
  let balance = UserBalance.load(id);

  if (balance != null) {
    return balance;
  }

  balance = new UserBalance(id);
  balance.user = user.id;
  balance.token = token.id;
  balance.amount = BigInt.fromI32(0);
  balance.save();

  return balance;
}

export function getOrCreateWorkstreamContributor(
  user: User,
  workstream: Workstream
): WorkstreamContributor {
  let id = user.id.concat(workstream.id);
  let workstreamContributor = WorkstreamContributor.load(id);

  if (workstreamContributor != null) {
    return workstreamContributor;
  }

  workstreamContributor = new WorkstreamContributor(id);
  workstreamContributor.contributor = user.id;
  workstreamContributor.workstream = workstream.id;
  workstreamContributor.active = true;
  workstreamContributor.save();
  return workstreamContributor;
}

export function getOrCreateWorkstreamContestation(
  user: User,
  workstream: Workstream
): WorkstreamContestation {
  let id = user.id.concat(workstream.id);
  let workstreamContestation = WorkstreamContestation.load(id);

  if (workstreamContestation) {
    return workstreamContestation;
  }

  workstreamContestation = new WorkstreamContestation(id);
  workstreamContestation.user = user.id;
  workstreamContestation.workstream = workstream.id;
  workstreamContestation.uri = "";
  workstreamContestation.save();
  return workstreamContestation;
}

export function getStateFromInt(state: BigInt): string | null {
  if (state.equals(BigInt.fromI32(0))) {
    return "Started";
  }

  if (state.equals(BigInt.fromI32(1))) {
    return "Evaluation";
  }

  if (state.equals(BigInt.fromI32(2))) {
    return "Closed";
  }

  return null;
}

export function getOrCreateRewardDistribution(
  event: WorkstreamClosed
): RewardDistribution {
  let id = event.params.workstreamID.toString();
  let dist = RewardDistribution.load(id);

  if (dist != null) {
    return dist;
  }

  dist = new RewardDistribution(id);
  dist.workstream = event.params.workstreamID.toString();
  dist.shares = event.params.vFux;
  dist.contributors = event.params.contributors.map<string>((a: Address) =>
    a.toHexString()
  );

  dist.save();

  return dist;
}
