import { useSearchParams } from 'react-router-dom';

export const usePagination = (
  pageCount: number,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) => {
  const [, setSearchParams] = useSearchParams();

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
    console.log(`pagination ${page}`);
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
