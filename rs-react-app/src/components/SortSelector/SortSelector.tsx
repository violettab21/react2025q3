import { memo, useCallback } from 'react';

interface SortSelector {
  selectedSort: string;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
}

export const SortSelector = memo(function SortSelector({
  selectedSort,
  setSelectedSort,
}: SortSelector) {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSort(e.target.value);
    },
    [setSelectedSort]
  );

  return (
    <div>
      <label htmlFor="sort">Sort by</label>
      <select id="sort" onChange={onChange} value={selectedSort}>
        <option value="name_asc">Name Asc</option>
        <option value="name_desc">Name Desc</option>
        <option value="population_asc">Population Asc</option>
        <option value="population_desc">Population Desc</option>
      </select>
    </div>
  );
});
