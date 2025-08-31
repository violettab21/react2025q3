import { getCountriesData } from '../../services/service';

import { CountryRow } from './../CountryRow/CountryRow';
import './countries.css';
import { ColumnChooser } from './../ColumnChooser/ColumnChooser';
import { YearSelector } from './../YearSelector/YearSelector';
import { Search } from './../Search/Search';
import { SortSelector } from './../SortSelector/SortSelector';
import { useCountries } from './hooks/useCountries';

const fetch = getCountriesData();

const Countries = () => {
  const countriesData = fetch.read();
  const {
    resultData,
    selectColumns,
    setSelectedColumns,
    isHighlighted,
    searchValue,
    setSearchValue,
    selectedSort,
    setSelectedSort,
    onYearChange,
    selectedYear,
    years,
    columns,
  } = useCountries(countriesData);

  return (
    <>
      <div className="menu">
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />

        <YearSelector
          years={years}
          selectedYear={selectedYear}
          onYearChange={onYearChange}
        />
        <SortSelector
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
        />
        <ColumnChooser
          columns={columns}
          selectedColumns={selectColumns}
          setSelectedColumns={setSelectedColumns}
        />
      </div>
      <div className="countriesContainer">
        <table className="countriesTable">
          <thead>
            <tr>
              <th>Country</th>
              <th>Iso Code</th>
              <th>Year</th>
              <th>Population</th>
              <th>co2</th>
              <th>co2_per_capita</th>
              {selectColumns.map((value, i) => (
                <th key={`${i}${value}`}>{value}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {resultData.map((country) => (
              <CountryRow
                isHighlighted={isHighlighted}
                key={country.country}
                country={country}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Countries;
