import { useEffect, useState } from 'react';
import type { Character } from '../../../types';
import { getCharacters } from '../../../api/characters';
import { getStoredSearchTerm } from '../../../helpers';
import { GENERIC_ERROR, NOT_FOUND_MESSAGE, url } from '../../../constants';
import { useSearchParams } from 'react-router-dom';

export const useCharacters = () => {
  const [results, setResults] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [requestError, setRequestError] = useState<string>('');
  const [pageCount, setPageCount] = useState<number>(1);

  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get('page');
    return page ? Number(page) : 1;
  });

  useEffect(() => {
    const storedSearchValue = getStoredSearchTerm();

    const urlForRequest =
      storedSearchValue.length > 0
        ? `${url}/?page=${currentPage}&name=${storedSearchValue}`
        : `${url}/?page=${currentPage}`;
    handleCharactersRequest(urlForRequest);
  }, [currentPage]);

  const handleCharactersRequest = (endpoint: string) => {
    getCharacters(endpoint)
      .then((response) => {
        setIsLoading(false);
        setResults(response.results);
        setPageCount(response.info.pages);
        setRequestError('');
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.message === '404') {
          setRequestError(NOT_FOUND_MESSAGE);
          setResults([]);
        } else {
          setRequestError(GENERIC_ERROR);
        }
      });
  };

  const handleSearch = async (searchTerm: string) => {
    const urlForRequest = `${url}?page=1&name=${searchTerm}`;
    setIsLoading(true);
    handleCharactersRequest(urlForRequest);
  };

  return {
    results,
    isLoading,
    requestError,
    handleSearch,
    pageCount,
    currentPage,
    setCurrentPage,
  };
};
