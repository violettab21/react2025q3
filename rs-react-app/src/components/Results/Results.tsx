import './results.css';
import { Pagination } from '../Pagination/Pagination';

import { ResultRow } from '../ResultRow/ResultRow';
import { GENERIC_ERROR, NOT_FOUND_MESSAGE, url } from '../../constants';
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
  const response = await fetch(urlForRequest, {
    method: 'GET',
    cache: 'force-cache',
    next: {
      tags: [`characters`],
    },
  });
  if (!response.ok) {
    if (response.status === 404) {
      return (
        <p data-testid="errorMessage" className="errorMessage">
          {NOT_FOUND_MESSAGE}
        </p>
      );
    } else {
      return (
        <p data-testid="errorMessage" className="errorMessage">
          {GENERIC_ERROR}
        </p>
      );
    }
  } else {
    const responseData: CharactersResponse = await response.json();
    return (
      <div className="resultsContainer">
        <>
          <div className="charactersList">
            {responseData.results.map((character) => (
              <ResultRow key={character.id} character={character} />
            ))}
          </div>

          <Pagination
            pageCount={responseData.info.pages}
            currentPage={Number(page)}
          ></Pagination>
        </>
      </div>
    );
  }
};
