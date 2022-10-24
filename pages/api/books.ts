import { NextApiRequest, NextApiResponse } from 'next';

type Book = {
  id: number;
  title: string;
  category_id: number;
  authors: string[];
  cover_url: string;
  description: string;
  sections: {
    title: string;
    content: string;
  }[];
  audio_length: number;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Book[]>) {
  const { categoryId, page = 0, size } = req.query;
  const respond = await fetch(
    `https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books?categoryId=${categoryId}&page=${page}&size=${size}`
  );
  const data = await respond.json();

  return res.status(200).json(data);
}
export default handler;
