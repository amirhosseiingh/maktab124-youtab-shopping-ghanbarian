import React, { useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { BASE_URL } from '@/configs/envReader';
import { ProductModalProps } from '@/types/viewModal';
import StarRating from '../base/StarRating';

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [showFullDesc, setShowFullDesc] = useState(false);

  if (!isOpen || !product) return null;

  const toggleDescription = () => setShowFullDesc(!showFullDesc);

  const truncatedDescription =
    product.description.length > 100 && !showFullDesc
      ? product.description.slice(0, 100) + '...'
      : product.description;



  return (
    <div className="fixed inset-0 bg-gray-800/60 flex items-center justify-center z-50 overflow-auto p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          <IoMdCloseCircle />
        </button>

        <img
          src={`${BASE_URL}${product.images[0]}`}
          alt={product.name}
          className="w-full h-56 object-contain rounded-xl mb-4 bg-gray-50"
        />

        <h2 className="text-xl font-bold mb-2">{product.name}</h2>

        <p className="text-gray-600 text-sm mb-4">
          {truncatedDescription}
          {product.description.length > 100 && (
            <button
              onClick={toggleDescription}
              className="text-gray-800 text-sm ml-2 underline"
            >
              {showFullDesc ? 'کمتر' : 'بیشتر'}
            </button>
          )}
        </p>

        <div className="mt-4 py-2 text-sm text-gray-700 grid grid-cols-3 gap-y-2 border-t-2">
          <p>
            <strong>برند:</strong> {product.brand}
          </p>
          <p>
            <strong>دسته‌بندی:</strong> {product.category}
          </p>
          <p>
            <strong>قیمت:</strong> {product.price} تومان
          </p>
          <p>
            <strong>موجودی:</strong> {product.stock} عدد
          </p>
          <div className="flex items-center gap-1 ">
            <strong className="mt-1">امتیاز:</strong>
            <StarRating rating={Number(product.star)} />
          </div>
        </div>

        <ul className="mt-4 list-disc pl-5 text-sm text-gray-700">
          {product.details.map((detail, i) => (
            <li key={i}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductModal;
