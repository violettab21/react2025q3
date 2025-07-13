import { LOCAL_STORAGE_KEY } from './constants';

export function saveToLocalStorage(searchTerm: string) {
  localStorage.setItem(LOCAL_STORAGE_KEY, searchTerm);
}

export function getStoredSearchTerm(): string {
  const searchTerm = localStorage.getItem(LOCAL_STORAGE_KEY);

  return searchTerm ? searchTerm : '';
}
