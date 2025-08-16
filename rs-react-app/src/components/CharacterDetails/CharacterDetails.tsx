'use client';
import './characterDetails.css';
import image from '../../assets/close.svg';
import refreshIcon from '../../assets/refresh.svg';
import { ThemeContext } from '../../context/Context';
import { useContext } from 'react';
import { Character } from '../../types';

export const CharacterDetails = ({ character }: { character: Character }) => {
  const currentTheme = useContext(ThemeContext);

  return (
    <div className={`characterDetails characterDetails-${currentTheme.theme}`}>
      <>
        <button
          className="closeButton"
          onClick={() => {
            console.log('hello');
          }}
        >
          <img src={image}></img>
        </button>

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
          <button
            className="refreshImageContainer"
            onClick={() => {
              console.log('refresh');
            }}
          >
            <img className="refresh" src={refreshIcon} alt="refresh"></img>
          </button>
        </>
      </>
    </div>
  );
};
