export const searchProducts = (products: any[], query: string) => {
  return products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
};
