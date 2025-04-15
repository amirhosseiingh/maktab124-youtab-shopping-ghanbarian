import { BASE_URL, API_KEY } from "@/configs/envReader";
import { ProductRecord } from "@/types/order";
import axios from "axios";
import { useQuery } from "react-query";

export const useProductById = (id: string) => {
  return useQuery<ProductRecord>({
    queryKey: ['product', id],
    queryFn: async () => {
      const accessToken = localStorage.getItem('access');
      const res = await axios.get(`${BASE_URL}/api/records/products/${id}`, {
        headers: {
          api_key: API_KEY || '',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data.record;
    },
    enabled: !!id,
  });
};
