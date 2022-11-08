import {
  Evaluation,
  Token,
  TokenBalance,
  User,
  Workstream,
  FuxGiven,
  UserWorkstream,
  VFuxWorkstream,
} from "../../generated/schema";
import { FUX_TOKEN, VFUX_TOKEN } from "./constants";
import { Address, BigInt } from "@graphprotocol/graph-ts";

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
  balance.balance = BigInt.fromI32(0);
  balance.save();

  return balance;
}

export function getOrCreateFuxGiven(
  user: User,
  workstream: Workstream
): FuxGiven {
  let id = user.id.concat(workstream.id);
  let fuxGiven = FuxGiven.load(id);

  if (fuxGiven != null) {
    return fuxGiven;
  }

  fuxGiven = new FuxGiven(id);
  fuxGiven.user = user.id;
  fuxGiven.workstream = workstream.id;
  fuxGiven.save();

  return fuxGiven;
}

export function getOrCreateUserWorkstreams(
  user: User,
  workstream: Workstream
): UserWorkstream {
  let id = user.id.concat(workstream.id);
  let userWorkstream = UserWorkstream.load(id);

  if (userWorkstream != null) {
    return userWorkstream;
  }

  userWorkstream = new UserWorkstream(id);
  userWorkstream.user = user.id;
  userWorkstream.workstream = workstream.id;
  userWorkstream.save();
  return userWorkstream;
}

export function getOrCreateVFuxWorkstream(
  user: User,
  workstream: Workstream
): VFuxWorkstream {
  let id = user.id.concat(workstream.id);
  let vFuxWorkstream = VFuxWorkstream.load(id);

  if (vFuxWorkstream != null) {
    return vFuxWorkstream;
  }

  vFuxWorkstream = new VFuxWorkstream(id);
  vFuxWorkstream.user = user.id;
  vFuxWorkstream.workstream = workstream.id;
  vFuxWorkstream.balance = BigInt.fromI32(100);
  vFuxWorkstream.save();

  return vFuxWorkstream;
}
