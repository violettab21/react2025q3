'use client';
import './pagination.css';
import { usePagination } from './hooks/usePagination';

export const Pagination = ({
  pageCount,
  currentPage,
}: {
  pageCount: number;
  currentPage: number;
}) => {
  const {
    prevButtonHandler,
    nextButtonHandler,
    pageButtonHandler,
    getPageNumberArray,
  } = usePagination(pageCount, currentPage);

  return (
    <div className="paginationContainer">
      <button
        data-testid="prev"
        disabled={currentPage === 1}
        className="button"
        onClick={prevButtonHandler}
      >
        &lt;
      </button>
      {getPageNumberArray().map((page) => (
        <button
          data-testid="page"
          className={page === currentPage ? 'button active' : 'button'}
          key={page}
          onClick={() => pageButtonHandler(page)}
        >
          {page}
        </button>
      ))}
      <button
        data-testid="next"
        disabled={currentPage === pageCount}
        className="button"
        onClick={nextButtonHandler}
      >
        &gt;
      </button>
    </div>
  );
};
