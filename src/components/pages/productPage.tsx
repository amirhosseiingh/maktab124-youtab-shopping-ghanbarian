import React from 'react';
import SinglePage from '../singlePge/singlePage';

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <>
      <SinglePage params={params} />
    </>
  );
};

export default ProductPage;
