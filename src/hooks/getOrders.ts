import { BASE_URL, API_KEY } from '@/configs/envReader';
import { Order } from '@/types/order';
import axios from 'axios';
import { useQuery } from 'react-query';

export const useOrdersQuery = () => {
  return useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/api/records/orders`, {
        headers: {
          api_key: API_KEY,
        },
      });
      console.log(res);
      return res.data.records;
      
    },
  });
};

