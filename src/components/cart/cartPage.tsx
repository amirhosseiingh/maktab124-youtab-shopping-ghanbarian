'use client';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '@/redux/slices/cartSlice';
import { BASE_URL } from '@/configs/envReader';
import { CartItem } from '@/types/cartItem';
import { useRouter } from 'next/navigation';
import Stepper from '@/components/common/stepper';
import { ArrowLeft, CreditCard, ShoppingCart, Trash2, Wallet } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { EmptyCart } from '../emptyCart/emptyCart';

const CartPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const isUserLoggedIn = Boolean(localStorage.getItem('accessToken'));

  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountCode(e.target.value);
  };

  const applyDiscount = () => {
    if (discountCode === 'DISCOUNT10') {
      setDiscountApplied(true);
      setDiscountAmount(0.1);
      toast.success('تخفیف اعمال شد!', {
        duration: 3000,
        position: 'top-left',
      });
    } else {
      setDiscountApplied(false);
      setDiscountAmount(0);
      toast.error('کد تخفیف نامعتبر است.', {
        duration: 3000,
        position: 'top-left',
      });
    }
  };

  const handleProceedToCheckout = () => {
    if (!isUserLoggedIn) {
      toast.error('برای ادامه خرید باید وارد حساب کاربری خود شوید.', {
        duration: 3000,
        position: 'top-left',
      });
      router.push('/auth');
    } else if (cart.length === 0) {
      toast.error('سبد خرید شما خالی است. لطفا محصولی اضافه کنید.', {
        duration: 3000,
        position: 'top-left',
      });
    } else {
      toast.success('در حال انتقال به صفحه اطلاعات ارسال...', {
        duration: 3000,
        position: 'top-left',
      });

      setTimeout(() => {
        router.push('/shipment');
      }, 1000);
    }
  };

  const totalPriceBeforeDiscount = cart.reduce(
    (total, item) => total + +item.price * item.quantity,
    0
  );

  const totalPriceAfterDiscount =
    totalPriceBeforeDiscount * (1 - discountAmount);

  if (cart.length === 0) {
    return (
      <div>
        <EmptyCart/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] px-6 py-12 font-sans">
      <Stepper />

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 mt-16">
        <div className="bg-white rounded-xl p-8 shadow-md">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-[var(--color-foreground)]">
            سبد خرید
          </h2>
          <ul className="divide-y divide-gray-200">
            {cart.map((item: CartItem) => (
              <li
                key={item.id}
                className="py-5 flex justify-between items-center hover:bg-gray-50 transition duration-200"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`${BASE_URL}${item.images}`}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover border border-gray-200"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold text-[var(--color-text)]">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="w-8 h-8 border rounded-md text-sm text-gray-600 hover:bg-gray-100 transition"
                      >
                        -
                      </button>
                      <span className="text-sm text-[var(--color-text)]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="w-8 h-8 border rounded-md text-sm text-gray-600 hover:bg-gray-100 transition"
                      >
                        +
                      </button>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-red-500 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-sm text-gray-600">
                    {(+item.price).toLocaleString()} تومان
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 h-96 flex flex-col">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-[var(--color-primary)]" />
            <span>پرداخت</span>
          </h2>

          <div className="flex flex-col gap-6 flex-grow">
            <div className="space-y-6 text-base flex-grow">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-600">
                  <ShoppingCart className="w-5 h-5 text-gray-500" />
                  <span>جمع کل:</span>
                </div>
                <span className="font-medium text-gray-800">
                  {totalPriceBeforeDiscount.toLocaleString()} تومان
                </span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={discountCode}
                  onChange={handleDiscountChange}
                  placeholder="کد تخفیف را وارد کنید"
                  className="w-full p-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                />
                <button
                  onClick={applyDiscount}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white py-1 px-4 rounded-md text-sm transition duration-200"
                  disabled={!discountCode.trim()}
                >
                  اعمال
                </button>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center font-semibold">
                  <div className="flex items-center gap-2 text-[var(--color-primary)]">
                    <Wallet className="w-5 h-5" />
                    <span>قابل پرداخت:</span>
                  </div>
                  <span className="text-lg text-[var(--color-primary)]">
                    {totalPriceAfterDiscount.toLocaleString()} تومان
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>ادامه سفارش</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
