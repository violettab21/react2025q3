import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getCharacter } from '../../../api/characters';
import { GENERIC_ERROR, NOT_FOUND_MESSAGE } from '../../../constants';
import type { Character } from '../../../types';

export const useCharacterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [requestError, setRequestError] = useState<string>('');
  const [searchParams] = useSearchParams();

  const closeDetails = () => {
    navigate(`/?page=${searchParams.get('page') || 1}`);
  };

  useEffect(() => {
    if (id) {
      getCharacter(id)
        .then((response) => {
          setCharacter(response);
          setIsLoading(false);
          setRequestError('');
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.message === '404') {
            setRequestError(NOT_FOUND_MESSAGE);
            setCharacter(null);
          } else {
            setRequestError(GENERIC_ERROR);
            setCharacter(null);
          }
        });
    }
  }, [id]);

  return { character, isLoading, requestError, closeDetails };
};
