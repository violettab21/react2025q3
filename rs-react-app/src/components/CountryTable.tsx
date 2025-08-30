/*import { useState } from 'react';
import type { Country, Data } from '../types';
import { ColumnChooser } from './ColumnChooser';

const CountryTable = ({ country }: { country: Country }) => {
  const array = country.data.slice(0).sort((a, b) => b.year - a.year);
  const [countryData, setCountryData] = useState<Data[]>(array);
  const [selectItems, setSelectedItems] = useState<string[]>([]);
  return (
    <div className="countryTable">
      <ColumnChooser
        selectedItems={selectItems}
        setSelectedItems={setSelectedItems}
      />
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Population</th>
            <th>CO2</th>
            <th>co2_per_capita</th>
            <th>cumulative_cement_co2</th>
            {selectItems.map((value) => (
              <th>{value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {countryData.map((yearData) => {
            return (
              <tr key={`${yearData.year}${yearData.cement_co2}`}>
                <td>{yearData.year}</td>
                <td>{yearData.population}</td>
                <td>{yearData.cement_co2}</td>
                <td>{yearData.cement_co2_per_capita}</td>
                <td>{yearData.cumulative_cement_co2}</td>
                {selectItems.map((value: string) => (
                  <td>{yearData[value]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CountryTable;*/
