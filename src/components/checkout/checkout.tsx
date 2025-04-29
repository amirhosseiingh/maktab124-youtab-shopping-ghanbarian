'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { fetchUserData } from '@/redux/slices/userSlice';
import { AppDispatch } from '@/redux/store';
import SubmitOrderButton from '@/components/base/buttons/SubmitOrderButton';
import { useEffect } from 'react';
import LoaderLoading from '@/components/common/loadding';
import {
  CheckCircle,
  Package,
  Truck,
  MapPin,
  CreditCard,
  User,
} from 'lucide-react';

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
    return <LoaderLoading />;
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 p-4 rounded-lg max-w-2xl mx-auto mt-8">
        خطا در دریافت اطلاعات کاربر: {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-[var(--color-background)] text-[var(--color-text)]">
      <div className="flex items-center gap-2 mb-6">
        <CheckCircle className="w-8 h-8 text-[var(--color-primary)]" />
        <h1 className="text-2xl md:text-3xl font-bold">بررسی نهایی سفارش</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* بخش سمت چپ - اطلاعات سفارش */}
        <div className="space-y-6">
          {/* بخش محصولات */}
          <div className="bg-[var(--color-background)] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-5">
            <div className="flex items-center gap-2 mb-4 text-[var(--color-text)]">
              <Package className="w-5 h-5" />
              <h2 className="text-xl font-semibold">محصولات سفارش</h2>
            </div>

            <div className="space-y-3">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3"
                >
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      تعداد: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    {(
                      Number(item.price) * Number(item.quantity)
                    ).toLocaleString()}{' '}
                    تومان
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* بخش اطلاعات ارسال */}
          <div className="bg-[var(--color-background)] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-5">
            <div className="flex items-center gap-2 mb-4 text-[var(--color-text)]">
              <Truck className="w-5 h-5" />
              <h2 className="text-xl font-semibold">اطلاعات ارسال</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{user?.name || 'کاربر'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">
                    {shipment.city}، {shipment.address}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    کد پستی: {shipment.postalCode}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">
                    روش ارسال: {shipment.shippingMethod}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    زمان تحویل: {shipment.deliveryDate} -{' '}
                    {shipment.deliveryTime}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* بخش سمت راست - خلاصه پرداخت */}
        <div className="bg-[var(--color-background)] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-5 h-fit sticky top-6">
          <div className="flex items-center gap-2 mb-4 text-[var(--color-text)]">
            <CreditCard className="w-5 h-5" />
            <h2 className="text-xl font-semibold">خلاصه پرداخت</h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                جمع محصولات:
              </span>
              <span className="font-medium">
                {orderTotal.toLocaleString()} تومان
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                هزینه ارسال:
              </span>
              <span className="font-medium">
                {shippingCost.toLocaleString()} تومان
              </span>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">مبلغ قابل پرداخت:</span>
                <span className="text-xl font-bold text-[var(--color-primary)]">
                  {totalPrice.toLocaleString()} تومان
                </span>
              </div>
            </div>

            <div className="pt-4">
              <SubmitOrderButton />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                با کلیک بر روی دکمه پرداخت، قوانین و شرایط را می‌پذیرید
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
