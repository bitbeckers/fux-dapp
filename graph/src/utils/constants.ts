import { Address, BigInt } from "@graphprotocol/graph-ts";

export const ZERO_ADDRESS = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

export const FUX_ADDRESS = Address.fromString(
  "0x942d23Fd9d6a510D05f43e3C10d0B3d552Cf964b"
);

export const FUX_TOKEN = BigInt.fromI32(1);
export const VFUX_TOKEN = BigInt.fromI32(0);
