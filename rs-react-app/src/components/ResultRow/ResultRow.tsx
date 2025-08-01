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
  return (
    <div key={character.id} className="characterRow">
      <input
        type="checkbox"
        checked={selectedCharacter ? true : false}
        onChange={() => {
          if (!selectedCharacter) {
            dispatch(resultSelected(character));
          } else {
            dispatch(resultUnselected(character));
          }
        }}
      ></input>
      <CharacterCard key={character.id} character={character} />
    </div>
  );
};
