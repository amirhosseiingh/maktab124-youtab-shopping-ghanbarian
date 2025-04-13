import { BASE_URL, API_KEY } from '@/configs/envReader';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

export const useAddProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productData: any) => {
      const accessToken = localStorage.getItem('access');

      if (!accessToken) {
        throw new Error('Access token is missing');
      }

      const res = await axios.post(
        `${BASE_URL}/api/records/products`,
        productData,
        {
          headers: {
            api_key: API_KEY,
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('محصول با موفقیت اضافه شد ');
      queryClient.invalidateQueries('products');
    },
    onError: (error: any) => {
      console.error('Error adding product:', error);
      toast.error('خطا در افزودن محصول ');
    },
  });
};
