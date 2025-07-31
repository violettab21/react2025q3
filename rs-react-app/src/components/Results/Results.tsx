import './results.css';
import { CharacterCard } from '../CharacterCard/CharacterCard';
import { Pagination } from '../Pagination/Pagination';
import { Loader } from '../Loader/Loader';
import type { ResultsProps } from './types';
import { resultSelected, useAppDispatch } from '../../store/store';

export const Results = ({
  characters,
  isLoading,
  error,
  pageCount,
  currentPage,
  setCurrentPage,
}: ResultsProps) => {
  const dispatch = useAppDispatch();
  if (error) {
    return (
      <p data-testid="errorMessage" className="errorMessage">
        {error}
      </p>
    );
  }

  return (
    <div className="resultsContainer">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="charactersList">
            {characters.map((character) => (
              <div key={character.id} className="characterRow">
                <input
                  type="checkbox"
                  onClick={() => {
                    dispatch(resultSelected(character));
                  }}
                ></input>
                <CharacterCard key={character.id} character={character} />
              </div>
            ))}
          </div>

          <Pagination
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          ></Pagination>
        </>
      )}
    </div>
  );
};
