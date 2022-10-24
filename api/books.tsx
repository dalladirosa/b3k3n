import axios from 'axios';

import { Book } from 'interfaces/books.interface';

export const getBooks = async ({
  categoryId,
  page,
  size,
}: {
  categoryId: string;
  page?: number;
  size?: number;
}): Promise<Book[]> => {
  const { data } = await axios.get('/api/books', {
    params: { categoryId, page, size },
  });

  return data;
};
