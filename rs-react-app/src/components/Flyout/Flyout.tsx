'use client';
import { useContext } from 'react';
import { ThemeContext } from '../../context/Context';
import {
  allResultsUnselected,
  useAppDispatch,
  useAppSelector,
} from '../../store/store';
import './flyout.css';
import { prepareFile } from './helpers';
import { useTranslations } from 'next-intl';

export const Flyout = () => {
  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector((state) => state.selectedCards);
  const theme = useContext(ThemeContext);
  const t = useTranslations('Flyout');

  if (selectedCharacters.length === 0) {
    return null;
  }

  return (
    <div data-testid="flyout-id" className={`flyout flyout-${theme.theme}`}>
      <p>
        {selectedCharacters.length} {t('text')}
      </p>
      <button
        className="unselect"
        onClick={() => {
          dispatch(allResultsUnselected());
        }}
      >
        {t('unselectAllButton')}
      </button>
      <a
        className="download"
        href={prepareFile(selectedCharacters)}
        download={`${selectedCharacters.length}_items`}
      >
        {t('download')}
      </a>
    </div>
  );
};
