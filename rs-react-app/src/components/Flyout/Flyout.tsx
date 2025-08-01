import {
  allResultsUnselected,
  useAppDispatch,
  useAppSelector,
} from '../../store/store';
import './flyout.css';

export const Flyout = () => {
  const dispatch = useAppDispatch();
  const selectedCharacters = useAppSelector((state) => state.selectedCards);

  if (selectedCharacters.length === 0) {
    return null;
  }

  return (
    <div className="flyout">
      <p>{selectedCharacters.length} items are selected</p>
      <button
        onClick={() => {
          dispatch(allResultsUnselected());
        }}
      >
        Unselect all
      </button>
      <button>Download</button>
    </div>
  );
};
