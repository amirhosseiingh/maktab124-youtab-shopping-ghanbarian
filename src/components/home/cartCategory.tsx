import { useRouter } from 'next/navigation';
import React from 'react';

const categories = [
  {
    title: 'محصولات آرایشی',
    image:
      'https://images.pexels.com/photos/7810570/pexels-photo-7810570.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'رژ، پنکیک، کرم‌پودر و همه چی برای زیبایی بیشتر.',
    value: 'آرایشی',
  },
  {
    title: 'محصولات بهداشتی',
    image:
      'https://images.pexels.com/photos/8490226/pexels-photo-8490226.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'از مراقبت پوست تا پاک‌کننده‌ها، همه چی برای سلامتی پوستت.',
    value: 'بهداشتی',
  },
  {
    title: 'مراقبت مو',
    image:
      'https://images.pexels.com/photos/7148533/pexels-photo-7148533.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'شامپو، ماسک مو، سرم و هر چیزی که موهات عاشقشن.',
    value: 'مو',
  },
];

const CategoryCards = () => {
  const router = useRouter();

  const handleClick = (categoryValue: string) => {
    router.push(`/productsList?category=${categoryValue}`);
  };

  return (
    <section className="py-10 px-4 bg-[#f9fafb]">
      <h2 className="text-center text-3xl font-bold text-[var(--color-text)] mb-8">
        دسته‌بندی‌ها
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => handleClick(cat.value)}
            className="cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-white transition-transform hover:-translate-y-2 hover:shadow-xl"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 text-[var(--color-text)]">
              <h3 className="text-xl font-semibold mb-2 text-[var(--color-primary)]">
                {cat.title}
              </h3>
              <p className="text-sm">{cat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCards;
