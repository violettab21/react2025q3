import './characterDetails.css';
import { Loader } from '../Loader/Loader';
import image from '../../assets/close.svg';
import refreshIcon from '../../assets/refresh.svg';
import { useCharacterDetails } from './hooks/useCharacterDetails';
import { ThemeContext } from '../../context/Context';
import { useContext } from 'react';
import { GENERIC_ERROR, NOT_FOUND_MESSAGE } from '../../constants';

export const CharacterDetails = () => {
  const { data, isLoading, isError, error, refetch, closeDetails } =
    useCharacterDetails();
  const currentTheme = useContext(ThemeContext);

  return (
    <div className={`characterDetails characterDetails-${currentTheme.theme}`}>
      {isError ? (
        error && 'status' in error ? (
          <p className="errorMessage">
            {error.status === 404 ? NOT_FOUND_MESSAGE : GENERIC_ERROR}
          </p>
        ) : (
          GENERIC_ERROR
        )
      ) : (
        <>
          <button className="closeButton" onClick={closeDetails}>
            <img src={image}></img>
          </button>

          {isLoading ? (
            <Loader />
          ) : data ? (
            <>
              <div className="characterImageContainer">
                <img
                  className="characterImage"
                  src={data.image}
                  alt="character image"
                ></img>
              </div>

              <div className="characterDetailsInfo">
                <p>Name: {data.name}</p>
                <p>Gender: {data.gender}</p>
                <p>Species: {data.species}</p>
                <p>Location: {data.location.name}</p>
                <p>Origin: {data.origin.name}</p>
                <p>Status: {data.status}</p>
              </div>
              <button className="refreshImageContainer" onClick={refetch}>
                <img className="refresh" src={refreshIcon} alt="refresh"></img>
              </button>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};
