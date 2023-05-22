import axios from "axios";
import { MerkleTree } from "./utils/merkleTree";
import niceList from "./data/goodNames.json";

const goodExample = () => {
  const merkleTree = new MerkleTree(niceList);

  // get the root
  const root = merkleTree.getRoot();

  // find the proof that norman block is in the list
  const name: string = "Norman Block";
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);

  // verify proof against the Merkle Root
  // console.log(verifyProof(proof, name, root)); // true, Norman Block is in the list!
  return { proof, name, root };
};

const badExample = () => {
  const merkleTree = new MerkleTree(niceList);

  // get the root
  const root = merkleTree.getRoot();

  // find the proof
  const name: string = "Alice dev";
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);

  // verify proof against the Merkle Root
  // console.log(verifyProof(proof, name, root)); // false, !
  return { proof, name, root };
};

export default function Root() {
  const check = (isGood: boolean) => {
    const send = isGood ? goodExample() : badExample();

    axios
      .post("/api/gift", send)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div>
      <h2>INDEXUS</h2>
      <button onClick={() => check(true)}>Good</button>
      <button onClick={() => check(false)}>Bad</button>
    </div>
  );
}
