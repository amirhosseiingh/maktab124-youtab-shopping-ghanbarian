'use client';
import { BASE_URL } from '@/configs/envReader';
import { useProductsQuery } from '@/hooks/getProducts';
import { FaStar } from 'react-icons/fa';
import LoaderLoading from '../common/loadding';
import { useState } from 'react';
import { Product } from '@/types/order';
import ProductFilterSidebar from '../layout/ProductFilterSidebar';
import ErrorAlarm from '../common/errorAlarm';
import Link from 'next/link';

const AllProductsList = () => {
  const { data, isLoading, error } = useProductsQuery();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const handleFilterChange = (filters: {
    search: string;
    brand: string;
    category: string;
    minPrice: number;
    maxPrice: number;
  }) => {
    if (!data) return;

    const filtered = data.filter(product => {
      const matchesSearch =
        filters.search === '' ||
        product.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesBrand =
        filters.brand === '' || product.brand === filters.brand;
      const matchesCategory =
        filters.category === '' || product.category === filters.category;
      const price = Number(product.price);
      const matchesPrice =
        price >= filters.minPrice && price <= filters.maxPrice;

      return matchesSearch && matchesBrand && matchesCategory && matchesPrice;
    });

    setFilteredProducts(filtered);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-20">
        <LoaderLoading />
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center p-10">خطا در دریافت اطلاعات</div>
    );

  return (
    <div className="flex gap-6">
      {data && (
        <ProductFilterSidebar
          products={data || []}
          onFilterChange={handleFilterChange}
        />
      )}
      <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 bg-[var(--background)] text-[var(--text)]">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200">
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
                  <p className="text-xs text-gray-500 mt-1">
                    برند: {product.brand}
                  </p>
                  {Number(product.stock) === 0 ? (
                    <p className="text-xs text-white bg-red-600 rounded-full px-3 py-1 mt-2 w-fit shadow-sm">
                      ناموجود
                    </p>
                  ) : Number(product.stock) > 0 &&
                    Number(product.stock) <= 5 ? (
                    <p className="text-xs text-red-700 font-semibold animate-pulse mt-2">
                      فقط {product.stock} عدد باقی مانده
                    </p>
                  ) : null}

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
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 font-medium py-10">
            <ErrorAlarm />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProductsList;
