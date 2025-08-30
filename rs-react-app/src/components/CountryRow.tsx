import { useState } from 'react';
import type { Country } from '../types';
import CountryTable from './CountryTable';

interface CountryRowProps {
  country: Country;
  countryName: string;
}

export const CountryRow = ({ country, countryName }: CountryRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div>{countryName}</div>
      <div>{country.iso_code}</div>
      <div>{country.data.at(-1)?.population}</div>
      <div>
        <button
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      {isExpanded ? <CountryTable country={country} /> : null}
    </>
  );
};
