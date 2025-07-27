import { useState } from 'react';

export function getStoredSearchTerm(key: string): string {
  const searchTerm = localStorage.getItem(key);

  return searchTerm ? searchTerm : '';
}

export const useLocalStorage = (key: string) => {
  const [savedValue, setSavedValue] = useState(getStoredSearchTerm(key));

  const saveValueToLocalStorage = (value: string): void => {
    localStorage.setItem(key, value);
    setSavedValue(value);
  };

  return { savedValue, setSavedValue, saveValueToLocalStorage };
};
