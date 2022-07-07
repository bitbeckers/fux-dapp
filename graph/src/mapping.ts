import {
  Staked,
  Withdrawn,
  RewardPaid,
} from "../generated/Staking_Pool/Staking_Pool";
import { Transfer } from "../generated/Token/ERC20_Token";
import {
  User,
  Stake,
  StakingPool,
  Transaction,
  TransactionReceipt,
  TokenBalance,
  Token,
} from "../generated/schema";
import { Address, BigInt } from "@graphprotocol/graph-ts";

let zeroAddress = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

export function handleTransfer(event: Transfer): void {
  if (event.params.from != zeroAddress || event.params.to != zeroAddress) {
    let userFrom = User.load(event.params.from.toHexString());
    if (!userFrom) {
      userFrom = createNewUser(event.params.from);
    }

    let userTo = User.load(event.params.to.toHexString());
    if (!userTo) {
      userTo = createNewUser(event.params.to);
    }

    let transactionReceipt = TransactionReceipt.load(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    );

    if (!transactionReceipt) {
      transactionReceipt = new TransactionReceipt(
        event.transaction.hash.toHex() + "-" + event.logIndex.toString()
      );
    }
    transactionReceipt.hash = event.transaction.hash;
    transactionReceipt.from = event.params.from;
    transactionReceipt.to = event.params.to;
    transactionReceipt.value = event.params.value;
    transactionReceipt.token = event.address.toHexString();
    transactionReceipt.timestamp = event.block.timestamp;
    transactionReceipt.blockNumber = event.block.number;

    let transaction = Transaction.load(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    );
    if (!transaction) {
      transaction = new Transaction(
        event.transaction.hash.toHex() + "-" + event.logIndex.toString()
      );
      transaction.hash = event.transaction.hash;
      transaction.userFrom = userFrom.id;
      transaction.userTo = userTo.id;
      transaction.transactionReceipt = transactionReceipt.id;
    }

    transactionReceipt.transaction = transaction.id;

    let token = Token.load(event.address.toHexString());
    if (!token) {
      token = new Token(event.address.toHexString());
      token.address = event.address;
      token.save();
    }

    updateUserBalance(userFrom, event, token);
    updateUserBalance(userTo, event, token);

    userFrom.save();
    userTo.save();
    transactionReceipt.save();
    transaction.save();
  }
}

export function handleStaked(event: Staked): void {
  let user = User.load(event.transaction.from.toHexString());
  let stakingPool = StakingPool.load(getStakingPoolId(event.address));

  if (!stakingPool) {
    stakingPool = new StakingPool(getStakingPoolId(event.address));
  }

  if (!user) {
    user = createNewUser(event.transaction.from);
  }

  let stake = Stake.load(getStakeId(user));

  if (!stake) {
    stake = new Stake(getStakeId(user));
  }

  stake.user = user.id;
  stake.amount = event.params.amount;
  stake.created = event.block.timestamp;
  stake.pool = stakingPool.id;

  stakingPool.balance = stakingPool.balance.plus(event.params.amount);
  stakingPool.stakeCount = stakingPool.stakeCount.plus(new BigInt(1));

  stakingPool.save();
  user.save();
  stake.save();
}

export function handleWithdrawn(event: Withdrawn): void {
  let user = User.load(event.transaction.from.toHex());
  let stakingPool = StakingPool.load(getStakingPoolId(event.address));

  if (!user || !stakingPool) {
    user = createNewUser(event.transaction.from);
    stakingPool = new StakingPool(getStakingPoolId(event.address));
  }

  let stake = Stake.load(getStakeId(user));

  if (!stake) {
    return;
  }

  stake.amount = stake.amount.minus(event.params.amount);
  stake.created = event.block.timestamp;
  stake.pool = stakingPool.id;
  stakingPool.balance = stakingPool.balance.minus(event.params.amount);
  stakingPool.stakeCount = stakingPool.stakeCount.minus(new BigInt(1));

  stake.save();
  user.save();
  stakingPool.save();
}

export function handleRewardPaid(event: RewardPaid): void {}

function createNewUser(address: Address): User {
  let user = new User(address.toHexString());

  user.save();
  return user;
}

function getStakeId(user: User): string {
  return user.id;
}

function getStakingPoolId(address: Address): string {
  return address.toHexString();
}

function updateUserBalance(user: User, event: Transfer, token: Token): void {
  let tbuKey =
    user.id +
    "-" +
    event.address.toHexString() +
    "-" +
    event.block.timestamp.toHexString();
  let tokenBalanceUser = TokenBalance.load(tbuKey);
  if (!tokenBalanceUser) {
    tokenBalanceUser = new TokenBalance(tbuKey);
    tokenBalanceUser.user = user.id;
    tokenBalanceUser.token = token.id;
    tokenBalanceUser.balance = event.params.value;
  } else if (user.id === event.params.from.toString()) {
    tokenBalanceUser.balance = tokenBalanceUser.balance.minus(
      event.params.value
    );
  } else if (user.id === event.params.to.toString()) {
    tokenBalanceUser.balance = tokenBalanceUser.balance.plus(
      event.params.value
    );
  }
  tokenBalanceUser.save();
}
