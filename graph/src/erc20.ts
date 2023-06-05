import { Transfer } from "../generated/templates/ERC20/ERC20";
import { ZERO_ADDRESS } from "./utils/constants";
import {
  getOrCreateERC20Token,
  getOrCreateUserBalance,
  getOrCreateUser,
 
} from "./utils/helpers";
import { BigInt, log } from "@graphprotocol/graph-ts";

//TODO error handling and logging

export function handleERC20Transfer(event: Transfer): void {
  let token = getOrCreateERC20Token(event.address.toHexString());

  let recipient = getOrCreateUser(event.params.src.toHexString());
  let tokenBalanceRecipient = getOrCreateUserBalance(recipient, token);

  //Mint
  if (event.params.dst == ZERO_ADDRESS) {
    tokenBalanceRecipient.amount = tokenBalanceRecipient.amount.plus(
      event.params.wad
    );
    tokenBalanceRecipient.save();
    return;
  }

  // Transfer
  let sender = getOrCreateUser(event.params.src.toHexString());
  let tokenBalanceSender = getOrCreateUserBalance(sender, token);

  // deposit to contract
  if (event.params.dst == event.address) {
    tokenBalanceSender.amount = tokenBalanceSender.amount.minus(
      event.params.wad
    );
    tokenBalanceSender.save();
  }

  // returned from contract
  if (event.params.src == event.address) {
    tokenBalanceRecipient.amount = tokenBalanceRecipient.amount.plus(
      event.params.wad
    );
    tokenBalanceRecipient.save();
  }

  // Transfer between users
  if (event.params.src != event.address && event.params.dst != event.address) {
    tokenBalanceSender.amount = tokenBalanceSender.amount.minus(
      event.params.wad
    );
    tokenBalanceRecipient.amount = tokenBalanceRecipient.amount.plus(
      event.params.wad
    );
    tokenBalanceSender.save();
    tokenBalanceRecipient.save();
  }
}
