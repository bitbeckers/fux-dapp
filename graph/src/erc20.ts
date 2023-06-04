import { Transfer } from "../generated/templates/ERC20/ERC20";
import { ZERO_ADDRESS } from "./utils/constants";
import {
  getOrCreateERC20Token,
  getOrCreateUserBalance,
  getOrCreateWorkstreamBalance,
  getOrCreateUser,
  getOrCreateWorkstream,
  getOrCreateWorkstreamContributor,
} from "./utils/helpers";
import { BigInt, log } from "@graphprotocol/graph-ts";

//TODO error handling and logging

export function handleERC20Transfer(event: Transfer): void {
  let token = getOrCreateERC20Token(event.address.toHexString());

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
