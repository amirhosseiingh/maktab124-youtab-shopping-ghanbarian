'use client'
import Providers from '../app';
import Header from '@/components/layout/header';
import '../../styles/globals.css';
import Footer from '@/components/layout/footer';
import { usePathname } from 'next/navigation'; 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); 

  return (
    <html lang="fa" dir="rtl">
      <body className="...">
        <Providers>
          {pathname !== '/auth' && <Header />}
          {children}
          {pathname !== '/auth' &&
            pathname !== '/payment' &&
            pathname !== '/orderSucces' && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
