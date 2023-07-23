import { Address, BigInt } from "@graphprotocol/graph-ts";

export const ZERO_ADDRESS = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

export const FUX_ADDRESS = Address.fromString(
  "0xDb176E0FbCFb811145D604eE851516d3D0f32Ea0"
);

export const FUX_TOKEN = BigInt.fromI32(1);
export const VFUX_TOKEN = BigInt.fromI32(0);
