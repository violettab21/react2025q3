import { useState } from 'react';
import { getCountriesData } from '../services/service';

import { CountryRow } from './CountryRow/CountryRow';
import './countries.css';
import { ColumnChooser } from './ColumnChooser/ColumnChooser';
import { YearSelector } from './YearSelector/YearSelector';
import { Search } from './Search/Search';
import { SortSelector } from './SortSelector/SortSelector';

const fetch = getCountriesData();

const Countries = () => {
  const countriesData = fetch.read();
  const [selectItems, setSelectedItems] = useState<string[]>([]);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(
    Object.keys(countriesData)
  );
  const [selectedSort, setSelectedSort] = useState<string>('name_asc');

  const getYears = () => {
    const countries = Object.keys(countriesData);
    let minYear = countriesData[countries[0]].data[0].year;
    const lastObject = countriesData[countries[0]].data.at(-1);
    let maxYear = lastObject ? lastObject.year : minYear;
    countries.map((country) => {
      const minCountryYear = countriesData[country].data[0].year;
      const lastObject = countriesData[country].data.at(-1);
      const maxCountryYear = lastObject ? lastObject.year : minCountryYear;

      if (minCountryYear < minYear) {
        minYear = minCountryYear;
      }
      if (maxCountryYear > maxYear) {
        maxYear = maxCountryYear;
      }
    });
    const years = [];
    for (let i = minYear; i <= maxYear; i++) {
      years.push(i);
    }
    return years;
  };
  const latestYear = getYears().at(-1);
  const [selectedYear, setSelectedYear] = useState<number>(latestYear || 2023);

  const onSearch = (currentSearchValue: string) => {
    setFilteredCountries(
      Object.keys(countriesData).filter((country) =>
        country.toLowerCase().includes(currentSearchValue.toLowerCase())
      )
    );
  };

  const onSort = (sort: string) => {
    switch (sort) {
      case 'name_asc': {
        const countries = filteredCountries.slice(0);
        setFilteredCountries(countries.sort());
        break;
      }
      case 'name_desc': {
        const countries = filteredCountries.slice(0);
        setFilteredCountries(countries.sort().reverse());
        break;
      }
      case 'population_asc': {
        const countries = filteredCountries.slice(0);
        const sortedCountries = countries
          .map((country) => {
            const yearObject = countriesData[country].data.find(
              (yearData) => yearData.year === selectedYear
            );
            return {
              countryName: country,
              yearObject: yearObject,
            };
          })
          .sort((a, b) => {
            if (a && b && a.yearObject && b.yearObject) {
              if (a.yearObject.population && b.yearObject.population)
                return a.yearObject.population - b.yearObject.population;
              else {
                if (!a.yearObject.population) return -1;
                if (!b.yearObject.population) return 1;
              }
            }
            return -1;
          })
          .map((modifiedElement) => modifiedElement.countryName);
        setFilteredCountries(sortedCountries);
        break;
      }
      case 'population_desc': {
        const countries = filteredCountries.slice(0);
        const sortedCountries = countries
          .map((country) => {
            const yearObject = countriesData[country].data.find(
              (yearData) => yearData.year === selectedYear
            );
            return {
              countryName: country,
              yearObject: yearObject,
            };
          })
          .sort((a, b) => {
            if (a && b && a.yearObject && b.yearObject) {
              if (a.yearObject.population && b.yearObject.population)
                return b.yearObject.population - a.yearObject.population;
              else {
                if (!a.yearObject.population) return 1;
                if (!b.yearObject.population) return -1;
              }
            }
            return -1;
          })
          .map((modifiedElement) => modifiedElement.countryName);
        setFilteredCountries(sortedCountries);
        break;
      }
    }
  };

  return (
    <>
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearch={onSearch}
      />
      <ColumnChooser
        selectedItems={selectItems}
        setSelectedItems={setSelectedItems}
      />
      <YearSelector
        years={getYears()}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        setIsHighlighted={setIsHighlighted}
      />
      <SortSelector
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        onSort={onSort}
      />
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Iso Code</th>
            <th>Population</th>
            <th>Year</th>
            <th>co2</th>
            <th>co2_per_capita</th>
            {selectItems.map((value, i) => (
              <th key={`${i}${value}`}>{value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredCountries.map((countryName) => (
            <CountryRow
              isHighlighted={isHighlighted}
              key={countryName}
              country={countriesData[countryName]}
              countryName={countryName}
              selectedItems={selectItems}
              selectedYear={selectedYear}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Countries;
