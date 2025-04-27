'use client';
import React from 'react';
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
import { CreditCard, ShoppingCart, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const CartPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const isUserLoggedIn = Boolean(localStorage.getItem('accessToken'));



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
    },1000); 
  }

};


  if (cart.length === 0) {
    return (
      <p className="text-center mt-8 text-var(--color-text)">
        سبد خرید شما خالی است.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] px-6 py-12 font-sans">
      {/* Stepper */}
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

        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 h-80">
          <h2 className="text-xl font-bold mb-4 text-[var(--color-foreground)]">
            پرداخت
          </h2>
          <div className="flex flex-col gap-24">
            <div className="space-y-6 text-base">
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-[var(--color-primary)]" />
                  <span>جمع کل:</span>
                </div>
                <span className="font-medium">
                  {cart
                    .reduce(
                      (total, item) => total + +item.price * item.quantity,
                      0
                    )
                    .toLocaleString()}{' '}
                  تومان
                </span>
              </div>
              <div className="flex justify-between items-center font-semibold text-[var(--color-primary)]">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[var(--color-primary)]" />
                  <span>قابل پرداخت:</span>
                </div>
                <span>
                  {cart
                    .reduce(
                      (total, item) => total + +item.price * item.quantity,
                      0
                    )
                    .toLocaleString()}{' '}
                  تومان
                </span>
              </div>
            </div>
            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-semibold py-3 rounded-md transition duration-200"
            >
              ادامه سفارش
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
