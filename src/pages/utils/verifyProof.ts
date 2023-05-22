import { utf8ToBytes } from "ethereum-cryptography/utils";
import { Proof } from "./merkleTree";

const { keccak256 } = require("ethereum-cryptography/keccak");
const { hexToBytes, bytesToHex } = require("ethereum-cryptography/utils");

function concat(left: Uint8Array, right: Uint8Array) {
  return keccak256(Buffer.concat([left, right]));
}

export function verifyProof(proof: Proof[], leaf: string, root: string) {
  proof = proof.map(({ data, left }) => ({
    left,
    data: hexToBytes(data),
  }));

  let data: Uint8Array = keccak256(Buffer.from(leaf));

  for (let i = 0; i < proof.length; i++) {
    if (proof[i].left) {
      data = concat(utf8ToBytes(proof[i].data), data);
    } else {
      data = concat(data, utf8ToBytes(proof[i].data));
    }
  }

  return bytesToHex(data) === root;
}
