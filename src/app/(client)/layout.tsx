import Providers from '../app';
import Header from '@/components/layout/header';
import '../../styles/globals.css';
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
        </Providers>
      </body>
    </html>
  );
}
