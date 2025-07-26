import './results.css';
import type { Character } from '../../types';
import { CharacterCard } from '../CharacterCard/CharacterCard';
import { Pagination } from '../Pagination/Pagination';
import { Loader } from '../Loader/Loader';

export const Results = ({
  characters,
  isLoading,
  error,
  pageCount,
}: {
  characters: Character[];
  isLoading: boolean;
  error: string;
  pageCount: number;
}) => {
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
            {' '}
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>

          <Pagination pageCount={pageCount}></Pagination>
        </>
      )}
    </div>
  );
};
