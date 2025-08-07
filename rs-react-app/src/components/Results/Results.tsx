import './results.css';
import { Pagination } from '../Pagination/Pagination';
import { Loader } from '../Loader/Loader';
import type { ResultsProps } from './types';

import { ResultRow } from '../ResultRow/ResultRow';
import { GENERIC_ERROR } from '../../constants';

export const Results = ({
  characters,
  isLoading,
  isError,
  pageCount,
  currentPage,
  setCurrentPage,
}: ResultsProps) => {
  if (isError) {
    return (
      <p data-testid="errorMessage" className="errorMessage">
        {GENERIC_ERROR}
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
