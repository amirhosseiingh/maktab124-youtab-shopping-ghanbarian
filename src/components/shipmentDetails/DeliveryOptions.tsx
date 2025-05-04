'use client';
import { FaTruck, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDeliveryDate,
  setDeliveryTime,
  setShippingMethod,
} from '@/redux/slices/shipmentSlice';

interface DeliveryOptionsProps {}

export const DeliveryOptions = () => {
  const dispatch = useDispatch();
  const { deliveryDate, deliveryTime, shippingMethod } = useSelector(
    (state: any) => state.shipment
  );

  const deliveryTimes = [
    'صبح (۸-۱۲)',
    'ظهر (۱۲-۱۶)',
    'عصر (۱۶-۲۰)',
    'شب (۲۰-۲۴)',
  ];

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaTruck className="text-blue-500" />
        زمان و روش ارسال
      </h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
            <FaCalendarAlt className="text-gray-400" />
            تاریخ تحویل
          </label>
          <DatePicker
            selected={deliveryDate}
            onChange={(date: Date | null) =>
              dispatch(setDeliveryDate(date ? date.toISOString() : ''))
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholderText="انتخاب تاریخ"
            minDate={new Date()}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            بازه زمانی تحویل
          </label>
          <div className="grid grid-cols-2 gap-2">
            {deliveryTimes.map(time => (
              <button
                key={time}
                type="button"
                onClick={() => dispatch(setDeliveryTime(time))}
                className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                  deliveryTime === time
                    ? 'bg-blue-50 border-blue-500 text-blue-600'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            روش ارسال
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-3 space-x-reverse">
              <input
                type="radio"
                name="shipping"
                checked={shippingMethod === 'standard'}
                onChange={() => dispatch(setShippingMethod('standard'))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">پست پیشتاز (3-2 روز کاری)</span>
            </label>
            <label className="flex items-center space-x-3 space-x-reverse">
              <input
                type="radio"
                name="shipping"
                checked={shippingMethod === 'express'}
                onChange={() => dispatch(setShippingMethod('express'))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">پیک موتوری (24 ساعته)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
