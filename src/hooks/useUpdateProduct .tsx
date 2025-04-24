import { BASE_URL, API_KEY } from '@/configs/envReader';
import axios from 'axios';
import { useMutation } from 'react-query';

export const useUpdateProduct = () => {
  return useMutation(
    async (product: { id: number; price: string; stock: string }) => {
      const accessToken = localStorage.getItem('access');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await axios.put(
        `${BASE_URL}/api/records/products/${product.id}`,
        product,
        {
          headers: {
            api_key: API_KEY,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    }
  );
};
