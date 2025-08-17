'use client';
import { useEffect, useState } from 'react';

export const useLocalStorage = (key: string) => {
  const [savedValue, setSavedValue] = useState('');

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem(key);
    if (storedSearchTerm) {
      setSavedValue(storedSearchTerm);
    }
  }, [savedValue, key]);

  const saveValueToLocalStorage = (value: string): void => {
    localStorage.setItem(key, value);
    setSavedValue(value);
  };

  return { savedValue, setSavedValue, saveValueToLocalStorage };
};
