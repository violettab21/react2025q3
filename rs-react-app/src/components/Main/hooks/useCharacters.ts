import { useEffect, useState } from 'react';
import { LOCAL_STORAGE_KEY } from '../../../constants';
import { useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useGetCharactersQuery } from '../../../store/api';

export const useCharacters = () => {
  const { savedValue, setSavedValue } = useLocalStorage(LOCAL_STORAGE_KEY);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get('page');
    return page ? Number(page) : 1;
  });

  const {
    data = {
      info: {
        count: 0,
        pages: 0,
      },
      results: [],
    },
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetCharactersQuery({
    page: currentPage,
    searchTerm: savedValue,
  });

  useEffect(() => {
    setSearchParams(`page=${currentPage}`);
  }, [currentPage, setSearchParams]);

  const handleSearch = async (searchTerm: string) => {
    setCurrentPage(1);
    setSavedValue(searchTerm);
  };

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    handleSearch,
    currentPage,
    setCurrentPage,
    refetch,
  };
};
