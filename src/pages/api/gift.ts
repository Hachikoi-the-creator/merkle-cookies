// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { verifyProof } from "../utils/verifyProof";

type Data = { isGood: boolean };
type Req = NextApiRequest;
type Res = NextApiResponse<Data>;

export default function handler(req: Req, res: Res) {
  // only aswers to correct method
  if (req.method === "POST") {
    const { proof, name, root } = req.body;
    console.log("server data", { proof, name, root }, proof[0].data);

    const isGood = verifyProof(proof, name, root);

    return res.send({ isGood });
  }
  res.status(400).send({ isGood: false });
}

/**
// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = "";

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;

  // TODO: prove that a name is in the list
  const isInTheList = false;
  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});
 */
