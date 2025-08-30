export const Search = ({
  searchValue,
  setSearchValue,
  onSearch,
}: {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (currentSearchValue: string) => void;
}) => {
  return (
    <div>
      <input
        placeholder="Search"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          onSearch(e.target.value);
        }}
      />
    </div>
  );
};
