'use client';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types/order';
import { FaStar } from 'react-icons/fa';
import useProducts from '../../hooks/useGetProductList';
import { BASE_URL } from '@/configs/envReader';

export default function ProductsCategoryList() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const { data, isLoading, error } = useProducts(category);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-green-100">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error)
    return <p className="text-center text-red-500">خطا در دریافت داده‌ها</p>;

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-primary">
          محصولات {category}
        </h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.records.map((product: Product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transform transition duration-300"
            >
              <div className="relative group overflow-hidden">
                {product.images && product.images[0] && (
                  <img
                    src={BASE_URL + product.images[0]}
                    alt={product.name}
                    className="w-full h-64  transform transition-transform duration-300 group-hover:scale-110 group-hover:brightness-90"
                    loading="lazy"
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent px-3 py-2 flex items-end justify-start"></div>
              </div>
              <div className="p-4 space-y-3">
                <p className="text-gray-800 text-base font-semibold truncate">
                  {product.name}
                </p>
                <div className="flex flex-row justify-between items-center">
                  <p className="text-sm font-sans   text-gray-800">
                    {product.brand}
                  </p>
                  {product.stock < 3 && (
                    <p className="text-sm text-red-700 font-medium animate-pulse">
                      فقط {product.stock} عدد باقی مانده
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-row gap-1.5 text-gray-700 items-center text-sm">
                      {product.star}
                      <FaStar className="text-yellow-500" />
                    </div>
                  </div>
                </div>
                <div className="text-start">
                  <p className="text-base font-bold text-gray-700">
                    {product.price} تومان
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
