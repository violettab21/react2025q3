import type { CountriesData } from '../types';

export const url =
  'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json';

export const getCountriesData = () => {
  let responseData: CountriesData;
  const promise = fetch(url)
    .then((response) => response.json())
    .then((json) => {
      responseData = json;
    });

  return {
    read() {
      if (responseData) {
        return responseData;
      }
      throw promise;
    },
  };
};
