import { useCallback } from 'react';
import './columnsList.css';
import { Checkbox } from './parts/Checkbox';

export const ColumnsList = ({
  selectedItems,
  setSelectedItems,
  columns,
}: {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  columns: Set<string>;
}) => {
  const isSelected = useCallback(
    (value: string) => selectedItems.some((element) => element === value),
    [selectedItems]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const modifiedValue = e.target.value;
      if (e.target?.checked) {
        setSelectedItems([...selectedItems, modifiedValue]);
      } else {
        const array = selectedItems.slice(0);
        const index = array.indexOf(modifiedValue);
        array.splice(index, 1);
        setSelectedItems(array);
      }
    },
    [selectedItems, setSelectedItems]
  );

  return (
    <div className="columnsList">
      {Array.from(columns).map((column) => (
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
