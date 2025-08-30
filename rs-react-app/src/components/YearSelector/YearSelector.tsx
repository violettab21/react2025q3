interface YearSelector {
  years: number[];
  selectedYear: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setIsHighlighted: React.Dispatch<React.SetStateAction<boolean>>;
}

export const YearSelector = ({
  years,
  selectedYear,
  setSelectedYear,
  setIsHighlighted,
}: YearSelector) => {
  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(e.target.value));
    setIsHighlighted(true);
    setTimeout(() => {
      setIsHighlighted(false);
    }, 1000);
  };

  return (
    <>
      <select onChange={onChange}>
        {years.map((year) => (
          <option key={year} value={year} selected={selectedYear === year}>
            {year}
          </option>
        ))}
      </select>
    </>
  );
};
