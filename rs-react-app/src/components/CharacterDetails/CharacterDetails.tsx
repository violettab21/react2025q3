'use client';
import './characterDetails.css';
import image from '../../assets/close.svg';
import refreshIcon from '../../assets/refresh.svg';
import { ThemeContext } from '../../context/Context';
import { useContext } from 'react';
import { Character } from '../../types';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

export const CharacterDetails = ({ character }: { character: Character }) => {
  const currentTheme = useContext(ThemeContext);
  const t = useTranslations('CharacterDetails');
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale();

  return (
    <div className={`characterDetails characterDetails-${currentTheme.theme}`}>
      <>
        <button
          className="closeButton"
          onClick={() => {
            const page = searchParams.get('page');

            router.push(`/${locale}?page=${page ? page : '1'}`);
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
            <p>
              {t('name')}: {character.name}
            </p>
            <p>
              {t('gender')}: {character.gender}
            </p>
            <p>
              {t('species')}: {character.species}
            </p>
            <p>
              {t('location')}: {character.location.name}
            </p>
            <p>
              {t('origin')}: {character.origin.name}
            </p>
            <p>
              {t('status')}:{character.status}
            </p>
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
