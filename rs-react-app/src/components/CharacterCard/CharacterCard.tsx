import { useNavigate, useSearchParams } from 'react-router-dom';
import type { Character } from '../../types';
import './characterCard.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/Context';
export const CharacterCard = ({ character }: { character: Character }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const theme = useContext(ThemeContext);
  return (
    <button
      onClick={() => {
        navigate(
          `details/${character.id}?page=${searchParams.get('page') || 1}`
        );
      }}
      data-testid="card"
      className={`cardContainer cardContainer-${theme.theme}`}
    >
      <div className="characterInfo">
        <p>Name: {character.name}</p>
        <p>Gender: {character.gender}</p>
      </div>
    </button>
  );
};
