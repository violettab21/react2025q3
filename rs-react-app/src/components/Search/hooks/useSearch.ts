import { useEffect, useState } from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../../../constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useSearch = () => {
  const { savedValue, saveValueToLocalStorage } =
    useLocalStorage(LOCAL_STORAGE_KEY);
  const [searchValue, setSearchValue] = useState('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const searchCharactersChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target) {
      setSearchValue(e.target.value);
    }
  };

  const handleSearch = async (searchTerm: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('search', searchTerm);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const searchCharactersHandler = () => {
    const search = searchValue.trim();
    void handleSearch(search);
    saveValueToLocalStorage(search);
    setSearchValue(search);
  };
  useEffect(() => {
    setSearchValue(savedValue);
    if (savedValue) {
      const params = new URLSearchParams(searchParams);
      params.set('search', savedValue);
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [savedValue]);

  return {
    searchValue,
    searchCharactersChangeHandler,
    searchCharactersHandler,
  };
};
