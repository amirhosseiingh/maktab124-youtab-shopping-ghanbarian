import { API_KEY, BASE_URL } from '@/configs/envReader';
import { useMutation } from 'react-query';

export const useUploadImage = () =>
  useMutation({
    mutationFn: async (image: File) => {
      const formData = new FormData();
      formData.append('image', image);

      const accessToken = localStorage.getItem('access'); 
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await fetch(BASE_URL + '/api/files/upload', {
        method: 'POST',
        headers: {
          api_key: API_KEY || '',
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      return data.downloadLink;
    },
  });
