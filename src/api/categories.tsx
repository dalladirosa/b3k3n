import axios from 'axios';

import { Category } from 'interfaces/categories.interface';

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await axios.get('http://localhost:3001/api/categories');

  return data;
};
