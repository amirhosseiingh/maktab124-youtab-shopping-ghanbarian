'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import LoginPage from './login/page';
export default function Providers() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <LoginPage/>
    </QueryClientProvider>
  );
}

