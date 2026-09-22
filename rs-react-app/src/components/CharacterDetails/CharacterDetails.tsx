import './characterDetails.css';

import { Character } from '../../types';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { CloseButton } from './parts/CloseButton';
import { CharacterDetailsWrapper } from './parts/CharacterDetailsWrapper';
import { Refresh } from './parts/Refresh';

export const CharacterDetails = ({ character }: { character: Character }) => {
  const t = useTranslations('CharacterDetails');

  return (
    <CharacterDetailsWrapper>
      <>
        <CloseButton />
        <>
          <div className="characterImageContainer">
            <h2>{character.name}</h2>
            <img
              src={character.image}
              alt="character image"
              className="characterImage"
          
            />
          </div>

          <div className="characterDetailsInfo">
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
        <Refresh id={character.id.toString()} />
      </>
    </CharacterDetailsWrapper>
  );
};
