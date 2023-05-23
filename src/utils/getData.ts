import { MerkleTree } from "./merkleTree";
import niceList from "../data/goodNames.json";

export function getDataToSend(name: string) {
  const merkleTree = new MerkleTree(niceList);

  // get the root
  const root = merkleTree.getRoot();

  // find the proof that norman block is in the list
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);

  // verify proof against the Merkle Root
  // console.log(verifyProof(proof, name, root)); // true, Norman Block is in the list!
  return { proof, name, root };
}
