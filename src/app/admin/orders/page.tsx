'use client';
import { useOrdersQuery } from '@/lib/getOrders';
import { Order } from '@/types/order';
import { useState } from 'react';

const OrdersTable = () => {
  const { data: orders, isLoading, isError } = useOrdersQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 2;

  if (isLoading)
    return <p className="text-center text-gray-500">در حال بارگذاری...</p>;

  if (isError)
    return <p className="text-center text-red-500">خطا در بارگذاری اطلاعات</p>;

  const safeOrders = orders || [];

 
  const totalPages = Math.ceil(safeOrders.length / ordersPerPage);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = safeOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="min-h-screen flex flex-col bg-green-50 pr-64">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">لیست سفارشات</h2>
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
                  {order.totalAmount.toLocaleString()} تومان
                </td>
                <td className="px-4 py-2 text-center text-gray-700">
                  {new Date(order.createdAt).toLocaleDateString('fa-IR')}
                </td>
                <td className="px-4 py-2 text-center text-gray-700">
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="py-4 bg-white shadow-inner border-t flex justify-center space-x-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === idx + 1
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
