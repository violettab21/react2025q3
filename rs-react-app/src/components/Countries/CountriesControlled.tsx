import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import './countries.css';
import { type FormData } from '../forms/validation';
import { useCountries } from './useCountries';

export const CountriesControlled = ({
  register,
  setValue,
  watch,
}: {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
}) => {
  const { isListVisible, setIsListVisible, countries } = useCountries();
  const watchCountry = watch('country');
  const filteredCountry = countries.filter((country) =>
    country.toLowerCase().includes(watchCountry?.toLowerCase())
  );

  return (
    <>
      <label htmlFor="country">Country: </label>
      <input
        id="country"
        className="country input"
        placeholder="Country"
        onFocus={() => {
          setIsListVisible(true);
        }}
        autoComplete="off"
        {...register('country')}
      />
      <>
        {isListVisible && (
          <div className="countries-container">
            <ul className="countries">
              {(watchCountry ? filteredCountry : countries).map((country) => (
                <li
                  key={country}
                  onClick={() => {
                    setValue('country', country);
                    setIsListVisible(false);
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
