import {NextApiRequest, NextApiResponse} from "next";
import {fetchLotteryRecords} from "../../utils/fetchLotteryRecords";


export default async (req: NextApiRequest, res: NextApiResponse) => {
  // todo add security
  if (!req) {
    res.status(403).end();
    return;
  }

  try {
    res.send(await fetchLotteryRecords());
  } catch (e) {
    res.status(500).send(e.message);
  }
}
