'use client';
import type { Character } from '../../types';
import './characterCard.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/Context';
import { useRouter } from 'next/navigation';
export const CharacterCard = ({ character }: { character: Character }) => {
  /*const navigate = useNavigate();*/
  /*const [searchParams] = useSearchParams();*/
  const theme = useContext(ThemeContext);
  const router = useRouter();
  return (
    <button
      onClick={() => {
        /*navigate(
          `details/${character.id}?page=${searchParams.get('page') || 1}`
        );*/
        console.log('hello');
        router.push(`/details/${character.id}`);
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
