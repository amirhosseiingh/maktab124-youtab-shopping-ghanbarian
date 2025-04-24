'use client';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  HomeIcon,
  CubeIcon,
  UsersIcon,
  ClipboardIcon,
  XMarkIcon, 
} from '@heroicons/react/24/outline';

const menuItems = [
  { name: 'داشبورد', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'محصولات', href: '/admin/products', icon: CubeIcon },
  { name: 'قیمت / موجودی', href: '/admin/pricing-stock', icon: ClipboardIcon }, 
  { name: 'سفارش‌ها', href: '/admin/orders', icon: ClipboardIcon },
  { name: 'کاربران', href: '/admin/users', icon: UsersIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = () => {
    router.push('/admin'); 
  };

  if (pathname === '/admin') {
    return null;
  }

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed top-0 right-0 flex flex-col z-50">
      <div className="px-6 py-4 text-lg font-bold border-b border-gray-700">
        پنل ادمین
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {menuItems.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gray-800 text-indigo-400'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center mb-4 gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors text-gray-300 hover:bg-gray-800 hover:text-white mt-auto"
      >
        <XMarkIcon className="w-5 h-5" />
        خروج
      </button>
    </aside>
  );
}
