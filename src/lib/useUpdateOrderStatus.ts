// lib/useUpdateOrderStatus.ts
import axios from 'axios';
import { useMutation } from 'react-query';
import { BASE_URL, API_KEY } from '@/configues/envReader';

export const useUpdateOrderStatus = () => {
  return useMutation({
    mutationFn: async ({
      orderId,
      newStatus,
    }: {
      orderId: string;
      newStatus: string;
    }) => {
      await axios.put(
        `${BASE_URL}/api/records/orders/${orderId}`,
        { status: newStatus },
        {
          headers: {
            api_key: API_KEY,
          },
        }
      );
    },
  });
};
