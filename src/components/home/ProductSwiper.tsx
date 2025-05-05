'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useProductsQuery } from '@/hooks/getProducts';
import { BASE_URL } from '@/configs/envReader';
import LoaderLoading from '../common/loadding';

export default function ProductSlider() {
  const router = useRouter();
  const { data: products, isLoading, error } = useProductsQuery();

  const truncateTitle = (title: string, maxLength = 40) => {
    return title.length > maxLength
      ? `${title.substring(0, maxLength)}...`
      : title;
  };

  if (isLoading)
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <LoaderLoading />
      </div>
    );
  if (error)
    return (
      <p className="text-center text-red-500 py-12">خطا در دریافت محصولات</p>
    );

  return (
    <section className="bg-gradient-to-b from-[var(--color-background)] to-gray-50 py-12 px-4 mt-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[var(--color-primary)] mb-6 relative pb-4">
          محصولات یوتاب
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[var(--color-secondary)] rounded-full"></span>
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 25 },
            1280: { slidesPerView: 4, spaceBetween: 30 },
          }}
          className="!pb-8"
        >
          {products?.slice(4, 16).map(product => (
            <SwiperSlide key={product.id}>
              <div
                className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
                style={{ minHeight: '400px' }}
              >
                <div className="relative overflow-hidden bg-gray-50 h-56">
                  <img
                    src={BASE_URL + product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className={`absolute top-3 right-3 text-white text-xs font-bold px-3 py-1 rounded-full ${
                      product.stock > 0
                        ? 'bg-[var(--color-secondary)]'
                        : 'bg-red-500'
                    }`}
                  >
                    {product.stock > 0 ? 'موجود' : 'ناموجود'}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <div className="mb-3">
                    <h3
                      className="text-lg font-bold text-gray-800 mb-2"
                      title={product.name}
                    >
                      {truncateTitle(product.name, 30)}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-auto">
                    <button
                      onClick={() => router.push(`/product/${product.id}`)}
                      className="w-full text-sm font-medium text-white bg-[var(--color-primary)] px-4 py-2.5 rounded-lg hover:bg-[var(--color-secondary)] transition-all duration-200 ease-in-out shadow-sm hover:shadow-md flex items-center justify-center gap-1"
                    >
                      <span>مشاهده جزئیات</span>
                      <span className="text-base">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
