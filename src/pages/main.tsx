import React from 'react';
import Hero from '../components/home/hero';
import ProductSwiper from '../components/home/ProductSwiper';
import CategoryCards from '../components/home/cartCategory';
import BrandSwiper from '../components/home/brandSwiper';
import SiteFeatures from '../components/home/siteFeatures';

const MainPage = () => {
  return (
    <>
      <Hero />
      <ProductSwiper />
      <CategoryCards />
      <BrandSwiper />
      <SiteFeatures />
    </>
  );
};

export default MainPage;
