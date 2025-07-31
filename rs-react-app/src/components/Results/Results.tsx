import './results.css';
import { Pagination } from '../Pagination/Pagination';
import { Loader } from '../Loader/Loader';
import type { ResultsProps } from './types';

import { ResultRow } from '../ResultRow/ResultRow';

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
              <ResultRow key={character.id} character={character} />
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
