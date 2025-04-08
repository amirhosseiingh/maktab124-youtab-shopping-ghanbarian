'use client';

import { useOrdersQuery } from '@/lib/getOrders';
import { Order } from '@/types/order';
import { useState } from 'react';
import OrderStatusModal from '../../../components/base/OrderStatusModal';
import { Toaster } from 'react-hot-toast';
import { getStatusColor } from '@/components/ui/getStatusColor';

const OrdersTable = () => {
  const { data: orders, isLoading, isError, refetch } = useOrdersQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const ordersPerPage = 5;
  const safeOrders = orders || [];

  const totalPages = Math.ceil(safeOrders.length / ordersPerPage);
  const currentOrders = safeOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-green-50 pr-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (isError)
    return <p className="text-center text-red-500">خطا در بارگذاری اطلاعات</p>;

  return (
    <div className="min-h-screen flex flex-col bg-green-50 pr-64">
      <Toaster />
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
                  {order.totalAmount
                    ? order.totalAmount.toLocaleString()
                    : 'نامشخص'}{' '}
                  تومان
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

        {/* Pagination */}
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
