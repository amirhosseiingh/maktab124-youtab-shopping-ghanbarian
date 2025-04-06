// import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../../styles/globals.css';

// import { ChakraProvider } from '@chakra-ui/react';
import Header from '@/components/layout/header';
// import Providers from '../admin/page';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir='rtl'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <ChakraProvider> */}
          {/* <Providers> */}
            <Header/>
            {children}
            {/* </Providers> */}
        {/* </ChakraProvider> */}
      </body>
    </html>
  );
}
