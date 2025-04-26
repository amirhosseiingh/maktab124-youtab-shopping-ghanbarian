import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; 
import { FaMoneyBillWave } from 'react-icons/fa';
import { CartItem } from '@/types/cartItem';
import Link from 'next/link';

interface OrderSummaryProps {}

export const OrderSummary: React.FC<OrderSummaryProps> = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const { shippingMethod } = useSelector((state: RootState) => state.shipment);

  const orderTotal = cart.reduce(
    (acc: number, item: CartItem) =>
      acc + parseFloat(item.price) * item.quantity,
    0
  );

  const shippingCost = shippingMethod === 'standard' ? 30000 : 50000;
  const totalPrice = orderTotal + shippingCost;

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaMoneyBillWave className="text-blue-500" />
        خلاصه سفارش
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">مجموع کالاها:</span>
          <span className="font-medium">
            {orderTotal.toLocaleString()} تومان
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">هزینه ارسال:</span>
          <span className="font-medium">
            {shippingMethod === 'standard' ? '30.000' : '50.000'} تومان
          </span>
        </div>

        <div className="border-t border-gray-200 my-2"></div>

        <div className="flex justify-between text-lg font-bold">
          <span>مبلغ قابل پرداخت:</span>
          <span className="text-blue-600">
            {totalPrice.toLocaleString()} تومان
          </span>
        </div>

        <Link
          href="/checkout" 
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors block text-center"
        >
          تایید و ادامه به پرداخت
        </Link>
      </div>
    </div>
  );
};
