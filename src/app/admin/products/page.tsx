'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useProductsQuery } from '@/lib/getProdducts';
import { Product } from '@/types/order';

const ITEMS_PER_PAGE = 10;

export default function ProductPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { data: products, isLoading, isError } = useProductsQuery();
  console.log(products);

  const totalPages = useMemo(() => {
    return products ? Math.ceil(products.length / ITEMS_PER_PAGE) : 0;
  }, [products]);

  const currentProducts = useMemo(() => {
    return products
      ? products
          .filter(product => {
            // بررسی اینکه آیا product.name وجود دارد و از نوع string است
            if (typeof product.name !== 'string') return false;

            return (
              product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
              (selectedCategory === '' || product.category === selectedCategory)
            );
          })
          .slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
          )
      : [];
  }, [products, searchTerm, selectedCategory, currentPage]);


  const handleDelete = useCallback((id: number) => {
    console.log(`محصول ${id} حذف شد`);
  }, []);

  const handleEdit = useCallback((id: number) => {
    console.log(`محصول ${id} ویرایش شد`);
  }, []);

  const handleAddProduct = useCallback(() => {
    console.log('اضافه کردن محصول جدید');
  }, []);

  const toggleMenu = useCallback(
    (id: number) => {
      setShowMenu(showMenu === id ? null : id);
    },
    [showMenu]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.menu')) {
        setShowMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (isError) return <div>خطا در بارگذاری محصولات.</div>;

  return (
    <div className="min-h-screen bg-green-50 pr-64">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">لیست محصولات</h2>
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <button
            onClick={handleAddProduct}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded shadow-md hover:shadow-lg transition-all"
          >
            افزودن محصول
          </button>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none"
          >
            <option value="">همه دسته‌بندی‌ها</option>
            <option value="آرایشی">آرایشی</option>
            <option value="بهداشتی">بهداشتی</option>
            <option value="مو">مو</option>
          </select>
          <input
            type="text"
            placeholder="جستجو محصول..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded w-full max-w-sm"
          />
        </div>

        <table className="w-full border border-gray-200 rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-gray-800">تصویر</th>
              <th className="px-4 py-2 text-gray-800">نام</th>
              <th className="px-4 py-2 text-gray-800">دسته‌بندی</th>
              <th className="px-4 py-2 text-gray-800">قیمت</th>
              <th className="px-4 py-2 text-gray-800">موجودی</th>
              <th className="px-4 py-2 text-gray-800">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map(product => (
              <tr key={product.id} className="border-t">
                <td className="px-4 py-2 text-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 text-center">{product.name}</td>
                <td className="px-4 py-2 text-center">{product.category}</td>
                <td className="px-4 py-2 text-center">
                  {product.price.toLocaleString()} تومان
                </td>
                <td className="px-4 py-2 text-center">{product.stock}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => toggleMenu(product.id)}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    ...
                  </button>
                  {showMenu === product.id && (
                    <div className="menu bg-white shadow-md rounded mt-2">
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="block w-full px-4 py-2 hover:bg-gray-100"
                      >
                        ویرایش
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="block w-full px-4 py-2 hover:bg-gray-100"
                      >
                        حذف
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
