'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL } from '@/configs/envReader';
import { PersonalInfoForm } from '@/components/shipmentDetails/PersonalInfoForm';
import { AddressForm } from '@/components/shipmentDetails/addressForm';
import { DeliveryOptions } from '@/components/shipmentDetails/DeliveryOptions';
import { OrderSummary } from '@/components/shipmentDetails/OrderSummary';

interface UserData {
  email: string;
  name: string;
  lastName: string;
  tell: string;
  createdAt: string;
}

const fetchUser = async (): Promise<UserData | null> => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    try {
      const response = await axios.get(`${BASE_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token).accessToken}`,
          api_key: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  }
  return null;
};

export const ShippingForm = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    tell: '',
    createdAt: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryDate: '',
  });

  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [deliveryTime, setDeliveryTime] = useState<string>('');
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [shippingMethod, setShippingMethod] = useState<string>('standard');

  useEffect(() => {
    async function getUserData() {
      const data = await fetchUser();
      if (data) {
        setUserData(data);
        setFormData(prevData => ({
          ...prevData,
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          tell: data.tell,
          createdAt: data.createdAt,
        }));
      }
    }
    getUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOrderTotalChange = (newOrderTotal: number) => {
    setOrderTotal(newOrderTotal);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          اطلاعات ارسال سفارش
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <PersonalInfoForm
              formData={formData}
              handleInputChange={handleInputChange}
            />

            <AddressForm />
          </div>
          <div className="lg:w-1/3 space-y-6">
            <DeliveryOptions />
            <OrderSummary
              orderTotal={orderTotal}
              shippingMethod={shippingMethod}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShippingForm;
