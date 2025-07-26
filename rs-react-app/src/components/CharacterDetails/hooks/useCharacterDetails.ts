import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCharacter } from '../../../api/characters';
import { GENERIC_ERROR, NOT_FOUND_MESSAGE } from '../../../constants';
import type { Character } from '../../../types';
import { useCharacters } from '../../Main/hooks/useCharacters';

export const useCharacterDetails = () => {
  const parameters = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [requestError, setRequestError] = useState<string>('');
  const { currentPage } = useCharacters();

  const closeDetails = () => {
    navigate(`/?page=${currentPage}`);
  };

  useEffect(() => {
    const characterId = parameters.id;
    if (characterId) {
      getCharacter(characterId)
        .then((response) => {
          setIsLoading(false);
          setCharacter(response);
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
  }, [parameters.id]);

  return { character, isLoading, requestError, closeDetails };
};
