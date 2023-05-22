import goodPeople from "../data/goodNames.json"; //client
import { MerkleTree } from "./merkleTree"; //client
import { verifyProof } from "./verifyProof"; //sever

// create the merkle tree for the whole nice list
const merkleTree = new MerkleTree(goodPeople);

// get the root
const root = merkleTree.getRoot();

// find the proof that norman block is in the list
const name: string = "Norman Block";
const index = goodPeople.findIndex((n) => n === name);
const proof = merkleTree.getProof(index); // this part still baffles me

// verify proof against the Merkle Root
console.log(verifyProof(proof, name, root)); // true, Norman Block is in the list!

// TRY IT OUT: what happens if you try a name not in the list, or a fake proof?
