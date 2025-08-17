import './results.css';
import { Pagination } from '../Pagination/Pagination';
import { Loader } from '../Loader/Loader';

import { ResultRow } from '../ResultRow/ResultRow';
import { url } from '../../constants';
import { CharactersResponse } from '../../types';

export const Results = async ({
  page,
  search,
}: {
  page: string;
  search?: string;
}) => {
  const urlForRequest = search
    ? `${url}/?page=${page}&name=${search}`
    : `${url}/?page=${page}`;

  const response = await fetch(urlForRequest);

  const responseData: CharactersResponse = await response.json();

  /* if (isError) {
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
  }*/

  return (
    <div className="resultsContainer">
      (
      <>
        <div className="charactersList">
          {responseData.results.map((character) => (
            <ResultRow key={character.id} character={character} />
          ))}
        </div>

        <Pagination
          pageCount={responseData.info.pages}
          currentPage={Number(page)}
          /* setCurrentPage={setCurrentPage}*/
        ></Pagination>
      </>
      )
    </div>
  );
};
