import {
  Token,
  TokenBalance,
  User,
  Workstream,
  WorkstreamContributor,
} from "../../generated/schema";
import { FUX_TOKEN, VFUX_TOKEN } from "./constants";
import { BigInt } from "@graphprotocol/graph-ts";

export function getOrCreateUser(address: string): User {
  let id = address;
  let user = User.load(id);

  if (user != null) {
    return user;
  }

  user = new User(id);
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

export function getOrCreateToken(tokenID: BigInt): Token {
  let id = tokenID.toString();
  let token = Token.load(id);

  if (token != null) {
    return token;
  }

  token = new Token(id);

  if (tokenID == FUX_TOKEN) {
    token.name = "FUX";
    token.symbol = "FUX";
  }

  if (tokenID == VFUX_TOKEN) {
    token.name = "vFUX";
    token.symbol = "VFUX";
  }

  token.save();

  return token;
}

export function getOrCreateTokenBalance(
  user: User,
  token: Token
): TokenBalance {
  let id = user.id.concat(token.id);
  let balance = TokenBalance.load(id);

  if (balance != null) {
    return balance;
  }

  balance = new TokenBalance(id);
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
  workstreamContributor.save();
  return workstreamContributor;
}
