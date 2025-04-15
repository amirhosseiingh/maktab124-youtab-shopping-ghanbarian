'use client';
import React, { useState } from 'react';
import { useUploadImage } from '@/hooks/useUploadImage';

const AddProductModal = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (formData: any) => void;
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    brand: string;
    category: string;
    price: string;
    stock: string;
    images: string[];
    star: string;
    description: string;
    details: string[];
  }>({
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
  const { mutate: uploadImage, isLoading: isUploading } = useUploadImage();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDetailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDetail = e.target.value;
    setFormData({ ...formData, details: newDetail.split('\n') });
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      uploadImage(file, {
        onSuccess: (downloadLink: string) => {
          setFormData({ ...formData, images: [downloadLink] });
        },
        onError: (error: any) => {
          console.error('Error uploading image:', error);
        },
      });
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const formattedData = {
      createdAt: new Date().toISOString(),
      name: formData.name,
      brand: formData.brand,
      category: formData.category,
      price: formData.price,
      stock: formData.stock,
      images: formData.images, 
      star: formData.star,
      description: formData.description,
      details: formData.details,
      id: Date.now().toString(), 
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
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-md px-2 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />

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
            placeholder="ویژگی‌های محصول (هر ویژگی در یک خط)"
            value={formData.details.join('\n')}
            onChange={handleDetailChange}
            className="border border-gray-300 rounded-md px-2 py-2 text-sm"
          />
          {errors.details && (
            <p className="text-red-500 text-sm">{errors.details}</p>
          )}

          <div className="flex justify-between gap-2">
            <button
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-white px-4 py-2 rounded-md"
            >
              بستن
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              disabled={isUploading}
            >
              {isUploading ? 'در حال بارگذاری...' : 'ارسال'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
