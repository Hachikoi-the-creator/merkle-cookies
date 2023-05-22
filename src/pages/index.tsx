import axios from "axios";
import { MerkleTree } from "./utils/merkleTree";
import goodPeople from "./data/goodNames.json";

export default function Root() {
  // TODO: how do we prove to the server we're on the nice list?

  const res = axios.post("/api/gift", {
    // TODO: add request body parameters here!
  });

  const check = () => {
    axios
      .post("/api/gift")
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div>
      <h2>INDEXUS</h2>
      <button onClick={check}>Click me mf</button>
    </div>
  );
}
