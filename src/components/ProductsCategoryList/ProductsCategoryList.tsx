'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Product } from '@/types/order';
import { FaStar } from 'react-icons/fa';
import useProducts from '../../hooks/useGetProductList';
import { BASE_URL } from '@/configs/envReader';
import SidebarFilter from '@/components/layout/filterSideBar';
import LoaderLoading from '../common/loadding';
import ErrorAlarm from '../common/errorAlarm';
import Link from 'next/link';

export default function ProductsCategoryList() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  const { data, isLoading, error } = useProducts(category);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (data?.records) {
      setFilteredProducts(data.records);
    }
  }, [data]);

  const handleFilterChange = (filters: {
    search: string;
    brand: string;
    minPrice: number;
    maxPrice: number;
  }) => {
    if (!data?.records) return;

    const filtered = data.records.filter(product => {
      const matchesSearch =
        filters.search === '' ||
        product.name.toLowerCase().includes(filters.search.toLowerCase());

      const matchesBrand =
        filters.brand === '' || product.brand === filters.brand;

      const price = Number(product.price);
      const matchesPrice = price >= filters.minPrice && price <= filters.maxPrice;

      return matchesSearch && matchesBrand && matchesPrice;
    });

    setFilteredProducts(filtered);
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center mt-20'>
        <LoaderLoading />
      </div>
    );
  }

  if (error)
    return <p className="text-center text-red-500">خطا در دریافت داده‌ها</p>;

  return (
    <div className="flex bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 gap-6">
      {data && (
        <SidebarFilter
          products={data.records}
          onFilterChange={handleFilterChange}
        />
      )}

      <div className="flex-1">
        <h2 className="text-3xl font-extrabold text-primary mb-6">
          محصولات {category}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: Product) => (
              <Link href={`/product/${product.id}`} key={product.id}>
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transform transition duration-300 cursor-pointer">
                  <div className="relative group overflow-hidden">
                    {product.images && product.images[0] && (
                      <img
                        src={BASE_URL + product.images[0]}
                        alt={product.name}
                        className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110 group-hover:brightness-90"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-gray-800 text-base font-semibold truncate">
                      {product.name}
                    </p>
                    <div className="flex flex-row justify-between items-center">
                      <p className="text-sm text-gray-800">
                        {product.brand.length > 15
                          ? `${product.brand.slice(0, 15)}...`
                          : product.brand}
                      </p>
                      {product.stock < 3 && (
                        <p className="text-sm text-red-700 font-medium animate-pulse">
                          فقط {product.stock} عدد باقی مانده
                        </p>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-700 gap-1.5">
                      {product.star}
                      <FaStar className="text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-gray-700">
                        {product.price} تومان
                      </p>
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
    </div>
  );
}
