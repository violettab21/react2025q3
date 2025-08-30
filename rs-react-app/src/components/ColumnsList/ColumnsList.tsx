import './columnsList.css';

export const ColumnsList = ({
  selectedItems,
  setSelectedItems,
}: {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const isSelected = (value: string) =>
    selectedItems.some((element) => element === value);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const modifiedValue = e.target.value;
    if (e.target?.checked) {
      setSelectedItems([...selectedItems, modifiedValue]);
    } else {
      const array = selectedItems.slice(0);
      const index = array.indexOf(modifiedValue);
      array.splice(index, 1);
      setSelectedItems(array);
    }
  };

  return (
    <div className="columnsList">
      <label htmlFor="methane">
        <input
          className="columnSelect"
          type="checkbox"
          value="methane"
          id="methane"
          checked={isSelected('methane')}
          onChange={onChange}
        />
        Methane
      </label>

      <label htmlFor="oil_co2">
        <input
          className="columnSelect"
          type="checkbox"
          value="oil_co2"
          id="oil_co2"
          checked={isSelected('oil_co2')}
          onChange={onChange}
        />
        oil_co2
      </label>

      <label htmlFor="temperature_change_from_co2">
        <input
          className="columnSelect"
          type="checkbox"
          value="temperature_change_from_co2"
          id="temperature_change_from_co2"
          checked={isSelected('temperature_change_from_co2')}
          onChange={onChange}
        />
        temperature_change_from_co2
      </label>
    </div>
  );
};
