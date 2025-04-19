import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  {
    id: 1,
    title: 'محصول ۱',
    desc: 'توضیح کوتاه محصول ۱',
    image:
      'https://images.pexels.com/photos/2721977/pexels-photo-2721977.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 2,
    title: 'محصول ۲',
    desc: 'توضیح کوتاه محصول ۲',
    image:
      'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 3,
    title: 'محصول ۳',
    desc: 'توضیح کوتاه محصول ۳',
    image:
      'https://images.pexels.com/photos/2721977/pexels-photo-2721977.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 4,
    title: 'محصول ۴',
    desc: 'توضیح کوتاه محصول ۴',
    image:
      'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function ProductSlider() {
  return (
    <section className="bg-[var(--color-background)] py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-[var(--color-foreground)] mb-10">
        محصولات ما
      </h2>
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="w-full max-w-5xl mx-auto"
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-[#e5e7eb] hover:shadow-xl transition h-full flex flex-col">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-1">
                    {slide.title}
                  </h3>
                  <p className="text-[var(--color-text)] text-sm">
                    {slide.desc}
                  </p>
                </div>
                <button className="mt-4 text-sm text-white bg-[var(--color-primary)] px-4 py-2 rounded-xl hover:bg-[var(--color-secondary)] transition self-start">
                  مشاهده جزئیات
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
