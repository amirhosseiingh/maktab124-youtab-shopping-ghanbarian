export const filterByCategory = (products: any[], category: string) => {
  return category
    ? products.filter(
        (product: { category: any }) => product.category === category
      )
    : products;
};
