import { useEffect, useState } from 'react';
import { useCountries } from './useCountries';

export const useCountriesUncontrolled = () => {
  const { isListVisible, setIsListVisible, countries } = useCountries();
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [country, setCountry] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const handleCountrySelect = (country: string) => {
    setCountry(country);
    setIsListVisible(false);
  };

  const handleFocusInput = () => {
    setIsListVisible(true);
  };

  useEffect(() => {
    const closeList = (e: Event) => {
      const clickedElement = e.target;

      if (clickedElement && clickedElement instanceof Element) {
        if (
          !clickedElement.classList.contains('country') &&
          !clickedElement.classList.contains('country-container')
        ) {
          setIsListVisible(false);
        }
      }
    };
    document.addEventListener('click', closeList);
    return () => {
      document.removeEventListener('click', closeList);
    };
  }, [isListVisible, setIsListVisible]);

  useEffect(() => {
    const filteredCountry = countries.filter((el) =>
      el.toLowerCase().includes(country.toLowerCase())
    );
    setFilteredCountries(filteredCountry);
  }, [country, countries]);

  return {
    country,
    isListVisible,
    filteredCountries,
    onChange,
    handleCountrySelect,
    countries,
    handleFocusInput,
  };
};
