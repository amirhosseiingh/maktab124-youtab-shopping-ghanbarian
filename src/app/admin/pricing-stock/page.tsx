'use client';
import { useState } from 'react';
import { useProductsQuery } from '@/hooks/getProducts';
import { useUpdateProduct } from '@/hooks/useUpdateProduct ';
import Pagination from '@/components/base/pagination';
import { Product } from '@/types/order';
import { BASE_URL } from '@/configs/envReader';
import toast, { Toaster } from 'react-hot-toast';
import LoaderLoading from '@/components/common/loadding';

export default function PricingStockPage() {
  const [edited, setEdited] = useState<
    Record<number, { price: string; stock: string }>
  >({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { data: allProducts = [], isLoading, error } = useProductsQuery();
  const { mutate: updateProduct, isLoading: updateLoading } =
    useUpdateProduct();

  const filteredProducts = allProducts.filter(
    product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === '' || product.category === selectedCategory)
  );

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleChange = (
    id: number,
    field: 'price' | 'stock',
    value: string
  ) => {
    setEdited(prev => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const handleSave = async () => {
    const updates = Object.entries(edited).map(([idStr, values]) => ({
      id: Number(idStr),
      ...values,
    }));

    try {
      const requests = updates.map(product => updateProduct(product));
      await Promise.all(requests);

      toast.success('اطلاعات با موفقیت ذخیره شد', {
        duration: 3000,
        position: 'top-left',
        style: {
          background: '#016630',
          color: '#fff',
        },
      });
    } catch (error: any) {
      console.error('Error updating products:', error);
      toast.error('خطا در ذخیره تغییرات: ' + error.message);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading || updateLoading)
    return (
      <div className="p-4">
        <LoaderLoading />
      </div>
    );

  if (error instanceof Error)
    return <div className="p-4">خطا در بارگذاری محصولات</div>;

  return (
    <div className="pr-68 pl-4 pt-4 bg-green-50">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4 text-[var(--primary)]">
        مدیریت قیمت و موجودی
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-sm hover:bg-green-700 transition"
          >
            ذخیره تغییرات
          </button>

          <select
            className="border border-green-300 rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
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
          className="border border-green-300 rounded-sm px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-sm text-gray-800 font-lg text-center">
                تصویر
              </th>
              <th className="px-6 py-3 text-sm text-gray-800 font-lg text-center">
                نام محصول
              </th>
              <th className="px-6 py-3 text-sm text-gray-800 font-lg text-center">
                قیمت
              </th>
              <th className="px-6 py-3 text-sm text-gray-800 font-lg text-center">
                موجودی
              </th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map(product => (
              <tr key={product.id} className="hover:bg-gray-50 transition-all">
                <td className="px-6 py-4 text-center">
                  <img
                    src={`${BASE_URL}${product.images[0]}`}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 text-center text-gray-700">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-center text-gray-500">
                  <input
                    type="number"
                    value={
                      edited[product.id]?.price ??
                      product.price?.toString() ??
                      ''
                    }
                    onChange={e =>
                      handleChange(product.id, 'price', e.target.value)
                    }
                    className="border px-2 py-1 rounded w-24 text-center"
                  />
                </td>
                <td className="px-6 py-4 text-center text-gray-500">
                  <input
                    type="number"
                    value={
                      edited[product.id]?.stock ?? product.stock.toString()
                    }
                    onChange={e =>
                      handleChange(product.id, 'stock', e.target.value)
                    }
                    className="border px-2 py-1 rounded w-16 text-center"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalPages={Math.ceil(filteredProducts.length / pageSize)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
