import './characterDetails.css';
import { Loader } from '../Loader/Loader';
import image from '../../assets/close.svg';
import { useCharacterDetails } from './hooks/useCharacterDetails';

export const CharacterDetails = () => {
  const { character, isLoading, requestError, closeDetails } =
    useCharacterDetails();

  return (
    <div className="characterDetails">
      {requestError ? (
        <p className="errorMessage">{requestError}</p>
      ) : (
        <>
          <button className="closeButton" onClick={closeDetails}>
            <img src={image}></img>
          </button>

          {isLoading ? (
            <Loader />
          ) : character ? (
            <>
              <div className="characterImageContainer">
                <img
                  className="characterImage"
                  src={character.image}
                  alt="character image"
                ></img>
              </div>
              <div className="characterDetailsInfo">
                <p>Name: {character.name}</p>
                <p>Gender: {character.gender}</p>
                <p>Species: {character.species}</p>
                <p>Location: {character.location.name}</p>
                <p>Origin: {character.origin.name}</p>
                <p>Status: {character.status}</p>
              </div>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};
