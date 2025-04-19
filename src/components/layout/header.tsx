'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  ScissorsIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from '@heroicons/react/20/solid';


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

import youtabLogo from '../../assets/images/youtab logo.png'
import { IoCart } from 'react-icons/io5';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">youtab shopping</span>
            <img
              alt="youtab shopping"
              src={youtabLogo.src}
              className="h-14 w-36 rounded-lg"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900  hover:bg-green-100 p-2 rounded-sm">
              دسته بندی محصولات
              <ChevronDownIcon
                aria-hidden="true"
                className="size-5 flex-none text-gray-400"
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute top-full right-0 z-50 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="p-4">
                {products.map(item => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-green-100"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon
                        aria-hidden="true"
                        className="size-6 text-gray-600 group-hover:text-green-800"
                      />
                    </div>
                    <div className="flex-auto">
                      <a
                        href={item.href}
                        className="block font-semibold text-gray-900 "
                      >
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-green-100">
                {callsToAction.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
                  >
                    <item.icon
                      aria-hidden="true"
                      className="size-5 flex-none text-gray-400"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <a
            href="/products"
            className="text-sm/6 font-semibold text-gray-900  hover:bg-green-100 p-2 rounded-sm"
          >
            محصولات
          </a>
          <a
            href="#"
            className="text-sm/6 font-semibold text-gray-900  hover:bg-green-100 p-2 rounded-sm "
          >
            مشاوره رایگان
          </a>
          <a
            href="#"
            className="text-sm/6 font-semibold text-gray-900 hover:bg-green-100 p-2 rounded-sm"
          >
            درباره ما
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
          <a
            href="http://localhost:3000/client/auth/login"
            className="text-sm/6 font-semibold text-gray-900"
          >
            ورود <span aria-hidden="true">&rarr;</span>
          </a>
          <a href="">
            <IoCart />
          </a>
        </div>
      </nav>
    </header>
  );
}
