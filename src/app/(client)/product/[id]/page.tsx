"use client"
import { useParams } from 'next/navigation'; 
import ProductPage from '@/components/pages/productPage';
import React from 'react';

const Page = () => {
  const params = useParams(); 

  const { id } = params; 

  if (!id) return <p>محصول شناسایی نشد</p>;

  const resolvedParams = Promise.resolve({ id: id as string });

  return (
    <div>
      <ProductPage params={resolvedParams} />
    </div>
  );
};

export default Page;
