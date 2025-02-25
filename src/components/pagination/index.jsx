import React from "react";
import "./style.css";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  const generatePages = () => {
    const pages = [];

    let startPage = Math.max(1, currentPage - siblingCount);
    let endPage = Math.min(totalPages, currentPage + siblingCount);

    const pagesToShow = siblingCount * 2 + 1;
    if (endPage - startPage + 1 < pagesToShow) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + pagesToShow - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - pagesToShow + 1);
      }
    }

    if (showFirstLast && startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (showFirstLast && endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <nav className={`pagination ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`prev-btn pagination__item ${
          currentPage === 1 ? "prev-btn--disabled" : "prev-btn--active"
        }`}
      >
        {"\u2039"}
      </button>

      <div className="pagination__inner">
        {pages.map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <button className="pagination__between pagination__item">
                ...
              </button>
            ) : (
              <button
                onClick={() => typeof page === "number" && onPageChange(page)}
                className={`pagination__item ${
                  currentPage === page ? "pagination__item--current" : ""
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`prev-btn pagination__item ${
          currentPage === totalPages ? "prev-btn--disabled" : "prev-btn--active"
        }`}
      >
        {"\u203A"}
      </button>
    </nav>
  );
};

export default Pagination;
