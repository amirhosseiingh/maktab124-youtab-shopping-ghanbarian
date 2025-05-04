'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '../../lib/api/statusClient';
import {Popover,PopoverButton,PopoverGroup,PopoverPanel,} from '@headlessui/react';
import {Bars3Icon,ChartPieIcon,FingerPrintIcon,ScissorsIcon,} from '@heroicons/react/24/outline';
import {ChevronDownIcon,PhoneIcon,PlayCircleIcon,} from '@heroicons/react/20/solid';
import {IoArrowForward,IoCart,IoCartOutline,IoListOutline,IoLogOutOutline,IoNotificationsOutline,IoPersonOutline,} from 'react-icons/io5';
import youtabLogo from '../../assets/images/Logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const products = [
  {
    name: 'آرایشی',
    description: 'ابزارهای آرایشی برای درخشش چهره',
    href: '/productsList?category=آرایشی',
    icon: ChartPieIcon,
  },
  {
    name: 'بهداشتی',
    description: 'محصولات ضروری برای سلامت روزانه',
    href: '/productsList?category=بهداشتی',
    icon: FingerPrintIcon,
  },
  {
    name: 'مو',
    description: 'مراقبت و زیبایی مو با بهترین محصولات',
    href: '/productsList?category=مو',
    icon: ScissorsIcon,
  },
];

const callsToAction = [
  { name: 'تخفیف‌های ویژه را از دست ندهید!', href: '#', icon: PlayCircleIcon },
  { name: 'واحد فروش', href: '#', icon: PhoneIcon },
];

export default function Header() {
  const { data: user, isLoading } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  let cartItems = useSelector((state: RootState) => state.cart.cart);
  const uniqueProductsCount = cartItems.length;

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.reload();
  };
  if (isLoading) {
    return <div className="w-28 h-10 bg-gray-100 animate-pulse rounded-lg" />;
  }

  return (
    <header className="bg-background text-foreground">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" legacyBehavior>
            <div className="-m-1.5 p-1.5">
              <span className="sr-only">youtab shopping</span>
              <img
                alt="youtab shopping"
                src={youtabLogo.src}
                className="h-20 w-36 rounded-lg"
              />
            </div>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold hover:bg-primary/10 p-2 rounded-sm transition-colors">
              دسته بندی محصولات
              <ChevronDownIcon
                aria-hidden="true"
                className="size-5 flex-none text-foreground/70"
              />
            </PopoverButton>

            <PopoverPanel className="absolute top-full right-0 z-50 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-background ring-1 shadow-lg ring-foreground/5 transition">
              <div className="p-4">
                {products.map(item => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-primary/10 transition-colors"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-foreground/5 group-hover:bg-background">
                      <item.icon
                        aria-hidden="true"
                        className="size-6 text-foreground/70 group-hover:text-primary"
                      />
                    </div>
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className="block font-semibold text-foreground"
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-foreground/70">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-foreground/5 bg-primary/10">
                {callsToAction.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold hover:bg-background transition-colors"
                  >
                    <item.icon
                      aria-hidden="true"
                      className="size-5 flex-none text-foreground/70"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <a
            href="/products"
            className="text-sm/6 font-semibold hover:bg-primary/10 p-2 rounded-sm transition-colors"
          >
            محصولات
          </a>
          <a
            href="#"
            className="text-sm/6 font-semibold hover:bg-primary/10 p-2 rounded-sm transition-colors"
          >
            مشاوره رایگان
          </a>
          <a
            href="#"
            className="text-sm/6 font-semibold hover:bg-primary/10 p-2 rounded-sm transition-colors"
          >
            درباره ما
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-6">
          {user ? (
            <div className="relative flex items-center gap-6">
              <button
                className="relative p-1 text-foreground/80 hover:text-primary transition-colors"
                aria-label="اعلان‌ها"
              >
                <IoNotificationsOutline className="text-2xl" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 rounded-full bg-foreground/5 px-4 py-2 text-sm font-medium hover:bg-foreground/10 transition-all duration-200 border border-foreground/10"
                  aria-expanded={menuOpen}
                  aria-haspopup="true"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="truncate max-w-[100px]">{user.name}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      menuOpen ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {menuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-background rounded-lg shadow-xl py-1 z-50 border border-foreground/10"
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="px-4 py-3 border-b border-foreground/10">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-foreground/70 truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center px-4 py-2.5 text-sm hover:bg-foreground/5 transition-colors"
                    >
                      <IoPersonOutline className="ml-2" />
                      داشبورد
                    </Link>
                    <Link
                      href="/orders"
                      className="flex items-center px-4 py-2.5 text-sm hover:bg-foreground/5 transition-colors"
                    >
                      <IoListOutline className="ml-2" />
                      سفارش‌های من
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-foreground/5 transition-colors border-t border-foreground/10"
                    >
                      <IoLogOutOutline className="ml-2" />
                      خروج از حساب
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link
              href="/auth"
              className="flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary/90 transition-colors"
            >
              ورود / ثبت‌نام
              <IoArrowForward className="mr-1" />
            </Link>
          )}
          <Link
            href="/cart"
            className="relative p-1.5 group flex items-center"
            aria-label="سبد خرید"
          >
            <IoCartOutline className="text-2xl text-foreground/80 group-hover:text-primary transition-colors" />
            {uniqueProductsCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center rounded-full bg-red-500 w-5 h-5 text-xs font-bold text-white">
                {uniqueProductsCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background text-foreground p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <img src={youtabLogo.src} alt="youtab logo" className="h-12" />
            <button
              type="button"
              className="text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>✕
            </button>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-foreground/70 font-semibold">
                دسته بندی محصولات
              </p>
              {products.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-sm font-medium hover:text-primary transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <a
              href="/products"
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              محصولات
            </a>
            <a
              href="#"
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              مشاوره رایگان
            </a>
            <a
              href="#"
              className="block text-sm font-medium hover:text-primary transition-colors"
            >
              درباره ما
            </a>
            <div className="pt-4 border-t border-foreground/10 mt-4">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-red-500 font-semibold hover:text-red-600 transition-colors"
                >
                  خروج از حساب
                </button>
              ) : (
                <Link
                  href="/auth"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  ورود به حساب
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
