import './columnsList.css';
import { Checkbox } from './parts/Checkbox';

const columns = ['methane', 'oil_co2', 'temperature_change_from_co2'];

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
      {columns.map((column) => (
        <Checkbox
          key={column}
          value={column}
          onChange={onChange}
          isSelected={isSelected(column)}
        />
      ))}
    </div>
  );
};
