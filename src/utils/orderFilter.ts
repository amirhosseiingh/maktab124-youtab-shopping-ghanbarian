export const filterItemsByKey = (items: any[], key: string, value: string) => {
  return value
    ? items.filter(
        item => item[key]?.toString().toLowerCase() === value.toLowerCase()
      )
    : items;
};
