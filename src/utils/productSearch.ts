export const searchProducts = (products: any[], query: string) => {
  if (!query.trim()) return products;

  return products.filter(product =>
    (product.name ?? '').toLowerCase().includes(query.toLowerCase())
  );
};
