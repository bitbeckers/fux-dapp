// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get src(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get guy(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get wad(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get src(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get dst(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get wad(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Deposit extends ethereum.Event {
  get params(): Deposit__Params {
    return new Deposit__Params(this);
  }
}

export class Deposit__Params {
  _event: Deposit;

  constructor(event: Deposit) {
    this._event = event;
  }

  get dst(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get wad(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Withdrawal extends ethereum.Event {
  get params(): Withdrawal__Params {
    return new Withdrawal__Params(this);
  }
}

export class Withdrawal__Params {
  _event: Withdrawal;

  constructor(event: Withdrawal) {
    this._event = event;
  }

  get src(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get wad(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class ERC20 extends ethereum.SmartContract {
  static bind(address: Address): ERC20 {
    return new ERC20("ERC20", address);
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  approve(guy: Address, wad: BigInt): boolean {
    let result = super.call("approve", "approve(address,uint256):(bool)", [
      ethereum.Value.fromAddress(guy),
      ethereum.Value.fromUnsignedBigInt(wad)
    ]);

    return result[0].toBoolean();
  }

  try_approve(guy: Address, wad: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall("approve", "approve(address,uint256):(bool)", [
      ethereum.Value.fromAddress(guy),
      ethereum.Value.fromUnsignedBigInt(wad)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  totalSupply(): BigInt {
    let result = super.call("totalSupply", "totalSupply():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalSupply(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalSupply", "totalSupply():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  transferFrom(src: Address, dst: Address, wad: BigInt): boolean {
    let result = super.call(
      "transferFrom",
      "transferFrom(address,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(src),
        ethereum.Value.fromAddress(dst),
        ethereum.Value.fromUnsignedBigInt(wad)
      ]
    );

    return result[0].toBoolean();
  }

  try_transferFrom(
    src: Address,
    dst: Address,
    wad: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "transferFrom",
      "transferFrom(address,address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(src),
        ethereum.Value.fromAddress(dst),
        ethereum.Value.fromUnsignedBigInt(wad)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  decimals(): i32 {
    let result = super.call("decimals", "decimals():(uint8)", []);

    return result[0].toI32();
  }

  try_decimals(): ethereum.CallResult<i32> {
    let result = super.tryCall("decimals", "decimals():(uint8)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  balanceOf(param0: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  transfer(dst: Address, wad: BigInt): boolean {
    let result = super.call("transfer", "transfer(address,uint256):(bool)", [
      ethereum.Value.fromAddress(dst),
      ethereum.Value.fromUnsignedBigInt(wad)
    ]);

    return result[0].toBoolean();
  }

  try_transfer(dst: Address, wad: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall("transfer", "transfer(address,uint256):(bool)", [
      ethereum.Value.fromAddress(dst),
      ethereum.Value.fromUnsignedBigInt(wad)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  allowance(param0: Address, param1: Address): BigInt {
    let result = super.call(
      "allowance",
      "allowance(address,address):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );

    return result[0].toBigInt();
  }

  try_allowance(param0: Address, param1: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "allowance",
      "allowance(address,address):(uint256)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get guy(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get wad(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get src(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get dst(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get wad(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get wad(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}

export class TransferCall extends ethereum.Call {
  get inputs(): TransferCall__Inputs {
    return new TransferCall__Inputs(this);
  }

  get outputs(): TransferCall__Outputs {
    return new TransferCall__Outputs(this);
  }
}

export class TransferCall__Inputs {
  _call: TransferCall;

  constructor(call: TransferCall) {
    this._call = call;
  }

  get dst(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get wad(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class TransferCall__Outputs {
  _call: TransferCall;

  constructor(call: TransferCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class DepositCall extends ethereum.Call {
  get inputs(): DepositCall__Inputs {
    return new DepositCall__Inputs(this);
  }

  get outputs(): DepositCall__Outputs {
    return new DepositCall__Outputs(this);
  }
}

export class DepositCall__Inputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }
}

export class DepositCall__Outputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }
}

export class DefaultCall extends ethereum.Call {
  get inputs(): DefaultCall__Inputs {
    return new DefaultCall__Inputs(this);
  }

  get outputs(): DefaultCall__Outputs {
    return new DefaultCall__Outputs(this);
  }
}

export class DefaultCall__Inputs {
  _call: DefaultCall;

  constructor(call: DefaultCall) {
    this._call = call;
  }
}

export class DefaultCall__Outputs {
  _call: DefaultCall;

  constructor(call: DefaultCall) {
    this._call = call;
  }
}
