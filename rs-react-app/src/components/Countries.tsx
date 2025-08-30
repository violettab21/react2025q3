import { useState } from 'react';
import { getCountriesData } from '../services/service';

import { CountryRow } from './CountryRow/CountryRow';
import './countries.css';
import { ColumnChooser } from './ColumnChooser/ColumnChooser';
import { YearSelector } from './YearSelector/YearSelector';

const fetch = getCountriesData();

const Countries = () => {
  const countriesData = fetch.read();
  const [selectItems, setSelectedItems] = useState<string[]>([]);
  const [isHighlighted, setIsHighlighted] = useState(false);

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

  return (
    <>
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
          {Object.keys(countriesData).map((countryName) => (
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
