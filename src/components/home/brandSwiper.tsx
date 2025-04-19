import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';

import logo1 from '@/assets/images/roja-logo.jpg';
import logo2 from '@/assets/images/roja-logo.jpg';
import logo3 from '@/assets/images/roja-logo.jpg';
import logo4 from '@/assets/images/roja-logo.jpg';
import logo5 from '@/assets/images/roja-logo.jpg';

const brands = [
  { name: 'Brand 1', logo: logo1 },
  { name: 'Brand 2', logo: logo2 },
  { name: 'Brand 3', logo: logo3 },
  { name: 'Brand 4', logo: logo4 },
  { name: 'Brand 5', logo: logo5 },
  { name: 'Brand 6', logo: logo1 },
  { name: 'Brand 7', logo: logo2 },
  { name: 'Brand 8', logo: logo3 },
  { name: 'Brand 9', logo: logo4 },
];

export default function BrandSwiper() {
  return (
    <div className="swiper-container max-w-screen-xl mx-auto border-2 border-gray-200 p-4 rounded-lg my-10">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          '@1.50': {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="brandSwiper"
      >
        {brands.map((brand, index) => (
          <SwiperSlide key={index}>
            <div className="brand-slide flex flex-col items-center p-4 border-l-2 border-gray-100">
              <Image
                src={brand.logo}
                alt={brand.name}
                className="brand-logo object-contain"
                width={80}
                height={100}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
