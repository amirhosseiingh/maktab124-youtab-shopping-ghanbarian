'use client'
import { ReactNode, useState } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./home/page";

export default function Home() {
   const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
          <Toaster />
          <HomePage/>
        </QueryClientProvider>
  );
}



