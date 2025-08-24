import './countries.css';
import { useCountriesUncontrolled } from './useCountriesUncontrolled';

export const CountriesUncontrolled = ({
  name,
  inputRef,
}: {
  name: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) => {
  const {
    country,
    isListVisible,
    filteredCountries,
    onChange,
    handleCountrySelect,
    countries,
    handleFocusInput,
  } = useCountriesUncontrolled();

  return (
    <>
      <label htmlFor="country">Country: </label>

      <input
        id="country"
        className="country input"
        onFocus={handleFocusInput}
        autoComplete="off"
        name={name}
        ref={inputRef}
        value={country}
        onChange={onChange}
        placeholder="Country"
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
