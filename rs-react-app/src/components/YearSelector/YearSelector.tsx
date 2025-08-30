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
      <select id="year" onChange={onYearChange} value={selectedYear}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};
