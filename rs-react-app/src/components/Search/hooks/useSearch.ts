import { useState } from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../../../constants';

export const useSearch = (
  handleSearch: (searchTerm: string) => Promise<void>
) => {
  const { savedValue, saveValueToLocalStorage } =
    useLocalStorage(LOCAL_STORAGE_KEY);
  const [searchValue, setSearchValue] = useState(savedValue);

  const searchCharactersChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target) {
      setSearchValue(e.target.value);
    }
  };

  const searchCharactersHandler = () => {
    const search = searchValue.trim();
    void handleSearch(search);
    setSearchValue(searchValue);
    saveValueToLocalStorage(searchValue);
  };

  return {
    searchValue,
    searchCharactersChangeHandler,
    searchCharactersHandler,
  };
};
