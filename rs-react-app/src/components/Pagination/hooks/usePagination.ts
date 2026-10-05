import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const maxVisiblePages = 5;

export const usePagination = (pageCount: number, currentPage: number) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

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
    const params = new URLSearchParams(searchParams);
    params.set('page', (currentPage - 1).toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const nextButtonHandler = () => {
    if (currentPage === pageCount) return;
    const params = new URLSearchParams(searchParams);
    params.set('page', (currentPage + 1).toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const pageButtonHandler = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    prevButtonHandler,
    nextButtonHandler,
    pageButtonHandler,
    getPageNumberArray,
    currentPage,
  };
};
