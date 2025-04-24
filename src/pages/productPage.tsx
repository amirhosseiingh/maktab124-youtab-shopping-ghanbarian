import React from 'react';
import SinglePage from '../components/singlePge/singlePage';

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <>
      <SinglePage params={params} />
    </>
  );
};

export default ProductPage;
