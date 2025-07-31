import { useState } from 'react';
import {
  resultSelected,
  resultUnselected,
  useAppDispatch,
  useAppSelector,
} from '../../store/store';
import type { Character } from '../../types';
import { CharacterCard } from '../CharacterCard/CharacterCard';

export const ResultRow = ({ character }: { character: Character }) => {
  const dispatch = useAppDispatch();
  const selectedCharacter = useAppSelector((state) =>
    state.selectedCards.find((el) => el.id === character.id)
  );
  const [checkboxState, setCheckboxState] = useState(
    selectedCharacter ? true : false
  );
  return (
    <div key={character.id} className="characterRow">
      <input
        type="checkbox"
        checked={checkboxState}
        onChange={() => {
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
