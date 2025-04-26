'use client';
import { useState } from 'react';
import { use } from 'react';
import { useProductQuery } from '@/hooks/getSingleProduct';
import { BASE_URL } from '@/configs/envReader';
import { Truck, RefreshCcw, ShieldCheck, Clock4, Heart } from 'lucide-react';
import StarRating from '@/components/base/StarRating';
import LoaderLoading from '../common/loadding';
import { AiOutlineProduct } from 'react-icons/ai';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import { useDispatch } from 'react-redux';
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from '@/redux/slices/cartSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const shippingFeatures = [
  { icon: <Truck size={18} />, label: 'ارسال سریع' },
  { icon: <RefreshCcw size={18} />, label: 'بازگشت کالا' },
  { icon: <ShieldCheck size={18} />, label: 'اصالت کالا' },
  { icon: <Clock4 size={18} />, label: 'پرداخت در محل' },
];

const SinglePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const { data: product, isLoading, error } = useProductQuery(id);

  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);
  const [productQuantity, setProductQuantity] = useState(0);

  const [showDescription, setShowDescription] = useState(false);

  const cartItem = useSelector((state: RootState) =>
    product ? state.cart.cart.find(item => item.id === product.id) : undefined
  );

  const quantity = cartItem ? cartItem.quantity : 0;

  if (isLoading) return <LoaderLoading />;
  if (error || !product) return <p>محصول یافت نشد.</p>;

  const limitedDetails = showMore
    ? product.details
    : product.details.slice(0, 2);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-[var(--background)] text-[var(--text)]">
      <div className="flex flex-col lg:flex-row gap-10 items-start h-80">
        <div className="w-48 mx-auto">
          <Zoom>
            <img
              src={BASE_URL + product.images[0]}
              alt={product.name}
              className="w-full h-auto rounded-xl shadow-md object-contain cursor-zoom-in"
              style={{ maxHeight: '200px' }}
            />
          </Zoom>
        </div>
        <div className="flex-1 space-y-4">
          <h1 className="text-lg font-bold text-[var(--primary)]">
            {product.name}
          </h1>
          <p className="text-xs text-gray-500">برند: {product.brand}</p>
          <p className="text-xs text-gray-500">دسته‌بندی: {product.category}</p>
          <div className="flex items-center gap-1 ">
            <strong className="mt-1"></strong>
            <StarRating rating={Number(product.star)} />
          </div>
          <div className="space-y-2 text-gray-600 list-disc grid grid-cols-2">
            {limitedDetails.map((d, i) => (
              <li key={i} className="text-sm">
                {d}
              </li>
            ))}
          </div>
          {product.details.length > 4 && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-[var(--primary)] mt-2 block text-sm"
            >
              {showMore ? 'نمایش کمتر' : 'نمایش بیشتر'}
            </button>
          )}
        </div>
        <div className="w-84  p-4 bg-white shadow-xl rounded-2xl space-y-4 transition-all duration-300 hover:shadow-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-gray-700 pb-2 border-b border-gray-200">
            {shippingFeatures.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
              >
                <div className="bg-gray-100 p-2 rounded-full shadow-sm">
                  {item.icon}
                </div>
                <span className="text-[10px] font-sm">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-[var(--primary)]">
              {(+product.price).toLocaleString()} تومان
            </span>
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <Heart size={20} />
            </button>
          </div>
          {+product.stock > 0 ? (
            <div className="space-y-3">
              {+product.stock < 5 && (
                <p className="text-sm font-medium text-red-500 animate-pulse">
                  فقط {product.stock} عدد باقی مانده
                </p>
              )}
              {quantity === 0 ? (
                <button
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        images: product.images,
                        category: '',
                        stock: 0,
                        description: '',
                        details: [],
                        brand: '',
                        star: '',
                        rating: 0,
                        quantity: 0,
                      })
                    )
                  }
                  className="w-full py-3 rounded-xl text-md font-medium bg-[var(--primary)] text-white hover:bg-[var(--secondary)] transition"
                >
                  افزودن به سبد خرید
                </button>
              ) : (
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => dispatch(decreaseQuantity(product.id))}
                    className="px-3 py-1 bg-gray-100 rounded-lg text-lg hover:bg-gray-200 transition"
                  >
                    -
                  </button>
                  <span className="text-md font-semibold">{quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity(product.id))}
                    className="px-3 py-1 bg-gray-100 rounded-lg text-lg hover:bg-gray-200 transition"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="w-full py-3 rounded-xl text-md font-medium bg-gray-300 text-gray-500 hover:bg-gray-600 hover:text-white">
              موجود شد خبرم کن
            </button>
          )}
        </div>
      </div>
      <div className="mt-12 border-b border-[var(--primary)] pt-4 h-auto">
        <button
          onClick={() => setShowDescription(!showDescription)}
          className={`relative flex items-center gap-2 text-[var(--primary)] font-bold ml-4 px-4 py-2 
      ${
        showDescription
          ? 'border-b-2 border-[var(--primary)]'
          : 'border-b-2 border-transparent'
      } 
      transition-all duration-300 hover:text-[var(--secondary)]`}
        >
          <AiOutlineProduct />
          توضیحات محصول
          <span
            className={`absolute left-0 bottom-[-2px] h-[2px] w-full bg-[var(--secondary)] transition-transform duration-300 
        ${showDescription ? 'scale-x-100' : 'scale-x-0'}
      `}
          ></span>
        </button>

        {showDescription && (
          <p className="mt-4 text-gray-600 ml-4 leading-relaxed">
            {product.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default SinglePage;
