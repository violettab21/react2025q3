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
    <div>
      <label htmlFor="year">Year</label>
      <select id="year" onChange={onYearChange}>
        {years.map((year) => (
          <option key={year} value={year} selected={selectedYear === year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};
