import { API_KEY, BASE_URL } from "@/configs/envReader";
import axios from "axios";


const fetchUser = async (): Promise<any> => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    try {
      const response = await axios.get(`${BASE_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token).accessToken}`,
          api_key: API_KEY,
        },
      });
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }
  return null;
};

export default fetchUser