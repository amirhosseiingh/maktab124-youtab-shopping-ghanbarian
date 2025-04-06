import axios from 'axios';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import { BASE_URL, API_KEY } from '../configues/envReader';
import { toast } from 'react-hot-toast';

export const useLoginRequest = () => {
  const router = useRouter();

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

      toast.success('خوش آمدید', {
        duration: 3000,
        position: 'top-left',
        style: {
          background: '#50a14f',
          width: '180px',
          color: '#fff',
        },
      });
      setTimeout(() => {
        router.push('/admin/products');
      }, 1000);
    },
    onError: () => {
      toast.error('ایمیل یا رمز عبور اشتباه است !', {
        duration: 3000,
        position: 'top-left',
        style: {
          background: '#50a14f',
          width: '250px',
          color: '#fff',
        },
      });
    },
  });
};
