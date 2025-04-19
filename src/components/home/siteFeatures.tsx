import React from 'react';
import {
  FaShippingFast,
  FaCreditCard,
  FaShieldAlt,
  FaPhoneAlt,
} from 'react-icons/fa';

export default function Features() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-6 py-16 bg-[#f9fafb] rounded-2xl shadow-lg">
      <div className="feature-card group flex items-center gap-12 p-4 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
        <div className="icon-container mr-4">
          <FaShippingFast
            size={35}
            className="text-[#1b8057] group-hover:text-[#55a44e] transition-all"
          />
        </div>
        <div className="text-container flex flex-col">
          <h3 className="text-lg font-bold text-[#04130d] group-hover:text-[#1b8057] transition-all mb-2">
            ارسال رایگان
          </h3>
          <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-all">
            برای خرید بالای 100 هزار تومان
          </p>
        </div>
      </div>

      <div className="feature-card group flex items-center gap-12 p-4 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
        <div className="icon-container mr-4">
          <FaCreditCard
            size={35}
            className="text-[#1b8057] group-hover:text-[#55a44e] transition-all"
          />
        </div>
        <div className="text-container flex flex-col">
          <h3 className="text-lg font-bold text-[#04130d] group-hover:text-[#1b8057] transition-all mb-2">
            پرداخت امن
          </h3>
          <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-all">
            پرداخت آنلاین و امن در سایت
          </p>
        </div>
      </div>

      <div className="feature-card group flex items-center gap-12 p-4 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
        <div className="icon-container mr-4 ">
          <FaShieldAlt
            size={35}
            className="text-[#1b8057] group-hover:text-[#55a44e] transition-all"
          />
        </div>
        <div className="text-container flex flex-col">
          <h3 className="text-lg font-bold text-[#04130d] group-hover:text-[#1b8057] transition-all mb-2">
            گارانتی بازگشت وجه
          </h3>
          <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-all">
            بازگشت وجه تا 30 روز
          </p>
        </div>
      </div>

      <div className="feature-card group flex items-center gap-12 p-4 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
        <div className="icon-container mr-4">
          <FaPhoneAlt
            size={35}
            className="text-[#1b8057] group-hover:text-[#55a44e] transition-all"
          />
        </div>
        <div className="text-container flex flex-col">
          <h3 className="text-lg font-bold text-[#04130d] group-hover:text-[#1b8057] transition-all mb-2">
            پشتیبانی 24 ساعته
          </h3>
          <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-all">
            پاسخگویی 24/7 به سوالات شما
          </p>
        </div>
      </div>
    </div>
  );
}
