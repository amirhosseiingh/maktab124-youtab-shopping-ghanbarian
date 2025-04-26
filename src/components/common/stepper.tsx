import React from 'react';

const Stepper = () => {
  return (
    <div className="flex items-start max-w-screen-lg mx-auto">
      {/* Step 1 (سبد خرید) */}
      <div className="w-full">
        <div className="flex items-center w-full">
          <div className="w-7 h-7 shrink-0 mx-[-1px] bg-[var(--color-primary)] flex items-center justify-center rounded-full">
            <span className="text-sm text-white font-semibold">1</span>
          </div>
          <div className="w-full h-[3px] mx-4 rounded-lg bg-[var(--color-primary)]"></div>
        </div>
        <div className="mt-2 mr-4">
          <h6 className="text-sm font-semibold text-[var(--color-primary)]">سبد خرید</h6>
          <p className="text-xs text-gray-500">تکمیل شده</p>
        </div>
      </div>

      {/* Step 2 (ارسال) */}
      <div className="w-full">
        <div className="flex items-center w-full">
          <div className="w-7 h-7 shrink-0 mx-[-1px] bg-gray-300 flex items-center justify-center rounded-full">
            <span className="text-sm text-white font-semibold">2</span>
          </div>
          <div className="w-full h-[3px] mx-4 rounded-lg bg-gray-300"></div>
        </div>
        <div className="mt-2 mr-4">
          <h6 className="text-sm font-semibold text-gray-600">ارسال</h6>
          <p className="text-xs text-gray-500">در انتظار</p>
        </div>
      </div>

      {/* Step 3 (تسویه حساب) */}
      <div>
        <div className="flex items-center">
          <div className="w-7 h-7 shrink-0 mx-[-1px] bg-gray-300 flex items-center justify-center rounded-full">
            <span className="text-sm text-white font-semibold">3</span>
          </div>
        </div>
        <div className="mt-2">
          <h6 className="text-sm font-semibold text-gray-600 w-16">تسویه حساب</h6>
          <p className="text-xs text-gray-500">در انتظار</p>
        </div>
      </div>
    </div>
  );
}

export default Stepper;
