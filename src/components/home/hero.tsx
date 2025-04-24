import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// Images
import slide1 from '@/assets/images/pexels-karolina-grabowska-4041392 (1).jpg';
import slide2 from '@/assets/images/pexels-n-voitkevich-7852674.jpg';
import slide3 from '@/assets/images/pexels-chidy-31141638.jpg';

const HeroSlider = () => {
  const slides = [
    {
      image: slide1.src,
      text: 'زیبایی طبیعی، با محصولات اصل و حرفه‌ای فروشگاه یوتاب',
    },
    {
      image: slide3.src,
      text: 'تنوع بی‌نظیر از محصولات آرایشی و بهداشتی',
    },
    {
      image: slide2.src,
      text: 'بهترین انتخاب برای زیبایی ماندگار',
    },
  ];

  return (
    <Swiper
      pagination={{ clickable: true }}
      navigation={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false, 
      }}
      modules={[Pagination, Navigation, Autoplay]}
      className="mySwiper"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="w-full h-[90vh] relative overflow-hidden">
            <img
              src={slide.image}
              alt={`اسلاید ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 z-10"></div>{' '}
            <div className="absolute bottom-10 left-0 right-0 z-20 px-6 text-center">
              <h1 className="text-white text-3xl md:text-5xl font-semibold leading-tight drop-shadow-2xl">
                {slide.text}
              </h1>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
