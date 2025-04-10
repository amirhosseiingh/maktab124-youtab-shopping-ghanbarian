export const searchItems = (items: any[], query: string, key: string) => {
  return items.filter(item =>
    item[key]?.toString().toLowerCase().includes(query.toLowerCase())
  );
};
