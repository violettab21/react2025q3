import './characterDetails.css';

import { Character } from '../../types';
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
            <div className="characterDetailsImage">
              {' '}
              <img
                src={character.image}
                alt="character image"
                className="characterImage"
              />
            </div>
          </div>

          <div className="characterDetailsInfo">
            <p>
              <b>{t('gender')}:</b> {character.gender}
            </p>
            <p>
              <b>{t('species')}:</b> {character.species}
            </p>
            <p>
              <b>{t('location')}:</b> {character.location.name}
            </p>
            <p>
              <b>{t('origin')}:</b> {character.origin.name}
            </p>
            <p>
              <b>{t('status')}:</b> {character.status}
            </p>
          </div>
        </>
        <Refresh id={character.id.toString()} />
      </>
    </CharacterDetailsWrapper>
  );
};
