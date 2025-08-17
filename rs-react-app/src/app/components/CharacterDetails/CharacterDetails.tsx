import './characterDetails.css';

import { Character } from '../../../types';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { CloseButton } from './parts/CloseButton';
import { CharacterDetailsWrapper } from './parts/CharacterDetailsWrapper';

export const CharacterDetails = ({ character }: { character: Character }) => {
  const t = useTranslations('CharacterDetails');

  return (
    <CharacterDetailsWrapper>
      <>
        <CloseButton />

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
        </>
      </>
    </CharacterDetailsWrapper>
  );
};
/*
  <button
          className="refreshImageContainer"
          onClick={() => {
            console.log('refresh');
          }}
        >
          <Image className="refresh" src={refreshIcon} alt="refresh" priority />
        </button>*/
