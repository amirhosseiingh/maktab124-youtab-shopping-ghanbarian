'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setPaymentStatus } from '@/redux/slices/paymentSlice';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';

const OrderSuccessPage = () => {
  const router = useRouter();
  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(setPaymentStatus('paid')); 
  }, [dispatch]);

  const handleViewOrderStatus = () => {
    router.push('/checkout');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-100 to-blue-200">
      <motion.div
        className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg text-center"
        initial={{ opacity: 0,   y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex justify-center mb-4"
          initial={{ scale:  0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FiCheckCircle className="text-green-500 text-5xl" />
        </motion.div>

        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          پرداخت با موفقیت انجام شد!
        </h2>
        <p className="text-gray-600 mb-6">
          پرداخت شما با موفقیت انجام شده است. حالا می‌توانید وضعیت سفارش خود را
          مشاهده کنید.
        </p>

        <motion.div
          className="flex gap-4 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            onClick={handleViewOrderStatus}
            className="flex-1 py-3 px-6 rounded-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold shadow-md transition-all duration-300 transform hover:scale-105"
          >
            مشاهده وضعیت سفارش
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderSuccessPage;
