'use client';
import React, { useState } from 'react';
import { useProductsQuery } from '@/lib/getProducts';
import { MoreVertical, Eye, Pencil, Trash } from 'lucide-react';
import Pagination from '@/components/base/pagination';
import { filterByCategory } from '@/utils/productFilter';
import { searchProducts } from '@/utils/productSearch';

const ProductsTable = () => {
  const { data: records, isLoading, isError } = useProductsQuery();
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const productsPerPage = 5;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-green-50 pr-64">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">خطا در بارگذاری محصولات.</div>
    );
  }

  const allProducts =
    records?.flatMap(record =>
      Object.values(record || {}).filter(
        item => item && typeof item === 'object' && item.id
      )
    ) || [];

  const filteredProducts = filterByCategory(allProducts, selectedCategory);
  const finalProducts = searchProducts(filteredProducts, searchQuery);

  const totalPages = Math.ceil(finalProducts.length / productsPerPage);
  const currentProducts = finalProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const toggleMenu = (id: number) => {
    setShowMenu(showMenu === id ? null : id);
  };

  const handleEdit = (id: number) => {
    console.log(`${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`${id}`);
  };

  const handleView = (id: number) => {
    console.log(`${id}`);
  };
  
  return (
    <div className="pr-64 min-h-screen bg-green-50 flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-right">لیست محصولات فروشگاه یوتاب</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded-sm hover:bg-green-700 transition">
              افزودن محصول
            </button>
            <select
              className="border border-green-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              <option value="">همه دسته‌بندی‌ها</option>
              <option value="آرایشی">آرایشی</option>
              <option value="بهداشتی">بهداشتی</option>
              <option value="مو">مو</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="جستجو محصول..."
            className="border border-green-300 rounded-xl px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {finalProducts.length === 0 ? (
          <div
            id="alert-border-5"
            className="flex items-center p-4 border-t-4 border-green-600 bg-gray-50 dark:bg-gray-800 dark:border-gray-600"
            role="alert"
          >
            <svg
              className="shrink-0 w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <div className="ms-3 text-sm font-medium text-gray-800">
              محصولی با این مشخصات یافت نشد!
            </div>
          </div>
        ) : (
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-sm text-gray-800 font-lg text-center">
                  تصویر
                </th>
                <th className="px-6 py-3 text-sm text-gray-800 font-lg text-center">
                  نام
                </th>
                <th className="px-6 py-3 text-sm text-gray-800 font-lg text-center">
                  دسته‌بندی
                </th>
                <th className="px-6 py-3 text-sm text-gray-800 font-lg text-center">
                  قیمت
                </th>
                <th className="px-6 py-3 text-sm text-gray-800 font-lg text-center">
                  موجودی
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map(product => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-all"
                >
                  <td className="px-6 py-4 text-center">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 text-center text-gray-700">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-500">
                    {product.price}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-500">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 text-center relative">
                    <button
                      onClick={() => toggleMenu(product.id)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {showMenu === product.id && (
                      <div className="absolute left-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-xl z-10 overflow-hidden text-sm">
                        <button
                          onClick={() => handleView(product.id)}
                          className="flex items-center justify-between w-full px-4 py-2 hover:bg-blue-100 text-blue-600"
                        >
                          نمایش
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                        <button
                          onClick={() => handleEdit(product.id)}
                          className="flex items-center justify-between w-full px-4 py-2 hover:bg-yellow-100 text-yellow-600"
                        >
                          ویرایش
                          <Pencil className="w-4 h-4 text-yellow-500" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="flex items-center justify-between w-full px-4 py-2 hover:bg-red-100 text-red-600"
                        >
                          حذف
                          <Trash className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProductsTable;
