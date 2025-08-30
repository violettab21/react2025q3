import type { Country } from '../types';

interface CountryRowProps {
  country: Country;
  countryName: string;
  selectedItems: string[];
}

export const CountryRow = ({
  country,
  countryName,
  selectedItems,
}: CountryRowProps) => {
  const object = country.data.at(-1);
  return (
    <tr>
      <td>{countryName}</td>
      <td>{country.iso_code}</td>
      <td>{country.data.at(-1)?.population}</td>
      <td>{country.data.at(-1)?.year}</td>
      <td>{country.data.at(-1)?.cement_co2}</td>
      <td>{country.data.at(-1)?.cement_co2_per_capita}</td>
      {selectedItems.map((value: string, i) => (
        <td key={`${value}${i}${countryName}`}>{object && object[value]}</td>
      ))}
    </tr>
  );
};
