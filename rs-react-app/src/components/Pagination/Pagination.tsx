import './pagination.css';
import { usePagination } from './hooks/usePagination';

export const Pagination = ({
  pageCount,
  currentPage,
  setCurrentPage,
}: {
  pageCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const {
    prevButtonHandler,
    nextButtonHandler,
    pageButtonHandler,
    getPageNumberArray,
  } = usePagination(pageCount, currentPage, setCurrentPage);

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
