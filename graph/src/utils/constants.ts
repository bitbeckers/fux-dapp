import { Address, BigInt } from "@graphprotocol/graph-ts";

export const ZERO_ADDRESS = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

export const FUX_ADDRESS = Address.fromString(
  "0x4923b3Ee71499A4F7a295771E3F9fc17f68537CA"
);

export const FUX_TOKEN = BigInt.fromI32(1);
export const VFUX_TOKEN = BigInt.fromI32(0);
