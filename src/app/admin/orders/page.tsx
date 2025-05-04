'use client';

import { useOrdersQuery } from '@/hooks/getOrders';
import { Order } from '@/types/order';
import { useState } from 'react';
import OrderStatusModal from '../../../components/modals/OrderStatusModal';
import { Toaster } from 'react-hot-toast';
import { getStatusColor } from '@/components/ui/getStatusColor';
import Pagination from '@/components/base/pagination';
import { filterItemsByKey } from '@/utils/orderFilter';
import { searchItems } from '@/utils/orderSearch';
import LoaderLoading from '@/components/common/loadding';

const OrdersTable = () => {
  const { data: orders, isLoading, isError, refetch } = useOrdersQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const ordersPerPage = 7;
  const safeOrders = orders || [];



const filteredOrders = filterItemsByKey(safeOrders, 'status', selectedStatus);
const finalOrders = searchItems(filteredOrders, searchQuery, 'username');


const totalPages = Math.ceil(finalOrders.length / ordersPerPage);
const currentOrders = finalOrders.slice(
  (currentPage - 1) * ordersPerPage,
  currentPage * ordersPerPage
);

const getTotalAmount = (products: { price: string; quantity: number }[]) => {
  return products.reduce((total, product) => {
    const productPrice = Number(product.price);
    if (!isNaN(productPrice)) {
      total += productPrice * product.quantity;
    }
    return total;
  }, 0);
};



const formatPrice = (price: number) => {
  return `${new Intl.NumberFormat('fa-IR').format(price)} تومان`;
};




  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen  pr-64">
        <LoaderLoading/>
      </div>
    );

  if (isError)
    return <p className="text-center text-red-500">خطا در بارگذاری اطلاعات</p>;

  return (
    <div className="min-h-screen flex flex-col bg-green-50 pr-64">
      <Toaster />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">لیست سفارشات</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="جستجو بر اساس نام مشتری..."
            className="border border-gray-300 rounded-xl px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-xl px-5 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
          >
            <option value="">فیلتر </option>
            <option value="در حال ارسال">در حال ارسال</option>
            <option value="تحویل داده شده">تحویل داده شده</option>
            <option value="لغو شده">لغو شده</option>
          </select>
        </div>

        <table className="min-w-full table-auto bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-center text-gray-800">نام کاربر</th>
              <th className="px-4 py-2 text-center text-gray-800">مبلغ کل</th>
              <th className="px-4 py-2 text-center text-gray-800">تاریخ</th>
              <th className="px-4 py-2 text-center text-gray-800">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order: Order) => (
              <tr key={order.id} className="border-t border-gray-200">
                <td className="px-4 py-2 text-center text-black">
                  {order.username}
                </td>
                <td className="px-4 py-2 text-center text-gray-700">
                  {getTotalAmount(order.products) + (order.shippingCost || 0) >
                  0
                    ? formatPrice(
                        getTotalAmount(order.products) +
                          (order.shippingCost || 0)
                      )
                    : 'نامشخص'}
                </td>

                <td className="px-4 py-2 text-center text-gray-700">
                  {new Date(order.createdAt).toLocaleDateString('fa-IR')}
                </td>
                <td
                  className={`px-4 py-2 text-center ${getStatusColor(
                    order.status
                  )}`}
                >
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className=" bg-gray-200 p-0.5 w-24 rounded-sm hover:text-blue-800"
                  >
                    {order.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="absolute bottom-0 left-0 w-full  pr-64">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {selectedOrder && (
        <OrderStatusModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onSuccess={() => refetch()}
        />
      )}
    </div>
  );
};

export default OrdersTable;
