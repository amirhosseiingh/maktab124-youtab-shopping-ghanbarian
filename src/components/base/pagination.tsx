import { PaginationProps } from "@/types/paginatetion";

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <div className="py-4 bg-green-50 shadow-inner border-t flex justify-center space-x-2 mt-4">
      {Array.from({ length: totalPages }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onPageChange(idx + 1)}
          className={`px-4 py-2 border rounded-lg transition-all ${
            currentPage === idx + 1
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700'
          }`}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );
};
 export default Pagination;