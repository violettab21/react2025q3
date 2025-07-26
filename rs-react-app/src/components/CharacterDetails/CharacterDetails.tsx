import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { GENERIC_ERROR, NOT_FOUND_MESSAGE } from '../../constants';
import type { Character } from '../../types';
import { getCharacter } from '../../api/characters';
import './characterDetails.css';
import { Loader } from '../Loader/Loader';
import image from '../../assets/close.svg';

export const CharacterDetails = () => {
  const parameters = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [requestError, setRequestError] = useState<string>('');
  const [searchParams] = useSearchParams();

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

    function closeDetails(e: Event) {
      const clickedElement = e.target;
      if (
        clickedElement instanceof HTMLElement &&
        !clickedElement.closest('.characterDetails') &&
        !clickedElement.closest('.cardContainer')
      ) {
        navigate(`/?page=${searchParams.get('page')}`);
      }
    }

    document.addEventListener('click', closeDetails);
    return () => {
      document.removeEventListener('click', closeDetails);
    };
  }, [parameters.id, navigate, searchParams]);

  return (
    <div className="characterDetails">
      {requestError ? (
        <p className="errorMessage">{requestError}</p>
      ) : (
        <>
          <button
            onClick={() => {
              navigate(`/?page=${searchParams.get('page')}`);
            }}
          >
            <img src={image}></img>
          </button>

          {character ? (
            <>
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {' '}
                  <div className="characterImageContainer">
                    <img
                      className="characterImage"
                      src={character.image}
                      alt="character image"
                    ></img>
                  </div>
                  <div className="characterInfo">
                    <p>Name: {character.name}</p>
                    <p>Gender: {character.gender}</p>
                    <p>Species: {character.species}</p>
                    <p>Location: {character.location.name}</p>
                    <p>Status: {character.status}</p>
                  </div>
                </>
              )}
            </>
          ) : null}
        </>
      )}
    </div>
  );
};
