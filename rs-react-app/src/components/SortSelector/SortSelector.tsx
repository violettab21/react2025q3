interface SortSelector {
  selectedSort: string;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
  onSort: (selectedSort: string) => void;
}

export const SortSelector = ({
  selectedSort,
  setSelectedSort,
  onSort,
}: SortSelector) => {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(e.target.value);
    console.log(e.target.value);
    onSort(e.target.value);
  };

  return (
    <div>
      <label htmlFor="sort">Sort by</label>
      <select id="sort" onChange={onChange}>
        <option value="name_asc" selected={selectedSort === 'name_asc'}>
          Name Asc
        </option>
        <option value="name_desc" selected={selectedSort === 'name_desc'}>
          Name Desc
        </option>
        <option
          value="population_asc"
          selected={selectedSort === 'population_asc'}
        >
          Population Asc
        </option>
        <option
          value="population_desc"
          selected={selectedSort === 'population_desc'}
        >
          Population Desc
        </option>
      </select>
    </div>
  );
};
