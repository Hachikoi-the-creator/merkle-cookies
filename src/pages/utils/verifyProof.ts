import { keccak256 } from "ethereum-cryptography/keccak";
import { bytesToHex } from "ethereum-cryptography/utils";
import { ProofVer } from "./merkleTree";

const concat = (left: Uint8Array, right: Uint8Array) =>
  keccak256(Buffer.concat([left, right]));

export function verifyProof(proof: ProofVer[], leaf: string, root: string) {
  proof = proof.map(({ data, left }) => ({
    left,
    data: data,
  }));

  let data: Uint8Array = keccak256(Buffer.from(leaf));

  for (let i = 0; i < proof.length; i++) {
    if (proof[i].left) {
      data = concat(proof[i].data, data);
    } else {
      data = concat(data, proof[i].data);
    }
  }

  return bytesToHex(data) === root;
}
