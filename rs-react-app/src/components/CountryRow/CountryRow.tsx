import type { Country } from '../../types';
import './countryRow.css';
import { CellHighlighted } from '../CellHighligted/CellHighlighted';

interface CountryRowProps {
  country: Country;
  countryName: string;
  selectedItems: string[];
  selectedYear: number;
  isHighlighted: boolean;
}

export const CountryRow = ({
  country,
  countryName,
  selectedItems,
  selectedYear,
  isHighlighted,
}: CountryRowProps) => {
  const yearData = country.data.find(
    (element) => element.year === selectedYear
  );

  return (
    <tr>
      <td>{countryName}</td>
      <td>{country.iso_code ? country.iso_code : 'N/A'}</td>
      <CellHighlighted
        newValue={yearData?.population || 'N/A'}
        isHighlighted={isHighlighted}
      />
      <CellHighlighted
        newValue={yearData?.year || 'N/A'}
        isHighlighted={isHighlighted}
      />
      <CellHighlighted
        newValue={yearData?.cement_co2 || 'N/A'}
        isHighlighted={isHighlighted}
      />
      <CellHighlighted
        newValue={yearData?.cement_co2_per_capita || 'N/A'}
        isHighlighted={isHighlighted}
      />
      {selectedItems.map((value: string, i) => (
        <CellHighlighted
          newValue={(yearData && yearData[value]) || 'N/A'}
          isHighlighted={isHighlighted}
          key={`${value}${i}${countryName}`}
        />
      ))}
    </tr>
  );
};
