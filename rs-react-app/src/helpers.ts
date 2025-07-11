export function saveToLocalStorage(searchTerm: string) {
  localStorage.setItem('Search Term', searchTerm);
}

export function getStoredSearchTerm(): string {
  const searchTerm = localStorage.getItem('Search Term');

  return searchTerm ? searchTerm : '';
}
