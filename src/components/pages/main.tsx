import React from 'react';
import Hero from '../home/hero';
import ProductSwiper from '../home/ProductSwiper';
import CategoryCards from '../home/cartCategory';
import BrandSwiper from '../home/brandSwiper';
import SiteFeatures from '../home/siteFeatures';

const MainPage = () => {
  return (
    <>
      <Hero />
      <ProductSwiper/>
      <CategoryCards/>
      <BrandSwiper/>
      <SiteFeatures/>
    </>
  );
};

export default MainPage;
