
import { useQuery } from 'react-query';
import axios from 'axios';
import { API_KEY, BASE_URL } from '@/configs/envReader';
import { ProductsResponse } from '@/types/productList';

const useProducts = (category: string | null) => {
  const accessToken =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const fetchProducts = async () => {
    const { data } = await axios.get<ProductsResponse>(
      BASE_URL +
        `/api/records/products?filterKey=category&filterValue=${category}`,
      {
        headers: {
          api_key: API_KEY,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return data;
  };

  return useQuery(['products', category], fetchProducts, {
    enabled: !!category,
  });
};

export default useProducts;
