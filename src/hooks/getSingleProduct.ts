import { BASE_URL, API_KEY } from '@/configs/envReader';
import { Product } from '@/types/order';
import axios from 'axios';
import { useQuery } from 'react-query';

export const useProductQuery = (id: string) => {
  return useQuery<Product>({
    queryKey: ['product', id], 
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/records/products/${id}`, {
        headers: {
          api_key: API_KEY, 
        },
      });
      return res.data; 
    },
  });
};
