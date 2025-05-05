'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import photo1 from '@/assets/images/pexels-cristian-rojas-7615876.jpg';
import photo2 from '@/assets/images/pexels-elena-druzhinina-54874780-7817590.jpg';
import photo3 from '@/assets/images/pexels-n-voitkevich-8467963.jpg';

const categories = [
  {
    title: 'محصولات آرایشی',
    image: photo1.src,
    description: 'رژ، پنکیک، کرم‌پودر و همه چی برای زیبایی بیشتر.',
    value: 'آرایشی',
  },
  {
    title: 'مراقبت مو',
    image: photo3.src,
    description: 'شامپو، ماسک مو، سرم و هر چیزی که موهات عاشقشن.',
    value: 'مو',
  },
  {
    title: 'محصولات بهداشتی',
    image: photo2.src,
    description: 'از مراقبت پوست تا پاک‌کننده‌ها، همه چی برای سلامتی پوستت.',
    value: 'بهداشتی',
  },
];

const CategoryCards = () => {
  const router = useRouter();

  const handleClick = (categoryValue: string) => {
    router.push(`/productsList?category=${categoryValue}`);
  };

  return (
    <section className="py-20 px-6 bg-[#fefefe]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 relative inline-block">
            <span className="relative z-10">دسته‌بندی‌ها</span>
            <span className="absolute left-1/2 -bottom-2 w-24 h-1 bg-[var(--color-primary)] rounded-full -translate-x-1/2 animate-pulse" />
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => handleClick(cat.value)}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent z-10"></div>

              <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
                <h3 className="text-2xl font-bold mb-2 leading-snug">
                  {cat.title}
                </h3>
                <p className="text-sm opacity-90 mb-4 leading-relaxed">
                  {cat.description}
                </p>
                <button className="text-sm font-semibold bg-white text-[var(--color-primary)] px-5 py-2 rounded-full hover:bg-[var(--color-secondary)] hover:text-white transition-all duration-300">
                  مشاهده محصولات
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
