'use client'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { clearCart } from '@/redux/slices/cartSlice';
import { clearShipment } from '@/redux/slices/shipmentSlice';

import axios from 'axios';
import { API_KEY, BASE_URL } from '@/configs/envReader';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { HiCheck } from 'react-icons/hi';
import { FiShoppingBag, FiTruck, FiCreditCard, FiX, FiShield, FiLock } from 'react-icons/fi';
const Payment = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const shipment = useSelector((state: RootState) => state.shipment);
  const user = useSelector((state: RootState) => state.user.user);

  const orderTotal = cartItems.reduce(
    (acc: number, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );
  const shippingCost = shipment.finalPrice;
  const totalPrice = orderTotal + shippingCost;

  const handleCancel = () => {
    router.push('/checkout');
  };

  const handlePayment = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken || !user) {
        toast.error('مشکل در احراز هویت یا اطلاعات کاربر');
        return;
      }

      const orderData = {
        username: user.name,
        address: `${shipment.city}، ${shipment.address}`,
        totalAmount: totalPrice,
        shippingCost,
        products: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        status: 'در انتظار تایید',
        createdAt: new Date().toISOString(),
      };

      await axios.post(`${BASE_URL}/api/records/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          api_key: API_KEY,
        },
      });

      dispatch(clearCart());
      dispatch(clearShipment());
      toast.success('پرداخت با موفقیت انجام شد');
      router.push('/orderSucces');
    } catch (error) {
      console.error('خطا در پرداخت:', error);
      toast.error('مشکلی در پرداخت پیش اومد');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-lg mx-auto bg-white rounded-xl overflow-hidden shadow border border-gray-200 ">
        <div className="bg-emerald-600 p-5 text-white text-center">
          <h2 className="text-xl font-semibold flex items-center justify-center gap-2">
            <HiCheck size={22} />
            تایید نهایی سفارش
          </h2>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex justify-between items-center py-3 border-b">
            <span className="flex items-center gap-2 text-sm text-gray-700">
              <FiShoppingBag className="text-emerald-500" size={18} />
              جمع کالاها:
            </span>
            <span className="text-sm font-medium">
              {orderTotal.toLocaleString()} تومان
            </span>
          </div>

          <div className="flex justify-between items-center py-3 border-b">
            <span className="flex items-center gap-2 text-sm text-gray-700">
              <FiTruck className="text-emerald-500" size={18} />
              هزینه ارسال:
            </span>
            <span className="text-sm font-medium">
              {shippingCost.toLocaleString()} تومان
            </span>
          </div>

          <div className="flex justify-between items-center py-3 border rounded-md px-4 bg-gray-50">
            <span className="flex items-center gap-2 text-base font-medium text-gray-800">
              <FiCreditCard className="text-emerald-600" />
              مبلغ نهایی:
            </span>
            <span className="text-lg font-bold text-emerald-700">
              {totalPrice.toLocaleString()} تومان
            </span>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleCancel}
              className="flex-1 py-3 rounded-md border border-gray-300 text-gray-700 hover:border-red-400 hover:text-red-600 hover:bg-red-50 text-sm font-medium transition"
            >
              انصراف
            </button>

            <button
              onClick={handlePayment}
              className="flex-1 py-3 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-sm font-semibold transition"
            >
              پرداخت ایمن
            </button>
          </div>

          <div className="mt-5 pt-4 border-t text-xs text-gray-500 flex justify-around">
            <div className="flex items-center gap-1">
              <FiShield className="text-emerald-500" size={14} />
              اصالت کالا
            </div>
            <div className="flex items-center gap-1">
              <FiLock className="text-emerald-500" size={14} />
              پرداخت امن
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
