import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex w-full items-center justify-center gap-1">
      {/* Previous button */}
      <Button
        type="button"
        size="icon-lg"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-foreground p-2 text-primary"
      >
        <ChevronLeft className="text-background" />
      </Button>
      {/* 1 - 5 */}
      {pages.map((page) => (
        <Button
          type="button"
          size="icon-lg"
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex size-10 items-center justify-center p-2 ${
            currentPage === page ? "bg-primary text-background" : "bg-card text-primary"
          }`}
        >
          {page}
        </Button>
      ))}
      {/* Next button */}
      <Button
        type="button"
        size="icon-lg"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-foreground p-2 text-primary"
      >
        <ChevronRight className="text-background" />
      </Button>
    </div>
  );
};

export default Pagination;
