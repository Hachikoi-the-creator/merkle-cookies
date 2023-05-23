import { MerkleTree } from "./merkleTree";
import { verifyProof } from "./verifyProof";
import niceList from "../data/goodNames.json";

// create the merkle tree for the whole nice list
const merkleTree = new MerkleTree(niceList);

// get the root
const root = merkleTree.getRoot();

// find the proof that norman block is in the list
const name = "Norman Block";
const index = niceList.findIndex((n) => n === name);
const proof = merkleTree.getProof(index);

// verify proof against the Merkle Root
console.log(verifyProof(proof, name, root)); // true, Norman Block is in the list!

// TRY IT OUT: what happens if you try a name not in the list, or a fake proof?
// * Good
const goodExample = () => {
  const merkleTree = new MerkleTree(niceList);

  // get the root
  const root = merkleTree.getRoot();

  // find the proof that norman block is in the list
  const name: string = "Hachi dev";
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);

  // verify proof against the Merkle Root
  // console.log(verifyProof(proof, name, root)); // true, Norman Block is in the list!
  return { proof, name, root };
};

// ! Bad
const badExample = () => {
  const merkleTree = new MerkleTree(niceList);

  // get the root
  const root = merkleTree.getRoot();

  // find the proof
  const name: string = "Jhon deez";
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);

  // verify proof against the Merkle Root
  // console.log(verifyProof(proof, name, root)); // false, !
  return { proof, name, root };
};
