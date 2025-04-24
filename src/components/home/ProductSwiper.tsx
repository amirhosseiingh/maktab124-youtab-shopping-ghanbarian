'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useProductsQuery } from '@/hooks/getProducts';
import { BASE_URL } from '@/configs/envReader';
import LoaderLoading from '../common/loadding';

export default function ProductSlider() {
  const router = useRouter();
  const { data: products, isLoading, error } = useProductsQuery();

  if (isLoading) return <div><LoaderLoading/></div>;
  if (error)
    return <p className="text-center text-red-500">خطا در دریافت محصولات</p>;

  return (
    <section className="bg-[var(--color-background)] py-12 px-4">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[var(--color-foreground)] mb-10">
        محصولات یوتاب
      </h2>
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="w-full max-w-6xl mx-auto"
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {products?.slice(4, 16).map(product => (
          <SwiperSlide key={product.id}>
            <div
              className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 h-full flex flex-col"
              style={{ minHeight: '450px' }} 
            >
              <div className="relative overflow-hidden">
                <img
                  src={BASE_URL + product.images[0]}
                  alt={product.name}
                  className="w-full h-72 p-8 object-cover transition-transform duration-300 hover:scale-110" // ارتفاع عکس بیشتر
                />
                <div
                  className={`absolute top-2 right-2 text-white text-xs font-medium px-2 py-1 rounded-lg shadow-md ${
                    product.stock > 0
                      ? 'bg-[var(--color-secondary)]'
                      : 'bg-red-500'
                  }`}
                >
                  {product.stock > 0 ? 'موجود' : 'ناموجود'}
                </div>
              </div>
              <div className="p-4 flex flex-col justify-around flex-grow">
                <div className="flex flex-col justify-between h-full">
                  <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-[var(--color-text)] text-sm line-clamp-1 truncate mb-4">
                    {product.description}
                  </p>
                  <button
                    onClick={() => router.push(`/product/${product.id}`)}
                    className="text-sm font-medium text-white bg-[var(--color-primary)] px-6 py-2 rounded-full hover:bg-[var(--color-secondary)] transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl self-start"
                  >
                    مشاهده جزئیات
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
