'use client';
import {
  resultSelected,
  resultUnselected,
  useAppDispatch,
  useAppSelector,
} from '../../store/store';
import type { Character } from '../../types';
import { CharacterCard } from '../CharacterCard/CharacterCard';
import './resultRow.css';

export const ResultRow = ({ character }: { character: Character }) => {
  const dispatch = useAppDispatch();
  const selectedCharacter = useAppSelector((state) =>
    state.selectedCards.find((el) => el.id === character.id)
  );

  const changeCheckboxStateHandler = () => {
    if (!selectedCharacter) {
      dispatch(resultSelected(character));
    } else {
      dispatch(resultUnselected(character));
    }
  };

  return (
    <div key={character.id} className="characterRow">
      <input
        type="checkbox"
        checked={selectedCharacter ? true : false}
        onChange={changeCheckboxStateHandler}
        className="checkbox"
      ></input>
      <CharacterCard key={character.id} character={character} />
    </div>
  );
};
