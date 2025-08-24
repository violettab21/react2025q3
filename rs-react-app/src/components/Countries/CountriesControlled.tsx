import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/store';
import './countries.css';
import { type FormData } from '../forms/validation';

export const CountriesControlled = ({
  register,
  setValue,
  watch,
}: {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  watch: UseFormWatch<FormData>;
}) => {
  const [isListVisible, setIsListVisible] = useState(false);
  const watchCountry = watch('country');
  const countries = useAppSelector((state) => state.countries);
  const filteredCountry = countries.filter((country) =>
    country.toLowerCase().includes(watchCountry?.toLowerCase())
  );

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

  return (
    <>
      <label>Country: </label>
      <input
        className="country"
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
