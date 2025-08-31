import { useCallback, useMemo, useState } from 'react';
import type { CountriesData, CustomCountry } from '../../../types';

export const useCountries = (countriesData: CountriesData) => {
  const countries = useMemo(() => Object.keys(countriesData), [countriesData]);
  const [selectColumns, setSelectedColumns] = useState<string[]>([]);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [selectedSort, setSelectedSort] = useState<string>('name_asc');

  const prepareDataForSelectedYear = useCallback(
    (selectedYear: number, columns: string[]) => {
      const array: CustomCountry[] = countries.map((country) => {
        const yearObject = countriesData[country].data.find(
          (yearData) => yearData.year === selectedYear
        );
        const initialValue = {};
        const selectedColumnsData = columns
          .map((column) => {
            return {
              [column]: yearObject ? yearObject[column] : null,
            };
          })
          .reduce((accumulator, currentValue) => {
            return { ...accumulator, ...currentValue };
          }, initialValue);
        return {
          country: country,
          year: yearObject?.year || null,
          iso_code: countriesData[country].iso_code || null,
          countryYearData: {
            population: yearObject ? yearObject.population : null,
            co2: yearObject ? yearObject.co2 : null,
            co2_per_capita: yearObject ? yearObject.co2_per_capita : null,
            ...selectedColumnsData,
          },
        };
      });

      return array;
    },
    [countries, countriesData]
  );
  //get list of available years
  const getYears = useCallback(() => {
    let minYear = countriesData[countries[0]].data[0].year;
    const lastYearObject = countriesData[countries[0]].data.at(-1);
    let maxYear = lastYearObject ? lastYearObject.year : minYear;
    countries.map((country) => {
      const minCountryYear = countriesData[country].data[0].year;
      const lastYearObject = countriesData[country].data.at(-1);
      const maxCountryYear = lastYearObject
        ? lastYearObject.year
        : minCountryYear;

      if (minCountryYear < minYear) {
        minYear = minCountryYear;
      }
      if (maxCountryYear > maxYear) {
        maxYear = maxCountryYear;
      }
    });
    const years = [];
    for (let i = minYear; i <= maxYear; i++) {
      years.push(i);
    }
    return years;
  }, [countries, countriesData]);

  const onSort = useCallback((sort: string, array: CustomCountry[]) => {
    let sortedArray: CustomCountry[] = [];
    switch (sort) {
      case 'name_asc': {
        const sortedCountries = array.slice(0);
        sortedCountries.sort((a, b) => {
          if (a.country < b.country) return -1;
          if (a.country > b.country) return 1;
          return 0;
        });
        sortedArray = sortedCountries;

        break;
      }
      case 'name_desc': {
        const sortedCountries = array.slice(0);
        sortedCountries.sort((a, b) => {
          if (a.country > b.country) return -1;
          if (a.country < b.country) return 1;
          return 0;
        });
        sortedArray = sortedCountries;
        break;
      }
      case 'population_asc': {
        const sortedCountries = array.slice(0);
        sortedCountries.sort((a, b) => {
          if (a && b) {
            if (a.countryYearData.population && b.countryYearData.population)
              return (
                a.countryYearData.population - b.countryYearData.population
              );
            else {
              if (!a.countryYearData.population) return -1;
              if (!b.countryYearData.population) return 1;
            }
          }
          return -1;
        });
        sortedArray = sortedCountries;
        break;
      }
      case 'population_desc': {
        const sortedCountries = array.slice(0);
        sortedCountries.sort((a, b) => {
          if (a && b) {
            if (a.countryYearData.population && b.countryYearData.population)
              return (
                b.countryYearData.population - a.countryYearData.population
              );
            else {
              if (!a.countryYearData.population) return 1;
              if (!b.countryYearData.population) return -1;
            }
          }
          return -1;
        });
        sortedArray = sortedCountries;
        break;
      }
    }
    return sortedArray;
  }, []);

  const years = useMemo(() => getYears(), [getYears]);
  const latestYear = years.at(-1);
  const [selectedYear, setSelectedYear] = useState<number>(latestYear || 2023);

  const transformedCountriesData = useMemo(
    () => prepareDataForSelectedYear(selectedYear, selectColumns),
    [selectedYear, selectColumns, prepareDataForSelectedYear]
  );

  //get columns for 2023 year and use it as list of columns for selection
  const getColumns = useCallback(() => {
    const possibleColumns: Set<string> = new Set();
    countries.map((country) => {
      const yearObject = countriesData[country].data.find(
        (yearData) => yearData.year === years.at(-1)
      );
      if (yearObject) {
        Object.keys(yearObject).map((column) => {
          if (
            column !== 'year' &&
            column !== 'population' &&
            column !== 'co2' &&
            column !== 'co2_per_capita'
          ) {
            possibleColumns.add(column);
          }
        });
      }
    });
    return possibleColumns;
  }, [countriesData, years, countries]);

  const columns = useMemo(() => getColumns(), [getColumns]);

  const resultData: CustomCountry[] = useMemo(() => {
    let data = transformedCountriesData.slice(0);
    if (searchValue) {
      data = transformedCountriesData.filter((country) =>
        country.country.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    if (selectedSort) {
      data = onSort(selectedSort, data);
    }
    return data;
  }, [searchValue, selectedSort, transformedCountriesData, onSort]);

  const onYearChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedYear(Number(e.target.value));
      setIsHighlighted(true);
      setTimeout(() => {
        setIsHighlighted(false);
      }, 1000);
    },
    []
  );
  return {
    resultData,
    selectColumns,
    setSelectedColumns,
    isHighlighted,
    setIsHighlighted,
    searchValue,
    setSearchValue,
    selectedSort,
    setSelectedSort,
    onYearChange,
    selectedYear,
    years,
    columns,
  };
};
