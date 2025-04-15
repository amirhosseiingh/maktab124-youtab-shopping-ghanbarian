import { BASE_URL, API_KEY } from "@/configs/envReader";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";

export const useEditProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...productData }: any) => {
      const accessToken = localStorage.getItem('access');

      if (!accessToken) {
        throw new Error('Access token is missing');
      }

      const res = await axios.put(
        `${BASE_URL}/api/records/products/${id}`,
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
      toast.success('محصول با موفقیت ویرایش شد');
      queryClient.invalidateQueries('products');
    },
    onError: (error: any) => {
      console.error('Error editing product:', error);
      toast.error('خطا در ویرایش محصول');
    },
  });
};
