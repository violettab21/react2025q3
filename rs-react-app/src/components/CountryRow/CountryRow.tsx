import type { CustomCountry } from '../../types';
import './countryRow.css';
import { CellHighlighted } from '../CellHighligted/CellHighlighted';
import { memo } from 'react';

interface CountryRowProps {
  country: CustomCountry;
  isHighlighted: boolean;
}

export const CountryRow = memo(function CountryRow({
  country,
  isHighlighted,
}: CountryRowProps) {
  return (
    <tr>
      <td>{country.country}</td>
      <td>{country.iso_code ? country.iso_code : 'N/A'}</td>
      <CellHighlighted
        newValue={country?.year || 'N/A'}
        isHighlighted={isHighlighted}
      />
      {Object.keys(country.countryYearData).map((column) => (
        <CellHighlighted
          key={column}
          newValue={
            typeof country.countryYearData[column] === 'number'
              ? country.countryYearData[column].toFixed(2)
              : 'N/A'
          }
          isHighlighted={isHighlighted}
        />
      ))}
    </tr>
  );
});
