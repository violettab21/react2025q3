'use client';
import './characterDetails.css';
import image from '../../assets/close.svg';
import refreshIcon from '../../assets/refresh.svg';
import { ThemeContext } from '../../context/Context';
import { useContext } from 'react';
import { Character } from '../../types';
import Image from 'next/image';

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
          <Image src={image} alt="close" />
        </button>

        <>
          <div className="characterImageContainer">
            <Image
              src={character.image}
              alt="character image"
              className="characterImage"
              width={300}
              height={200}
              priority
            />
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
            <Image
              className="refresh"
              src={refreshIcon}
              alt="refresh"
              priority
            />
          </button>
        </>
      </>
    </div>
  );
};
