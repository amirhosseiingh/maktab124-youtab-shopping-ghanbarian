export const getStatusColor = (status: string) => {
  switch (status) {
    case 'تحویل داده شده':
      return 'text-green-600';
    case 'لغو شده':
      return 'text-red-500';
    case 'در حال ارسال':
      return 'text-yellow-500';
    default:
      return 'text-gray-600';
  }
};
