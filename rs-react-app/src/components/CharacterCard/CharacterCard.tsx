'use client';
import type { Character } from '../../types';
import './characterCard.css';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from '../Theme/Theme';
export const CharacterCard = ({ character }: { character: Character }) => {
  const t = useTranslations('CharacterDetails');
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <button
      onClick={() => {
        const page = searchParams.get('page');
        const search = searchParams.get('search');
        const searchPart = search ? `&search=${search}` : '';
        router.push(
          `/details/${character.id}?page=${page ? page : 1}${searchPart}`
        );
      }}
      data-testid="card"
      className={`cardContainer cardContainer-${theme.theme}`}
    >
      <div className="characterCardInfo">
        <div className='characterCardImage'> <img src={character.image}></img></div>
       <div className='characterCardData'>  <h2>
         {character.name}
        </h2>
       </div>
      
      </div>
    </button>
  );
};
