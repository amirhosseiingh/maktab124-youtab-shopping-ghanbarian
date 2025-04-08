'use client';
import { useState, useEffect } from 'react';

const mockProducts = Array.from({ length: 35 }, (_, i) => ({
  id: i + 1,
  name: `محصول شماره ${i + 1}`,
  category: ['آرایشی', 'بهداشتی', 'مو'][i % 3],
  price: `${(i + 1) * 10000} تومان`,
  stock: 100 - (i % 10),
  imageUrl:
    'https://img.freepik.com/free-psd/shoes-sale-social-media-post-square-banner-template-design_505751-2856.jpg',
}));

const ITEMS_PER_PAGE = 10;

export default function ProductPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const totalPages = Math.ceil(mockProducts.length / ITEMS_PER_PAGE);

  const currentProducts = mockProducts
    .filter(
      product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === '' || product.category === selectedCategory)
    )
    .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleDelete = (id: number) => {
    console.log(` ${id}`);
  };

  const handleEdit = (id: number) => {
    console.log(` ${id}`);
  };

  const handleAddProduct = () => {
    console.log('اضافه کردن محصول جدید');
  };

  const toggleMenu = (id: number) => {
    setShowMenu(showMenu === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.menu')) {
        setShowMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-green-50 pr-64">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">لیست محصولات</h2>
        <div className="flex flex-row justify-between">
          <div className="flex gap-4 mb-4">
            <button
              onClick={handleAddProduct}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              افزودن محصول
            </button>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
            >
              <option value="" disabled selected={!selectedCategory}>
                فیلتر
              </option>
              <option value="">همه دسته‌بندی‌ها</option>
              <option value="آرایشی">آرایشی</option>
              <option value="بهداشتی">بهداشتی</option>
              <option value="مو">مو</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="جستجو..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>

        <table className="min-w-full table-auto bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-center w-1/6 text-gray-800">
                تصویر
              </th>
              <th className="px-4 py-2 text-center w-1/6 text-gray-800">
                نام محصول
              </th>
              <th className="px-4 py-2 text-center w-1/6 text-gray-800">
                دسته بندی
              </th>
              <th className="px-4 py-2 text-center w-1/6 text-gray-800">
                قیمت
              </th>
              <th className="px-4 py-2 text-center w-1/6 text-gray-800">
                موجودی
              </th>
              <th className="action-column text-left px-2 py-2 w-1/12"></th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map(product => (
              <tr key={product.id} className="border-t border-gray-200">
                <td className="text-center flex flex-row items-center justify-center">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded p-1"
                  />
                </td>
                <td className="px-4 py-2 text-center text-black text-lg">
                  {product.name}
                </td>
                <td className="px-4 py-2 text-center text-gray-700">
                  {product.category}
                </td>
                <td className="px-4 py-2 text-center text-gray-700">
                  {product.price}
                </td>
                <td className="px-4 py-2 text-center text-gray-700">
                  {product.stock}
                </td>
                <td className="action-column px-2 py-2 text-left">
                  <div className="flex gap-1 relative">
                    <button
                      onClick={() => toggleMenu(product.id)}
                      className="px-3 py-1 text-gray-700 text-xl hover:text-black"
                    >
                      ...
                    </button>
                    {showMenu === product.id && (
                      <div className="menu absolute left-0 mt-2 w-40 bg-white shadow-md rounded-md z-50">
                        <button
                          onClick={() => handleEdit(product.id)}
                          className="w-full px-3 py-2 text-right text-gray-700 hover:bg-gray-100"
                        >
                          ویرایش
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="w-full px-3 py-2 text-right text-gray-700 hover:bg-gray-100"
                        >
                          حذف
                        </button>
                        <button
                          onClick={() =>
                            console.log(`نمایش محصول ${product.id}`)
                          }
                          className="w-full px-3 py-2 text-right text-gray-700 hover:bg-gray-100"
                        >
                          نمایش
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="py-4 bg-white shadow-inner border-t flex justify-center space-x-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === idx + 1
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700'
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
