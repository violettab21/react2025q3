import './main.css';
import { GENERIC_ERROR } from '../../constants';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { Search } from '../Search/Search';
import { Results } from '../Results/Results';
import { ErrorButton } from '../ErrorBoundary/ErrorButton';
import { useCharacters } from './hooks/useCharacters';

export const Main = () => {
  const { results, isLoading, requestError, handleSearch } = useCharacters();

  return (
    <main className="main">
      <ErrorBoundary fallback={GENERIC_ERROR}>
        <Search handleSearch={handleSearch} />
        <ErrorButton />
        <Results
          characters={results}
          isLoading={isLoading}
          error={requestError}
        />
      </ErrorBoundary>
    </main>
  );
};
