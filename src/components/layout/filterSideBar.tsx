'use client';
import { useState, useEffect } from 'react';
import { Product } from '@/types/order';

type SidebarFilterProps = {
  products: Product[];
  onFilterChange: (filters: {
    search: string;
    brand: string;
    minPrice: number;
    maxPrice: number;
  }) => void;
};

export default function SidebarFilter({
  products,
  onFilterChange,
}: SidebarFilterProps) {
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [uniqueBrands, setUniqueBrands] = useState<string[]>([]);

  useEffect(() => {
    const prices = products.map(p => Number(p.price));
    const brands = Array.from(new Set(products.map(p => p.brand)));

    setPriceRange({ min: Math.min(...prices), max: Math.max(...prices) });
    setMinPrice(Math.min(...prices));
    setMaxPrice(Math.max(...prices));
    setUniqueBrands(brands);
  }, [products]);

  useEffect(() => {
    onFilterChange({ search, brand, minPrice, maxPrice });
  }, [search, brand, minPrice, maxPrice]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 space-y-5 w-full lg:w-64 border border-gray-100 sticky top-5 h-fit">
      <div>
        <h3 className="font-semibold text-base mb-2 text-gray-700">جستجو</h3>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="جستجوی محصول"
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
        />
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2 text-gray-700">برند</h3>
        <select
          value={brand}
          onChange={e => setBrand(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-green-500 text-sm"
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
        <h3 className="font-semibold text-base mb-2 text-gray-700">محدوده قیمت</h3>
        <div className="text-xs text-gray-600 mb-1">از {priceRange.min.toLocaleString()} تومان</div>
        <input
          type="range"
          min={priceRange.min}
          max={priceRange.max}
          value={minPrice}
          onChange={e => setMinPrice(Number(e.target.value))}
          className="w-full accent-green-500"
        />
        <div className="text-xs text-gray-600 mt-2">تا {priceRange.max.toLocaleString()} تومان</div>
        <input
          type="range"
          min={priceRange.min}
          max={priceRange.max}
          value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
          className="w-full accent-green-500"
        />
      </div>
    </div>
  );
}
