'use client';
import { useState } from 'react';
import { use } from 'react';
import { useProductQuery } from '@/hooks/getSingleProduct';
import { BASE_URL } from '@/configs/envReader';
import {
  Truck,
  RefreshCcw,
  ShieldCheck,
  Clock4,
  Heart,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
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
  const [showDescription, setShowDescription] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

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
    <div className="max-w-7xl mx-auto px-4 py-8 bg-background text-foreground">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Product Gallery */}
        <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`w-16 h-16 flex-shrink-0 rounded-lg border-2 ${
                  activeImage === index
                    ? 'border-primary'
                    : 'border-transparent'
                } overflow-hidden`}
              >
                <img
                  src={BASE_URL + img}
                  alt={`${product.name} thumbnail ${index}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <Zoom>
              <img
                src={BASE_URL + product.images[activeImage]}
                alt={product.name}
                className="w-full h-80 object-contain cursor-zoom-in"
              />
            </Zoom>
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            {/* Brand & Category */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                {product.brand}
              </span>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={Number(product.star)} />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({product.rating} نظر)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="text-2xl font-bold text-primary">
                {(+product.price).toLocaleString()} تومان
              </div>
            </div>

            {/* Product Details */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2">ویژگی‌های محصول:</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                {limitedDetails.map((d, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <span className="text-primary ml-2">•</span>
                    {d}
                  </li>
                ))}
              </ul>
              {product.details.length > 4 && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="text-primary mt-2 text-sm flex items-center"
                >
                  {showMore ? (
                    <>
                      <span>نمایش کمتر</span>
                      <ChevronUp size={16} className="mr-1" />
                    </>
                  ) : (
                    <>
                      <span>نمایش بیشتر</span>
                      <ChevronDown size={16} className="mr-1" />
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Shipping Features */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {shippingFeatures.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-center"
                >
                  <div className="text-primary">{item.icon}</div>
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              {+product.stock > 0 ? (
                <>
                  {+product.stock < 5 && (
                    <div className="text-xs bg-primary/10 text-primary px-3 py-2 rounded-lg flex items-center">
                      فقط {product.stock} عدد در انبار باقی مانده
                    </div>
                  )}

                  {quantity === 0 ? (
                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          dispatch(
                            addToCart({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              images: product.images,
                              category: product.category,
                              stock: product.stock,
                              description: product.description,
                              details: product.details,
                              brand: product.brand,
                              star: product.star,
                              rating: product.rating,
                              quantity: 1,
                            })
                          )
                        }
                        className="flex-1 py-3 rounded-lg text-md font-medium bg-primary text-white hover:bg-primary/90 transition flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={20} />
                        افزودن به سبد خرید
                      </button>
                      <button className="p-3 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                        <Heart size={20} className="hover:text-primary" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <button
                        onClick={() => dispatch(decreaseQuantity(product.id))}
                        className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-600 rounded-lg text-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition shadow-sm"
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">{quantity}</span>
                      <button
                        onClick={() => {
                          if (quantity < +product.stock) {
                            dispatch(increaseQuantity(product.id));
                          }
                        }}
                        disabled={quantity >= +product.stock}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg text-lg transition shadow-sm 
                         ${
                           quantity >= +product.stock
                             ? 'bg-gray-300 dark:bg-gray-500 text-gray-500 dark:text-gray-300 cursor-not-allowed'
                             : 'bg-white dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500'
                         }`}
                      >
                        +
                      </button>

                      <div className="flex-1 text-right text-sm text-gray-500 dark:text-gray-400">
                        در سبد خرید
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <button className="w-full py-3 rounded-lg text-md font-medium bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 transition flex items-center justify-center gap-2">
                  موجود شد به من اطلاع بده
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <button
          onClick={() => setShowDescription(!showDescription)}
          className={`w-full flex items-center justify-between px-6 py-4 text-lg font-semibold ${
            showDescription ? 'text-primary' : 'text-foreground'
          }`}
        >
          <div className="flex items-center gap-3">
            <AiOutlineProduct className="text-xl" />
            <span>توضیحات کامل محصول</span>
          </div>
          {showDescription ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </button>

        {showDescription && (
          <div className="px-6 pb-6 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="prose max-w-none text-gray-600 dark:text-gray-300">
              {product.description}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePage;
