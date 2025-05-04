import Link from "next/link";
import { FaBoxOpen } from "react-icons/fa";


export const EmptyCart = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-center">
        <div className="mx-auto mb-8 w-40 h-40 relative">
          <svg
            className="w-full h-full text-gray-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gray-100 opacity-40"></div>
          </div>
        </div>

        <h2 className="text-2xl font-normal text-gray-800 mb-3">
          سبد خرید شما خالی است
        </h2>
        <p className="text-gray-500 mb-8">
          محصولات مورد علاقه خود را به سبد خرید اضافه کنید
        </p>

        <Link
          href="/products"
          className="inline-flex items-center px-5 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:border-green-500 hover:text-green-600 transition-colors text-sm font-medium"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="ml-1"
          >
            <path
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          مشاهده محصولات
        </Link>
      </div>
    </div>
  );
};
