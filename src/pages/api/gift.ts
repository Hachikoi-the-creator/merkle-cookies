// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { verifyProof } from "~/utils/verifyProof";

type Data = { isGood: boolean };
type Req = NextApiRequest;
type Res = NextApiResponse<Data>;

export default function handler(req: Req, res: Res) {
  // only aswers to correct method
  if (req.method === "POST") {
    const { proof, name, root } = req.body;

    // have a valid array of proofs :D
    if (Boolean(proof.length)) {
      const isGood = verifyProof(proof, name, root);

      res.send({ isGood });
      return;
    }
    res.status(404).send({ isGood: false });
    return;
  }
  res.status(400).send({ isGood: false });
}
