import { BASE_URL, API_KEY } from '@/configues/envReader';
import { Product } from '@/types/order';
import axios from 'axios';
import { useQuery } from 'react-query';

export const useProductsQuery = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/records/products`, {
        headers: {
          api_key: API_KEY,
        },
      });
      return res.data.records;
    },
  });
};
