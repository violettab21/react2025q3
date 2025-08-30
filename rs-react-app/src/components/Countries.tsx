import { useState } from 'react';
import { getCountriesData } from '../services/service';

import { CountryRow } from './CountryRow/CountryRow';
import './countries.css';
import { ColumnChooser } from './ColumnChooser/ColumnChooser';
import { YearSelector } from './YearSelector/YearSelector';
import { Search } from './Search/Search';
import { SortSelector } from './SortSelector/SortSelector';
import type { CustomCountry } from '../types';

const fetch = getCountriesData();

const Countries = () => {
  const countriesData = fetch.read();
  const countries = Object.keys(countriesData);

  const [selectItems, setSelectedItems] = useState<string[]>([]);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [selectedSort, setSelectedSort] = useState<string>('name_asc');

  const prepareDataForSelectedYear = (selectedYear: number) => {
    const array: CustomCountry[] = countries.map((country) => {
      const yearObject = countriesData[country].data.find(
        (yearData) => yearData.year === selectedYear
      );
      return {
        country: country,
        year: yearObject?.year || null,
        iso_code: countriesData[country].iso_code || null,
        countryYearData: {
          population: yearObject?.population || null,
          cement_co2: yearObject?.cement_co2 || null,
          cement_co2_per_capita: yearObject?.co2_per_capita || null,
          methane: yearObject?.methane || null,
          oil_co2: yearObject?.oil_co2 || null,
          temperature_change_from_co2:
            yearObject?.temperature_change_from_co2 || null,
        },
      };
    });
    return array;
  };

  const getYears = () => {
    let minYear = countriesData[countries[0]].data[0].year;
    const lastYearObject = countriesData[countries[0]].data.at(-1);
    let maxYear = lastYearObject ? lastYearObject.year : minYear;
    countries.map((country) => {
      const minCountryYear = countriesData[country].data[0].year;
      const lastYearObject = countriesData[country].data.at(-1);
      const maxCountryYear = lastYearObject
        ? lastYearObject.year
        : minCountryYear;

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
  const transformedCountriesData = prepareDataForSelectedYear(selectedYear);
  console.log(transformedCountriesData);
  const [filteredCountries, setFilteredCountries] = useState(
    transformedCountriesData
  );
  const onSearch = (currentSearchValue: string) => {
    setFilteredCountries(
      transformedCountriesData.filter((country) =>
        country.country.toLowerCase().includes(currentSearchValue.toLowerCase())
      )
    );
  };

  const onYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(e.target.value));
    setFilteredCountries(prepareDataForSelectedYear(Number(e.target.value)));
    setIsHighlighted(true);
    setTimeout(() => {
      setIsHighlighted(false);
    }, 1000);
  };

  const onSort = (sort: string) => {
    switch (sort) {
      case 'name_asc': {
        const sortedCountries = filteredCountries.slice(0);
        sortedCountries.sort((a, b) => {
          if (a.country < b.country) return -1;
          if (a.country > b.country) return 1;
          return 0;
        });
        console.log(sortedCountries);
        setFilteredCountries(sortedCountries);
        break;
      }
      case 'name_desc': {
        const sortedCountries = filteredCountries.slice(0);
        sortedCountries.sort((a, b) => {
          if (a.country > b.country) return -1;
          if (a.country < b.country) return 1;
          return 0;
        });
        console.log(sortedCountries);
        setFilteredCountries(sortedCountries);
        break;
      }
      case 'population_asc': {
        const sortedCountries = filteredCountries.slice(0);
        sortedCountries.sort((a, b) => {
          if (a && b) {
            if (a.countryYearData.population && b.countryYearData.population)
              return (
                a.countryYearData.population - b.countryYearData.population
              );
            else {
              if (!a.countryYearData.population) return -1;
              if (!b.countryYearData.population) return 1;
            }
          }
          return -1;
        });

        setFilteredCountries(sortedCountries);
        break;
      }
      case 'population_desc': {
        const sortedCountries = filteredCountries.slice(0);
        sortedCountries.sort((a, b) => {
          if (a && b) {
            if (a.countryYearData.population && b.countryYearData.population)
              return (
                b.countryYearData.population - a.countryYearData.population
              );
            else {
              if (!a.countryYearData.population) return 1;
              if (!b.countryYearData.population) return -1;
            }
          }
          return -1;
        });

        setFilteredCountries(sortedCountries);
        break;
      }
    }
  };

  return (
    <>
      <div className="menu">
        <Search
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onSearch={onSearch}
        />

        <YearSelector
          years={getYears()}
          selectedYear={selectedYear}
          onYearChange={onYearChange}
        />
        <SortSelector
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          onSort={onSort}
        />
        <ColumnChooser
          selectedItems={selectItems}
          setSelectedItems={setSelectedItems}
        />
      </div>
      <div className="countriesContainer">
        <table className="countriesTable">
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
            {filteredCountries.map((country) => (
              <CountryRow
                isHighlighted={isHighlighted}
                key={country.country}
                country={country}
                selectedItems={selectItems}
                selectedYear={selectedYear}
              />
            ))}
          </tbody>
        </table>{' '}
      </div>
    </>
  );
};

export default Countries;
