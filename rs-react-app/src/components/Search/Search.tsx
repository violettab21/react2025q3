import { useState } from 'react';
import './search.css';
import { getStoredSearchTerm, saveToLocalStorage } from '../../helpers';

export const Search = ({
  handleSearch,
}: {
  handleSearch: (searchTerm: string) => Promise<void>;
}) => {
  const [currentSearchValue, setCurrentSearchValue] = useState(
    getStoredSearchTerm()
  );

  return (
    <div className="searchContainer">
      <p className="searchLabel">Search for Rick and Morty character:</p>
      <input
        className="searchInput"
        placeholder="Search"
        value={currentSearchValue}
        onChange={(e) => {
          setCurrentSearchValue(e.target.value);
        }}
      ></input>
      <button
        className="searchButton"
        onClick={() => {
          const search = currentSearchValue.trim();
          void handleSearch(search);
          saveToLocalStorage(search);
        }}
      >
        Search
      </button>
    </div>
  );
};
