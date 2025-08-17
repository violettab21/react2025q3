'use client';
import type { Character } from '../../types';
import './characterCard.css';
import { useContext } from 'react';
import { ThemeContext } from '../../context/Context';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
export const CharacterCard = ({ character }: { character: Character }) => {
  const t = useTranslations('CharacterDetails');
  const theme = useContext(ThemeContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <button
      onClick={() => {
        const page = searchParams.get('page');
        const search = searchParams.get('search');
        const searchPart = search ? `&search=${search}` : '';
        router.push(`/details/${character.id}?page=${page}${searchPart}`);
      }}
      data-testid="card"
      className={`cardContainer cardContainer-${theme.theme}`}
    >
      <div className="characterInfo">
        <p>
          {t('name')}: {character.name}
        </p>
        <p>
          {t('gender')}: {character.gender}
        </p>
      </div>
    </button>
  );
};
