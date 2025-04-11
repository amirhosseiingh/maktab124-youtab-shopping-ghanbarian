'use client';
import React, { useState } from 'react';

const AddProductModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (formData: any) => void;
}) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    stock: '',
    images: [''],
    star: '',
    description: '',
    details: [''],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name) newErrors.name = 'نام محصول اجباری است.';
    if (!formData.brand) newErrors.brand = 'برند محصول اجباری است.';
    if (
      !formData.category ||
      !['آرایشی', 'بهداشتی', 'مو'].includes(formData.category)
    )
      newErrors.category = 'دسته‌بندی نامعتبر است.';
    if (!formData.price || isNaN(Number(formData.price)))
      newErrors.price = 'قیمت باید یک عدد معتبر باشد.';
    if (!formData.stock || Number(formData.stock) < 0)
      newErrors.stock = 'موجودی نمی‌تواند کمتر از ۰ باشد.';
    if (!formData.images || formData.images.length < 1 || !formData.images[0])
      newErrors.images = 'حداقل یک تصویر لازم است.';
    if (
      !formData.star ||
      Number(formData.star) < 0 ||
      Number(formData.star) > 5
    )
      newErrors.star = 'ستاره باید بین ۰ تا ۵ باشد.';
    if (!formData.description)
      newErrors.description = 'توضیحات محصول ضروری است.';
    if (
      !formData.details ||
      formData.details.length < 1 ||
      !formData.details[0]
    )
      newErrors.details = 'ویژگی‌های محصول لازم است.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const formattedData = {
      0: {
        id: Date.now(), 
        name: formData.name,
        brand: formData.brand,
        category: formData.category,
        price: formData.price,
        stock: formData.stock,
        images: formData.images,
        star: formData.star,
        description: formData.description,
        details: formData.details,
      },
      createdAt: new Date().toISOString(),
    };
    onSubmit(formattedData);
  };
  
  return (
    <div className="fixed inset-0 bg-gray-800/60 flex items-center justify-center z-50 transition-opacity">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          افزودن محصول
        </h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="نام محصول"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="brand"
              placeholder="برند محصول"
              value={formData.brand}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand}</p>
            )}

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">انتخاب دسته‌بندی</option>
              <option value="آرایشی">آرایشی</option>
              <option value="بهداشتی">بهداشتی</option>
              <option value="مو">مو</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              name="price"
              placeholder="قیمت"
              value={formData.price}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}

            <input
              type="number"
              name="stock"
              placeholder="موجودی"
              value={formData.stock}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm">{errors.stock}</p>
            )}
          </div>

          <input
            type="text"
            name="images"
            placeholder="لینک تصویر (حداقل یکی)"
            value={formData.images[0]}
            onChange={e =>
              setFormData({ ...formData, images: [e.target.value] })
            }
            className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
          {errors.images && (
            <p className="text-red-500 text-sm">{errors.images}</p>
          )}

          <input
            type="number"
            name="star"
            placeholder="امتیاز محصول (بین ۰ تا ۵)"
            value={formData.star}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
          {errors.star && <p className="text-red-500 text-sm">{errors.star}</p>}

          <textarea
            name="description"
            placeholder="توضیحات محصول"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}

          <textarea
            name="details"
            placeholder="ویژگی‌های محصول"
            value={formData.details[0]}
            onChange={e =>
              setFormData({ ...formData, details: [e.target.value] })
            }
            className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
          {errors.details && (
            <p className="text-red-500 text-sm">{errors.details}</p>
          )}

          <div className="flex justify-between items-center gap-3">
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              افزودن
            </button>
            <button
              onClick={onClose}
              className="text-red-600 font-semibold hover:underline text-sm"
            >
              لغو
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
