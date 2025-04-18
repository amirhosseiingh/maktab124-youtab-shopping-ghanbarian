import React from 'react';
import poster from '@/assets/images/hero-baner.jpg';

const Hero = () => {
  return (
    <section className="w-full h-[90vh] relative overflow-hidden">
      <img
        src={poster.src}
        alt="محصولات آرایشی و بهداشتی"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
      />
      <div className="relative z-10 h-full flex items-center justify-center bg-gradient-to-r from-black/70 via-transparent to-black/70">
        <div className="bg-black/50 px-6 py-4 rounded-lg">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold text-center max-w-3xl drop-shadow-2xl">
            زیبایی طبیعی، با محصولات اصل و حرفه‌ای فروشگاه یوتاب
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
