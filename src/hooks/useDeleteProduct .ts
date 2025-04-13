import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { API_KEY, BASE_URL } from '@/configs/envReader';

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
const accessToken = localStorage.getItem('access'); 
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(BASE_URL +`/api/records/products/${id}`, {
        method: 'DELETE',
        headers: {
                    api_key: API_KEY || '',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                  }
      });
      if (!response.ok) {
        throw new Error('Error deleting product');
      }
      return id;
    },
    onSuccess: () => {
      toast.error('محصول با موفقیت حذف شد', {
        duration: 3000,
        position: 'top-left',
        style: {
          background: '#016630',
          color: '#fff',
        },
      });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
