'use client';
import { useState } from 'react';
import { TbHttpDelete } from 'react-icons/tb';
import { CiEdit } from 'react-icons/ci';

const mockProducts = Array.from({ length: 35 }, (_, i) => ({
  id: i + 1,
  name: `محصول شماره ${i + 1}`,
  category: ['آرایشی', 'بهداشتی', 'مو'][i % 3],
  price: `${(i + 1) * 10000} تومان`,
  imageUrl:
    'https://img.freepik.com/free-psd/shoes-sale-social-media-post-square-banner-template-design_505751-2856.jpg?uid=R188115530&ga=GA1.1.1383572839.1731317347&semt=ais_hybrid&w=740',
}));


const ITEMS_PER_PAGE = 10;

export default function ProductPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mockProducts.length / ITEMS_PER_PAGE);

  const currentProducts = mockProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (id: number) => {
    console.log(`حذف محصول با شناسه: ${id}`);
  };

  const handleEdit = (id: number) => {
    console.log(`ویرایش محصول با شناسه: ${id}`);
  };

  const handleAddProduct = () => {
    console.log('اضافه کردن محصول جدید');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-green-50 pr-64">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">لیست محصولات</h2>
        <button
          onClick={handleAddProduct}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          افزودن محصول
        </button>

        <table className="min-w-full table-auto bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-center w-1/6">تصویر</th>
              <th className="px-4 py-2 text-center w-1/6">نام محصول</th>
              <th className="px-4 py-2 text-center w-1/6">دسته بندی</th>
              <th className="px-4 py-2 text-center w-1/6">قیمت</th>
              <th className="px-4 py-2 text-center w-1/6">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map(product => (
              <tr key={product.id} className="border-t border-gray-200">
                <td className=" text-center border-l border-green-200 flex flex-row items-center justify-center">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-18 h-18 object-cover rounded  p-1"
                  />
                </td>
                <td className="px-4 py-2 border-l border-green-200 text-center">
                  {product.name}
                </td>
                <td className="px-4 py-2 border-l border-green-200 text-center">
                  {product.category}
                </td>
                <td className="px-4 py-2 border-l border-green-200 text-center">
                  {product.price}
                </td>
                <td className="px-4 py-2 border-l border-green-200 text-center">
                  <div className="flex gap-1 justify-end">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="px-3 py-1 bg-yellow-300 text-white rounded-md hover:bg-yellow-600"
                    >
                      <CiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      <TbHttpDelete />
                    </button>
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
