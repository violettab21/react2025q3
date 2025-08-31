import { memo } from 'react';

interface SearchProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Search = memo(function Search({
  searchValue,
  setSearchValue,
}: SearchProps) {
  return (
    <div>
      <input
        placeholder="Search"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
    </div>
  );
});
