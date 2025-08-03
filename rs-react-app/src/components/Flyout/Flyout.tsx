import { useContext } from 'react';
import { ThemeContext } from '../../context/Context';
import {
  allResultsUnselected,
  useAppDispatch,
  useAppSelector,
} from '../../store/store';
import './flyout.css';
import { prepareFile } from './helpers';

export const Flyout = () => {
  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector((state) => state.selectedCards);
  const theme = useContext(ThemeContext);

  if (selectedCharacters.length === 0) {
    return null;
  }

  return (
    <div data-testid="flyout-id" className={`flyout flyout-${theme.theme}`}>
      <p>{selectedCharacters.length} items are selected</p>
      <button
        className="unselect"
        onClick={() => {
          dispatch(allResultsUnselected());
        }}
      >
        Unselect all
      </button>
      <a
        className="download"
        href={prepareFile(selectedCharacters)}
        download={`${selectedCharacters.length}_items`}
      >
        Download
      </a>
    </div>
  );
};
