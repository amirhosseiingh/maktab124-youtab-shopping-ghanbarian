import axios from 'axios';
import { useMutation } from 'react-query';
import { BASE_URL, API_KEY } from '../configues/envReader';
import { toast } from 'react-hot-toast'; 

export const useLoginRequest = () => {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await axios.post(BASE_URL + '/api/users/login', data, {
        headers: {
          api_key: API_KEY,
        },
      });
      return response.data;
    },
    onSuccess: data => {
      localStorage.setItem('access', data.accessToken);
      toast.success('Login successful. Welcome!', {
        duration: 3000, 
        position: 'top-center', 
      });
    },
    onError: () => {
      toast.error('Login failed. Password or Email may be wrong', {
        duration: 3000, 
        position: 'top-center', 
      });
    },
  });
};
