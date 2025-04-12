'use client';
import React from 'react';

type Props = {
  onOpenModal: () => void;
  isModalOpen: boolean;
  selectedCategory: string;
  onChangeCategory: (value: string) => void;
  searchQuery: string;
  onChangeSearch: (value: string) => void;
  renderModal: () => React.ReactNode;
};

const ProductTableHeader = ({
  onOpenModal,
  isModalOpen,
  selectedCategory,
  onChangeCategory,
  searchQuery,
  onChangeSearch,
  renderModal,
}: Props) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenModal}
          className="bg-green-600 text-white px-4 py-2 rounded-sm hover:bg-green-700 transition"
        >
          افزودن محصول
        </button>
        {isModalOpen && renderModal()}

        <select
          className="border border-green-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={selectedCategory}
          onChange={e => onChangeCategory(e.target.value)}
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
        onChange={e => onChangeSearch(e.target.value)}
      />
    </div>
  );
};

export default ProductTableHeader;
