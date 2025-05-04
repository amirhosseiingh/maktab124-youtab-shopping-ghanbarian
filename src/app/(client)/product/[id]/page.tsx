'use client';
import { useParams } from 'next/navigation';
import ProductPage from '@/pages/productPage';
import React from 'react';

const Page = () => {
  const params = useParams();

  const { id } = params as { id: string };

  if (!id) return <p>محصول شناسایی نشد</p>;

  const resolvedParams = Promise.resolve({ id: id as string });

  return (
    <div>
      <ProductPage params={resolvedParams} />
    </div>
  );
};

export default Page;
