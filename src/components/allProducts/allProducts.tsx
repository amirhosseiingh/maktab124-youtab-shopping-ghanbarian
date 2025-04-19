'use client';
import { BASE_URL } from '@/configs/envReader';
import { useProductsQuery } from '@/hooks/getProducts';
import { FaStar } from 'react-icons/fa';

const AllProductsList = () => {
  const { data, isLoading, error } = useProductsQuery();

  if (isLoading)
    return <div className="text-center p-10">در حال بارگذاری...</div>;

  if (error)
    return (
      <div className="text-red-500 text-center p-10">خطا در دریافت اطلاعات</div>
    );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 bg-[var(--background)] text-[var(--text)]">
      {data?.map(product => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200"
        >
          <div className="w-full h-[200px] p-2 relative bg-gray-50 overflow-hidden rounded-t-lg">
            <img
              src={BASE_URL + product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
          </div>
          <div className="p-3 flex flex-col justify-between h-[150px]">
            <h3 className="text-sm font-semibold line-clamp-2">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">برند: {product.brand}</p>
            {product.stock < 3 && (
              <p className="text-xs text-red-700 font-medium animate-pulse">
                فقط {product.stock} عدد باقی مانده
              </p>
            )}
            <div className="mt-auto flex items-center justify-between">
              <span className="text-[var(--primary)] font-bold text-sm">
                {(+product.price).toLocaleString()} تومان
              </span>
              <div className="flex items-center text-sm text-gray-700">
                <div className="flex items-center gap-1.5">
                  {product.star}
                  <FaStar className="text-yellow-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProductsList;
