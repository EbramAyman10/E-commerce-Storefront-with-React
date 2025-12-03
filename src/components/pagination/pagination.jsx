import React from "react";
import "./Pagination.css";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  goTop,
}) {
  return (
    <div className="pagination">
      {/* Previous */}
      <button
        disabled={currentPage === 1}
        onClick={() => {
          onPageChange(currentPage - 1);
          goTop();
        }}
      >
        ← Previous
      </button>

      {/* Info */}
      <span className="page-info">
        {currentPage} / {totalPages}
      </span>

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => {
          onPageChange(currentPage + 1);
          goTop();
        }}
      >
        Next →
      </button>
    </div>
  );
}
