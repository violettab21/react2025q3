import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './pagination.css';

export const Pagination = ({ pageCount }: { pageCount: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page'))
  );

  const getPageNumberArray = (): number[] => {
    const array = [];
    if (pageCount < 5) {
      for (let i = 1; i <= pageCount; i++) {
        array.push(i);
      }
    } else {
      if (pageCount - currentPage >= 5) {
        for (let i = 1; i <= 5; i++) {
          array.push((Math.ceil(currentPage / 5) - 1) * 5 + i);
        }
      } else {
        for (let i = pageCount - 4; i <= pageCount; i++) {
          array.push(i);
        }
      }
    }

    return array;
  };

  return (
    <div className="paginationContainer">
      <button
        disabled={currentPage == 1}
        className="button"
        onClick={() => {
          if (currentPage === 1) return;
          setSearchParams(`?page=${currentPage - 1}`);
          setCurrentPage(currentPage - 1);
        }}
      >
        &lt;
      </button>
      {getPageNumberArray().map((page) => (
        <button
          className={page === currentPage ? 'button active' : 'button'}
          key={page}
          onClick={() => {
            setSearchParams(`?page=${page}`);
            setCurrentPage(page);
          }}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage == pageCount}
        className="button"
        onClick={() => {
          if (currentPage === pageCount) return;
          setSearchParams(`?page=${currentPage + 1}`);
          setCurrentPage(currentPage + 1);
        }}
      >
        &gt;
      </button>
    </div>
  );
};
