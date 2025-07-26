import './search.css';
import { useSearch } from './hooks/useSearch';

export const Search = ({
  handleSearch,
}: {
  handleSearch: (searchTerm: string) => Promise<void>;
}) => {
  const {
    currentSearchValue,
    searchCharactersChangeHandler,
    searchCharactersHandler,
  } = useSearch(handleSearch);

  return (
    <div className="searchContainer">
      <p className="searchLabel">Search for Rick and Morty character:</p>
      <input
        className="searchInput"
        placeholder="Search"
        value={currentSearchValue}
        onChange={searchCharactersChangeHandler}
      ></input>
      <button className="searchButton" onClick={searchCharactersHandler}>
        Search
      </button>
    </div>
  );
};
