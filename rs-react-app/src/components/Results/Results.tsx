import './results.css';
import { Pagination } from '../Pagination/Pagination';
import { Loader } from '../Loader/Loader';
import type { ResultsProps } from './types';

import { ResultRow } from '../ResultRow/ResultRow';
import { GENERIC_ERROR, NOT_FOUND_MESSAGE } from '../../constants';

export const Results = ({
  characters,
  isLoading,
  isFetching,
  isError,
  error,
  pageCount,
  currentPage,
  setCurrentPage,
}: ResultsProps) => {
  if (isError) {
    if (error && 'status' in error) {
      return (
        <p data-testid="errorMessage" className="errorMessage">
          {error.status === 404 ? NOT_FOUND_MESSAGE : GENERIC_ERROR}
        </p>
      );
    } else {
      return (
        <p data-testid="errorMessage" className="errorMessage">
          {GENERIC_ERROR}
        </p>
      );
    }
  }

  return (
    <div className="resultsContainer">
      {isLoading || isFetching ? (
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
