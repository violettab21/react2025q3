import './results.css';
import { CharacterCard } from '../CharacterCard/CharacterCard';
import { Pagination } from '../Pagination/Pagination';
import { Loader } from '../Loader/Loader';
import type { ResultsProps } from './types';

export const Results = ({
  characters,
  isLoading,
  error,
  pageCount,
  currentPage,
  setCurrentPage,
}: ResultsProps) => {
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
              <CharacterCard key={character.id} character={character} />
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
