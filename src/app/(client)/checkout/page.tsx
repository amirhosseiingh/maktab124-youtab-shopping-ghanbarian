'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchUserData } from '@/redux/slices/userSlice';
import { AppDispatch } from '@/redux/store';
import SubmitOrderButton from '@/components/base/buttons/SubmitOrderButton';
import { useEffect } from 'react';
import LoaderLoading from '@/components/common/loadding';

const Checkout = () => {
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

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  if (loading) {
    return (
      <>
        {' '}
        <LoaderLoading />{' '}
      </>
    );
  }

  if (error) {
    return <div>خطا در دریافت اطلاعات کاربر: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">بررسی نهایی سفارش</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">محصولات:</h2>
        {cartItems.map(item => (
          <div key={item.id} className="mb-2">
            {item.name} × {item.quantity} ={' '}
            {(Number(item.price) * Number(item.quantity)).toLocaleString()}{' '}
            تومان
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">اطلاعات ارسال:</h2>
        <h1 className="text-2xl font-bold mb-2">{user?.name || 'کاربر'}</h1>

        <p>
          آدرس: {shipment.city}، {shipment.address}
        </p>
        <p>کد پستی: {shipment.postalCode}</p>
        <p>روش ارسال: {shipment.shippingMethod}</p>
        <p>
          زمان تحویل: {shipment.deliveryDate} - {shipment.deliveryTime}
        </p>
      </div>

      <div className="mb-6 font-bold">
        مبلغ نهایی: {totalPrice.toLocaleString()} تومان
      </div>
      <SubmitOrderButton />
    </div>
  )
};

export default Checkout;
