import { useState } from 'react';
import {
  resultSelected,
  resultUnselected,
  useAppDispatch,
} from '../../store/store';
import type { Character } from '../../types';
import { CharacterCard } from '../CharacterCard/CharacterCard';

export const ResultRow = ({ character }: { character: Character }) => {
  const dispatch = useAppDispatch();
  const [checkboxState, setCheckboxState] = useState(false);
  return (
    <div key={character.id} className="characterRow">
      <input
        type="checkbox"
        onClick={() => {
          if (!checkboxState) {
            dispatch(resultSelected(character));
            setCheckboxState(true);
            console.log(checkboxState);
          } else {
            dispatch(resultUnselected(character));
            setCheckboxState(false);
            console.log(checkboxState);
          }
        }}
      ></input>
      <CharacterCard key={character.id} character={character} />
    </div>
  );
};
