import { useEffect, useState } from 'react';

export const useSearch = (
  handleSearch: (searchTerm: string) => Promise<void>,
  savedValue: string,
  saveValueToLocalStorage: (value: string) => void
) => {
  const [searchValue, setSearchValue] = useState('');
  console.log(searchValue);
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
    saveValueToLocalStorage(search);
    setSearchValue(search);
  };
  useEffect(() => {
    setSearchValue(savedValue);
    console.log(savedValue);
  }, [savedValue]);

  return {
    searchValue,
    searchCharactersChangeHandler,
    searchCharactersHandler,
  };
};
