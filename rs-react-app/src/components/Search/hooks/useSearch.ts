import { useState } from 'react';
import { getStoredSearchTerm, saveToLocalStorage } from '../../../helpers';

export const useSearch = (
  handleSearch: (searchTerm: string) => Promise<void>
) => {
  const [currentSearchValue, setCurrentSearchValue] = useState(
    getStoredSearchTerm()
  );

  const searchCharactersChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target) {
      setCurrentSearchValue(e.target.value);
    }
  };

  const searchCharactersHandler = () => {
    const search = currentSearchValue.trim();
    void handleSearch(search);
    saveToLocalStorage(search);
  };

  return {
    currentSearchValue,
    searchCharactersChangeHandler,
    searchCharactersHandler,
  };
};
