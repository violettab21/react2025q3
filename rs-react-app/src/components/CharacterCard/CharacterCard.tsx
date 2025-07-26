import { useNavigate, useSearchParams } from 'react-router-dom';
import type { Character } from '../../types';
import './characterCard.css';

export const CharacterCard = ({ character }: { character: Character }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  return (
    <button
      onClick={() => {
        navigate(`details/${character.id}?page=${searchParams.get('page')}`);
      }}
      data-testid="card"
      className="cardContainer"
    >
      <div className="characterInfo">
        <p>Name: {character.name}</p>
        <p>Gender: {character.gender}</p>
      </div>
    </button>
  );
};
