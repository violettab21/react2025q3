import './results.css';
import type { Character } from '../../types';
import { CharacterCard } from '../CharacterCard/CharacterCard';

export const Results = ({
  characters,
  isLoading,
  error,
}: {
  characters: Character[];
  isLoading: boolean;
  error: string;
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
        <span data-testid="loader" className="loader"></span>
      ) : (
        characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))
      )}
    </div>
  );
};
