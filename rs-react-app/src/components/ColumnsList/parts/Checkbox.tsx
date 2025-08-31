export const Checkbox = ({
  value,
  onChange,
  isSelected,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSelected: boolean;
}) => {
  return (
    <div>
      <input
        className="columnSelect"
        type="checkbox"
        value={value}
        id={value}
        checked={isSelected}
        onChange={onChange}
      />
      <label htmlFor={value} className="columnLabel">
        {value}
      </label>
    </div>
  );
};
