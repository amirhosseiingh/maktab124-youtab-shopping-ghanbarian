import { API_KEY, BASE_URL } from '@/configs/envReader';
import axios from 'axios';

//  Register
export const registerUser = async (data: {
  email: string;
  password: string;
  tell: string;
  name: string;
  lastName: string;
}) => {
  const userData = {
    ...data, 
    userId: Date.now(), 
  };

  console.log(userData); 

  try {
    const res = await axios.post(`${BASE_URL}/api/users/register`, userData, {
      headers: {
        api_key: API_KEY,
      },
    });
    console.log('Response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

//  Login
export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/users/login`, data, {
      headers: {
        api_key: API_KEY,
      },
    });
    return res.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
