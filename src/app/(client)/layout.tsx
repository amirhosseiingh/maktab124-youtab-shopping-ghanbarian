import Providers from '../app';
import Header from '@/components/layout/header';
import '../../styles/globals.css';
import Footer from '@/components/layout/footer';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="...">
        <Providers>
          <Header />
          {children}
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
