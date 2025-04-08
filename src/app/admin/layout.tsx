import Providers from '../app'; 
import Sidebar from '@/components/layout/sideBar';
import '../../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Providers>
          <Sidebar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
