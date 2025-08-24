import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/store';
import './countries.css';

export const CountriesUncontrolled = ({
  name,
  inputRef,
}: {
  name: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) => {
  const [isListVisible, setIsListVisible] = useState(false);
  const countries = useAppSelector((state) => state.countries);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [country, setCountry] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const handleCountrySelect = (country: string) => {
    setCountry(country);
    setIsListVisible(false);
  };

  useEffect(() => {
    const closeList = (e: Event) => {
      const clickedElement = e.target;

      if (clickedElement && clickedElement instanceof Element) {
        if (
          clickedElement.className !== 'countries' &&
          clickedElement.className !== 'country'
        )
          setIsListVisible(false);
      }
    };
    document.addEventListener('click', closeList);
    return () => {
      document.removeEventListener('click', closeList);
    };
  }, [isListVisible]);

  useEffect(() => {
    const filteredCountry = countries.filter((el) =>
      el.toLowerCase().includes(country.toLowerCase())
    );
    setFilteredCountries(filteredCountry);
  }, [country, countries]);

  return (
    <>
      <label>Country: </label>

      <input
        className="country"
        onFocus={() => {
          setIsListVisible(true);
        }}
        autoComplete="off"
        name={name}
        ref={inputRef}
        value={country}
        onChange={onChange}
      />

      <>
        {isListVisible && (
          <div className="countries-container">
            <ul className="countries">
              {(country ? filteredCountries : countries).map((country) => (
                <li
                  key={country}
                  onClick={() => {
                    handleCountrySelect(country);
                  }}
                >
                  {country}
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    </>
  );
};
