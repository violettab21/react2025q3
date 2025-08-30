import type { CustomCountry } from '../../types';
import './countryRow.css';
import { CellHighlighted } from '../CellHighligted/CellHighlighted';

interface CountryRowProps {
  country: CustomCountry;
  selectedItems: string[];
  selectedYear: number;
  isHighlighted: boolean;
}

export const CountryRow = ({
  country,
  selectedItems,
  isHighlighted,
}: CountryRowProps) => {
  return (
    <tr>
      <td>{country.country}</td>
      <td>{country.iso_code ? country.iso_code : 'N/A'}</td>
      <CellHighlighted
        newValue={country.countryYearData?.population || 'N/A'}
        isHighlighted={isHighlighted}
      />
      <CellHighlighted
        newValue={country?.year || 'N/A'}
        isHighlighted={isHighlighted}
      />
      <CellHighlighted
        newValue={country.countryYearData.cement_co2 || 'N/A'}
        isHighlighted={isHighlighted}
      />
      <CellHighlighted
        newValue={country.countryYearData?.cement_co2_per_capita || 'N/A'}
        isHighlighted={isHighlighted}
      />
      {selectedItems.map((value: string, i) => (
        <CellHighlighted
          newValue={country.countryYearData[value] || 'N/A'}
          isHighlighted={isHighlighted}
          key={`${value}${i}${country.country}`}
        />
      ))}
    </tr>
  );
};
