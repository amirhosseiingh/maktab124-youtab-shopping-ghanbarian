import { BASE_URL, API_KEY } from '@/configs/envReader';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

export const useAddProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData: any) => {
      const res = await axios.post(
        `${BASE_URL}/api/records/products`,
        productData,
        {
          headers: {
            api_key: API_KEY,
            'Content-Type': 'application/json',
            Authorization:" Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZDNjYTA5NTNkNjcxZTRkMWRmNjQ2YiIsImlhdCI6MTc0NDMwNDQ2OCwiZXhwIjoxNzQ0NDc3MjY4fQ.p4Wj4iXNDgknqNzNAwelcpV9ixtWDnMwxK5a6ukdh1c"
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
    onError: error => {
      console.error('Error adding product:', error);
    },
  });
};
