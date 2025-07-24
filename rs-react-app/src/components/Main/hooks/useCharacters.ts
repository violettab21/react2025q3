import { useEffect, useState } from 'react';
import type { Character } from '../../../types';
import { getCharacters } from '../../../api/characters';
import { getStoredSearchTerm } from '../../../helpers';
import { GENERIC_ERROR, NOT_FOUND_MESSAGE, url } from '../../../constants';

export const useCharacters = () => {
  const [results, setResults] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [requestError, setRequestError] = useState<string>('');

  useEffect(() => {
    const storedSearchValue = getStoredSearchTerm();
    const urlForRequest =
      storedSearchValue.length > 0 ? `${url}?name=${storedSearchValue}` : url;
    handleCharactersRequest(urlForRequest);
  }, []);

  const handleCharactersRequest = (endpoint: string) => {
    getCharacters(endpoint)
      .then((response) => {
        setIsLoading(false);
        setResults(response.results);
        setRequestError('');
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        if (error.message === '404') {
          setRequestError(NOT_FOUND_MESSAGE);
          setResults([]);
        } else {
          setRequestError(GENERIC_ERROR);
        }
      });
  };

  const handleSearch = async (searchTerm: string) => {
    const urlForRequest = `${url}?name=${searchTerm}`;
    setIsLoading(true);
    handleCharactersRequest(urlForRequest);
  };

  return { results, isLoading, requestError, handleSearch };
};
