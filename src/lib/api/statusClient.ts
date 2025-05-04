import { BASE_URL, API_KEY } from '@/configs/envReader';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUser = async () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    const response = await axios.get(`${BASE_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token).accessToken}`,
        api_key: API_KEY,
      },
    });
    return response.data;
  }
  return null;
};

export function useUser() {
  return useQuery(['user'], fetchUser, {
    staleTime: Infinity, 
    cacheTime: Infinity,
  });
}
