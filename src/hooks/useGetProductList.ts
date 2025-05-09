import { useQuery } from 'react-query';
import axios from 'axios';
import { API_KEY, BASE_URL } from '@/configs/envReader';
import { ProductsResponse } from '@/types/productList';
import { useEffect, useState } from 'react';

const useProducts = (category: string | null) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      setAccessToken(token);
    }
  }, []);

  const fetchProducts = async () => {
    if (!accessToken) {
      throw new Error('No access token found');
    }

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
    enabled: !!category && !!accessToken, // only enable query when category and accessToken are available
  });
};

export default useProducts;
