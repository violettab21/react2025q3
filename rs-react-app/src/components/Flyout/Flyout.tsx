import { useContext } from 'react';
import { ThemeContext } from '../../context/Context';
import {
  allResultsUnselected,
  useAppDispatch,
  useAppSelector,
} from '../../store/store';
import type { Character } from '../../types';
import './flyout.css';

export const Flyout = () => {
  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector((state) => state.selectedCards);
  const theme = useContext(ThemeContext);

  if (selectedCharacters.length === 0) {
    return null;
  }

  const transformObject = (character: Character) => {
    return {
      name: character.name,
      gender: character.gender,
      location: character.location.name,
      origin: character.origin.name,
    };
  };

  const prepareFile = () => {
    const header = `name, gender, location, origin\n`;
    const contentString = selectedCharacters
      .map((el) => transformObject(el))
      .map((element) => Object.values(element))
      .join('\n');
    const finalString = `${header}${contentString}`;
    const file = new Blob([finalString], { type: 'text/csv' });
    const url = URL.createObjectURL(file);
    return url;
  };

  return (
    <div className={`flyout flyout-${theme.theme}`}>
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
        href={prepareFile()}
        download={`${selectedCharacters.length}_items`}
      >
        Download
      </a>
    </div>
  );
};
