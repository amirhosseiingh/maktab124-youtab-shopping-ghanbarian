'use client'
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

const CartPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.cart); 
  const dispatch = useDispatch();

  if (cart.length === 0) {
    return <p>سبد خرید شما خالی است.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-4">سبد خرید</h1>
      <ul className="space-y-4">
        {cart.map(item => (
          <li
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={`${BASE_URL}${item.images}`}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />

              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">
                  {(+item.price).toLocaleString()} تومان
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch(decreaseQuantity(item.id))}
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
              >
                -
              </button>
              <span className="text-md">{item.quantity}</span>
              <button
                onClick={() => dispatch(increaseQuantity(item.id))}
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
              >
                +
              </button>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="px-3 py-1 bg-red-100 rounded hover:bg-red-200"
              >
                حذف
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 text-lg font-bold">
        مجموع:{' '}
        {cart
          .reduce(
            (total, item: CartItem) =>
              total + parseFloat(item.price) * item.quantity,
            0
          )

          .toLocaleString()}{' '}
        تومان
      </div>
    </div>
  );
};

export default CartPage;
