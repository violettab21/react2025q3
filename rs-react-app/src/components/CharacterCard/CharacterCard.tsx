import type { Character } from '../../types';
import './characterCard.css';

export const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <div data-testid="card" className="cardContainer">
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
      </div>
    </div>
  );
};
