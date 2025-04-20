'use client';
import { useState, useEffect } from 'react';
import { Product } from '@/types/order';

type ProductFilterSidebarProps = {
  products: Product[];
  onFilterChange: (filters: {
    search: string;
    brand: string;
    category: string;
    minPrice: number;
    maxPrice: number;
  }) => void;
};

export default function ProductFilterSidebar({
  products,
  onFilterChange,
}: ProductFilterSidebarProps) {
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [uniqueBrands, setUniqueBrands] = useState<string[]>([]);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);

  useEffect(() => {
    const prices = products.map(p => Number(p.price));
    const brands = Array.from(new Set(products.map(p => p.brand)));
    const categories = Array.from(new Set(products.map(p => p.category)));

    setPriceRange({ min: Math.min(...prices), max: Math.max(...prices) });
    setMinPrice(Math.min(...prices));
    setMaxPrice(Math.max(...prices));
    setUniqueBrands(brands);
    setUniqueCategories(categories);
  }, [products]);

  useEffect(() => {
    onFilterChange({ search, brand, category, minPrice, maxPrice });
  }, [search, brand, category, minPrice, maxPrice]);

  return (
    <div className="bg-[var(--background)] rounded-xl shadow-lg p-4 space-y-5 w-full lg:w-64 border border-gray-100 sticky top-5 h-fit">
      <div>
        <h3 className="font-semibold text-base mb-2 text-[var(--text)]">
          جستجو
        </h3>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="جستجوی محصول"
          className="w-full px-3 py-2 border border-[var(--primary)] rounded-lg bg-white focus:ring-2 focus:ring-[var(--primary)] text-sm text-[var(--text)] focus:outline-none"
        />
      </div>
      <div>
        <h3 className="font-semibold text-base mb-2 text-[var(--text)]">
          برند
        </h3>
        <select
          value={brand}
          onChange={e => setBrand(e.target.value)}
          className="w-full px-3 py-2 border border-[var(--primary)] rounded-lg bg-white text-sm text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
        >
          <option value="">همه برندها</option>
          {uniqueBrands.map(b => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3 className="font-semibold text-base mb-2 text-[var(--text)]">
          دسته‌بندی
        </h3>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-[var(--primary)] rounded-lg bg-white text-sm text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
        >
          <option value="">همه دسته‌ها</option>
          {uniqueCategories.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h3 className="font-semibold text-base mb-2 text-[var(--text)]">
          محدوده قیمت
        </h3>
        <div className="text-xs text-[var(--text)] mb-1">
          از {priceRange.min.toLocaleString()} تومان
        </div>
        <input
          type="range"
          min={priceRange.min}
          max={priceRange.max}
          value={minPrice}
          onChange={e => setMinPrice(Number(e.target.value))}
          className="w-full accent-[var(--primary)]"
        />
        <div className="text-xs text-[var(--text)] mt-2">
          تا {priceRange.max.toLocaleString()} تومان
        </div>
        <input
          type="range"
          min={priceRange.min}
          max={priceRange.max}
          value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[var(--primary)]"
        />
      </div>
    </div>
  );
}
