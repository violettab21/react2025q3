interface YearSelector {
  years: number[];
  selectedYear: number;
  onYearChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const YearSelector = ({
  years,
  selectedYear,
  onYearChange,
}: YearSelector) => {
  return (
    <>
      <select onChange={onYearChange}>
        {years.map((year) => (
          <option key={year} value={year} selected={selectedYear === year}>
            {year}
          </option>
        ))}
      </select>
    </>
  );
};
