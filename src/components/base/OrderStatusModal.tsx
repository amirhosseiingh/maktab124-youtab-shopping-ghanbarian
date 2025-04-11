'use client';

import {  Props } from '@/types/order';
import { useUpdateOrderStatus } from '@/lib/useUpdateOrderStatus';
import toast from 'react-hot-toast';
import { useState } from 'react';
import {
  FaUser,
  FaMoneyBill,
  FaCalendarAlt,
  FaClipboardCheck,
} from 'react-icons/fa';
import { getStatusColor } from '../ui/getStatusColor';



const STATUSES = ['تحویل داده شده', 'لغو شده', 'در حال ارسال'];

const OrderStatusModal = ({ order, onClose, onSuccess }: Props) => {
  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const { mutate, isLoading } = useUpdateOrderStatus();

  const handleUpdate = () => {
    if (!selectedStatus || selectedStatus === order.status) {
      toast.error('لطفا وضعیت جدیدی انتخاب کنید', {
        duration: 3000,
        position: 'top-left',
        style: {
          width: '260px',
          color: '#171717',
          marginRight: '264px',
        },
      });
      return;
    }

    mutate(
      { orderId: order.id, newStatus: selectedStatus },
      {
        onSuccess: () => {
          toast.success(`وضعیت به ${selectedStatus} تغییر کرد `, {
            duration: 3000,
            position: 'top-left',
            style: {
              background: '#50a14f',
              width: '260px',
              color: '#fff',
              marginRight : '264px'
            },
          });
          onClose();
          onSuccess();
        },
        onError: () => {
          toast.error('خطا در بروزرسانی وضعیت ❌');
        },
      }
    );
  };

 

  return (
    <div className="fixed inset-0 bg-gray-800/60 flex items-center justify-center z-50 transition-opacity">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-2xl transform transition-all duration-300">
        <h3 className="text-lg font-bold mb-4 text-center border-b pb-2">
          جزئیات سفارش
        </h3>

        <div className="flex items-center mb-4  gap-1">
          <FaUser className="text-gray-600 mr-2" />
          <p>
            <strong>کاربر:</strong> {order.username}
          </p>
        </div>
        <div className="flex items-center mb-4 gap-1">
          <FaMoneyBill className="text-green-600 mr-2" />
          <p>
            <strong>مبلغ:</strong> {order.totalAmount.toLocaleString()} تومان
          </p>
        </div>
        <div className="flex items-center mb-4 gap-1">
          <FaCalendarAlt className="text-blue-600 mr-2" />
          <p>
            <strong>تاریخ:</strong>{' '}
            {new Date(order.createdAt).toLocaleDateString('fa-IR')}
          </p>
        </div>
        <div className="flex items-center mb-4 gap-1">
          <FaClipboardCheck
            className={`mr-2 ${getStatusColor(order.status)}`}
          />
          <p>
            <strong>وضعیت فعلی:</strong>{' '}
            <span className={getStatusColor(order.status)}>{order.status}</span>
          </p>
        </div>

        <div className="mt-6">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            تغییر وضعیت
          </label>
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
          >
            <option value="" disabled>
              انتخاب وضعیت جدید
            </option>
            {STATUSES.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex justify-between gap-2">
          <button
            onClick={handleUpdate}
            disabled={isLoading}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded shadow hover:shadow-md transition-all disabled:opacity-60"
          >
            {isLoading ? 'در حال بروزرسانی...' : 'ثبت تغییر'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 shadow-md transition-all"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusModal;
