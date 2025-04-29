import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { clearShipment } from '@/redux/slices/shipmentSlice';
import { clearCart } from '@/redux/slices/cartSlice';
import axios from 'axios';
import { API_KEY, BASE_URL } from '@/configs/envReader';
import toast, { Toaster } from 'react-hot-toast';
import { AppDispatch } from '@/redux/store';
import LoaderLoading from '@/components/common/loadding';


const SubmitOrderButton = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const shipment = useSelector((state: RootState) => state.shipment);
  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);

  const dispatch = useDispatch<AppDispatch>();

  const orderTotal = cartItems.reduce(
    (acc: number, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );
  const shippingCost = shipment.finalPrice;
  const totalPrice = orderTotal + shippingCost;

  const handleSubmitOrder = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        toast.error('لطفا وارد حساب کاربری خود بشوید');
        return;
      }

      if (!user) {
        toast.error('مشکل در دریافت اطلاعات کاربر');
        return;
      }

      const orderData = {
        username: user.name,
        address: `${shipment.city}، ${shipment.address}`,
        totalAmount: totalPrice,
        shippingCost: shippingCost,
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

      toast.success('سفارش  شما با موفقیت ثبت شد ' ,{
        position : 'top-left'
      });
      dispatch(clearShipment());
      dispatch(clearCart());
    } catch (error) {
      console.error('خطا در ثبت سفارش:', error);
      toast.error('مشکلی پیش اومد ');
    }
  };

  if (loading) {
    return <> <LoaderLoading/></>;
  }

  if (error) {
    return <div>خطا در دریافت اطلاعات کاربر: {error}</div>;
  }

  return (
    <>
      <Toaster />
      <button
        onClick={handleSubmitOrder}
        className="w-full py-3 rounded-lg text-lg font-bold bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white transition-colors"
      >
        ثیت سفارش و پرداخت
      </button>
    </>
  );
};

export default SubmitOrderButton;
