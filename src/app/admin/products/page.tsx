'use client';
import React, { useState } from 'react';
import { useAddProductMutation } from '@/hooks/productService';
import { useDeleteProduct } from '@/hooks/useDeleteProduct ';
import AddProductModal from '@/components/modals/AddProductModal';
import Pagination from '@/components/base/pagination';
import { filterByCategory } from '@/utils/productFilter';
import { searchProducts } from '@/utils/productSearch';
import { MoreVertical, Eye, Pencil, Trash } from 'lucide-react';
import { useProductsQuery } from '@/hooks/getProducts';
import  { Toaster } from 'react-hot-toast';
import NoResult from '@/components/noResult/noResult';
import { BASE_URL } from '@/configs/envReader';
import DeleteConfirmModal from '@/components/modals/deleteModal';
import ProductModal from '@/components/modals/ProductModal';
import { ProductRecord } from '@/types/order';
import EditProductModal from '@/components/modals/editModal';

const ProductsTable = () => {
  const { data: records, isLoading, isError } = useProductsQuery();
  const addProductMutation = useAddProductMutation();
  const deleteProductMutation = useDeleteProduct();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductRecord | null>(
    null
  );
  const productsPerPage = 5;
  const allProducts = Array.isArray(records) ? records : [];
  const filteredProducts = filterByCategory(allProducts, selectedCategory);
  const finalProducts = searchProducts(filteredProducts, searchQuery);
  const totalPages = Math.ceil(finalProducts.length / productsPerPage);
  const currentProducts = finalProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const handleViewModalOpen = () => setIsViewModalOpen(true);
  const handleViewModalClose = () => setIsViewModalOpen(false);

  const handleAddProduct = (formData: any) => {
    addProductMutation.mutate(formData, {
      onSuccess: () => {
        handleModalClose();
      },
      onError: error => {
        console.log(error);
      },
    });
  };

  const handleView = (productId: string): void => {
    if (!records) {
      console.log('Records is undefined');
      return;
    }

    const product = records.find((prod: any) => prod.id === productId);
    if (product) {
      setIsModalOpen(false);
      setIsEditModalOpen(false);
      setSelectedProduct(product);
      setIsViewModalOpen(true);
      setShowMenu(null);
    }
  };

  const handleDelete = (id: string): void => {
    setSelectedProductId(id);
    setIsDeleteModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedProductId(null);
  };

  const handleConfirmDelete = () => {
    if (!selectedProductId) return;
    deleteProductMutation.mutate(selectedProductId, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setSelectedProductId(null);
      },
      onError: () => {
        setIsDeleteModalOpen(false);
      },
    });
  };

  const handleEdit = (productId: string): void => {
    if (!records) return;

    const product = records.find((prod: any) => prod.id === productId);
    if (product) {
      setIsModalOpen(false);
      setIsViewModalOpen(false);

      setSelectedProduct(product);
      setIsEditModalOpen(true);
    }
  };

  const handleEditModalOpen = (product: ProductRecord) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
    setShowMenu(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen pr-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">خطا در بارگذاری محصولات.</div>
    );
  }

  function toggleMenu(id: any): void {
    setShowMenu(showMenu === id ? null : id);
  }

  return (
    <div className="pr-64 min-h-screen bg-green-50 flex flex-col">
      <Toaster />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-right">
          لیست محصولات فروشگاه یوتاب
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={handleModalOpen}
              className="bg-green-600 text-white px-4 py-2 rounded-sm hover:bg-green-700 transition"
            >
              افزودن محصول
            </button>
            {isModalOpen && (
              <AddProductModal
                onClose={handleModalClose}
                onSubmit={handleAddProduct}
              />
            )}

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
          <NoResult />
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
                    {product.images?.[0] ? (
                      <img
                        src={`${BASE_URL}${product.images[0]}`}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
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

      {isDeleteModalOpen && (
        <DeleteConfirmModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      {isViewModalOpen && selectedProduct && (
        <ProductModal
          isOpen={isViewModalOpen}
          onClose={handleViewModalClose}
          product={selectedProduct as any}
        />
      )}

      {isEditModalOpen && selectedProduct && (
        <EditProductModal
          onClose={handleEditModalClose}
          onSubmit={handleEdit}
          defaultValues={selectedProduct}
        />
      )}
    </div>
  );
};

export default ProductsTable;
