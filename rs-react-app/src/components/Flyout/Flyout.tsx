'use client';

import {
  allResultsUnselected,
  useAppDispatch,
  useAppSelector,
} from '../../store/store';
import { useTheme } from '../Theme/Theme';
import './flyout.css';
import { prepareFile } from './helpers';
import { useTranslations } from 'next-intl';

export const Flyout = () => {
  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector((state) => state.selectedCards);
  const theme = useTheme();
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

      <button
        onClick={() => {
          prepareFile(selectedCharacters).then((finalString) => {
            const file = new Blob([finalString], { type: 'text/csv' });
            const url = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.setAttribute('download', `${selectedCharacters.length}_items`);
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          });
        }}
        className="download"
      >
        {t('download')}
      </button>
    </div>
  );
};
