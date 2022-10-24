import { NextApiRequest, NextApiResponse } from 'next';

type Category = {
  id: number;
  name: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Category[]>) {
  const respond = await fetch(
    'https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-categories'
  );
  const data = await respond.json();

  return res.status(200).json(data);
}
export default handler;
