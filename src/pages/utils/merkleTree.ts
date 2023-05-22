import { keccak256 } from "ethereum-cryptography/keccak";
import { bytesToHex } from "ethereum-cryptography/utils";

export type Proof = {
  data: string;
  left: boolean;
};

export class MerkleTree {
  leaves: Uint8Array[];
  concat: (left: Uint8Array, right: Uint8Array) => Uint8Array;

  constructor(leaves: string[]) {
    this.leaves = leaves.map(Buffer.from).map(keccak256);
    this.concat = (left, right) => keccak256(Buffer.concat([left, right]));
  }

  getRoot() {
    return bytesToHex(this._getRoot(this.leaves));
  }

  getProof(
    index: number,
    layer: Uint8Array[] = this.leaves,
    proof: Proof[] = []
  ): Proof[] {
    if (layer.length === 1) {
      return proof;
    }

    const newLayer = [];

    for (let i = 0; i < layer.length; i += 2) {
      const left = layer[i];
      const right = layer[i + 1];

      if (!right) {
        newLayer.push(left);
      } else {
        newLayer.push(this.concat(left, right));

        if (i === index || i === index - 1) {
          // true if pair num, bitwise checking last bin byte
          // index = 1 => !1 => false
          // index = 2 => !0 => true
          let isLeft = !(index & 1);
          const data = isLeft ? bytesToHex(right) : bytesToHex(left);
          proof.push({
            data,
            left: !isLeft,
          });
        }
      }
    }

    return this.getProof(Math.floor(index / 2), newLayer, proof);
  }

  // private function
  _getRoot(leaves = this.leaves): Uint8Array {
    if (leaves.length === 1) {
      return leaves[0];
    }

    const layer = [];

    for (let i = 0; i < leaves.length; i += 2) {
      const left = leaves[i];
      const right = leaves[i + 1];

      if (right) {
        layer.push(this.concat(left, right));
      } else {
        layer.push(left);
      }
    }

    return this._getRoot(layer);
  }
}
