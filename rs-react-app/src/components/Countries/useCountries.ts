import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/store';

export const useCountries = () => {
  const [isListVisible, setIsListVisible] = useState(false);
  const countries = useAppSelector((state) => state.countries);

  useEffect(() => {
    const closeList = (e: Event) => {
      const clickedElement = e.target;

      if (clickedElement && clickedElement instanceof Element) {
        if (
          !clickedElement.classList.contains('country') &&
          !clickedElement.classList.contains('country-container')
        )
          setIsListVisible(false);
      }
    };
    document.addEventListener('click', closeList);
    return () => {
      document.removeEventListener('click', closeList);
    };
  }, [isListVisible]);

  return { isListVisible, setIsListVisible, countries };
};
