import { getCountriesData } from '../services/service';
import { CountryRow } from './CountryRow';
import './countries.css';

const fetch = getCountriesData();

const Countries = () => {
  const countriesData = fetch.read();

  return (
    <>
      <div className="countries-container">
        {' '}
        <div>Country</div>
        <div>Iso Code</div>
        <div>Population</div>
        <div>Action</div>
        {Object.keys(countriesData).map((countryName) => (
          <CountryRow
            key="country"
            country={countriesData[countryName]}
            countryName={countryName}
          />
        ))}
      </div>
    </>
  );
};

export default Countries;
