import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex w-full items-center justify-center gap-1">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex size-10 items-center justify-center bg-foreground p-2 text-primary disabled:opacity-50"
      >
        <FiChevronLeft className="text-background" />
      </button>
      {/* 1 - 5 */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex size-10 items-center justify-center p-2 ${
            currentPage === page ? "bg-primary text-background" : "bg-card text-primary"
          }`}
        >
          {page}
        </button>
      ))}
      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex size-10 items-center justify-center bg-foreground p-2 text-primary disabled:opacity-50"
      >
        <FiChevronRight className="text-background" />
      </button>
    </div>
  );
};

export default Pagination;
