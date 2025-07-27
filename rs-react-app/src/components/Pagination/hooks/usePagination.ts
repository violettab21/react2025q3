import { useSearchParams } from 'react-router-dom';

const maxVisiblePages = 5;

export const usePagination = (
  pageCount: number,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) => {
  const [, setSearchParams] = useSearchParams();

  const getPageNumberArray = (): number[] => {
    const array = [];
    if (pageCount < maxVisiblePages) {
      for (let i = 1; i <= pageCount; i++) {
        array.push(i);
      }
    } else {
      if (pageCount - currentPage >= maxVisiblePages) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          array.push(
            (Math.ceil(currentPage / maxVisiblePages) - 1) * maxVisiblePages + i
          );
        }
      } else {
        for (let i = pageCount - (maxVisiblePages - 1); i <= pageCount; i++) {
          array.push(i);
        }
      }
    }

    return array;
  };

  const prevButtonHandler = () => {
    if (currentPage === 1) return;
    setSearchParams(`?page=${currentPage - 1}`);
    setCurrentPage(currentPage - 1);
  };

  const nextButtonHandler = () => {
    if (currentPage === pageCount) return;
    setSearchParams(`?page=${currentPage + 1}`);
    setCurrentPage(currentPage + 1);
  };

  const pageButtonHandler = (page: number) => {
    setSearchParams(`?page=${page}`);
    setCurrentPage(page);
  };

  return {
    prevButtonHandler,
    nextButtonHandler,
    pageButtonHandler,
    getPageNumberArray,
    currentPage,
  };
};
