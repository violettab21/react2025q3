import { useState } from 'react';
import { getCountriesData } from '../services/service';

import { CountryRow } from './CountryRow';
import './countries.css';
import { ColumnChooser } from './ColumnChooser/ColumnChooser';

const fetch = getCountriesData();

const Countries = () => {
  const countriesData = fetch.read();
  const [selectItems, setSelectedItems] = useState<string[]>([]);
  return (
    <>
      <ColumnChooser
        selectedItems={selectItems}
        setSelectedItems={setSelectedItems}
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
            <th>cumulative_cement_co2</th>
            {selectItems.map((value, i) => (
              <th key={`${i}${value}`}>{value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(countriesData).map((countryName) => (
            <CountryRow
              key={countryName}
              country={countriesData[countryName]}
              countryName={countryName}
              selectedItems={selectItems}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Countries;
