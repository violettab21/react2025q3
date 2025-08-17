'use client';
import { useEffect, useState } from 'react';
import { LOCAL_STORAGE_KEY } from '../../../constants';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useGetCharactersQuery } from '../../../store/api';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useCharacters = () => {
  const { savedValue, setSavedValue, saveValueToLocalStorage } =
    useLocalStorage(LOCAL_STORAGE_KEY);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

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
    const page = searchParams.get('page');
    if (page) setCurrentPage(Number(page));

    const params = new URLSearchParams(searchParams);
    params.set('page', currentPage.toString());
    replace(`${pathname}?${params.toString()}`);
  }, [currentPage, pathname, replace, searchParams]);

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
    savedValue,
    saveValueToLocalStorage,
  };
};
