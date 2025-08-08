import './main.css';
import { GENERIC_ERROR } from '../../constants';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { Search } from '../Search/Search';
import { Results } from '../Results/Results';
import { useCharacters } from './hooks/useCharacters';
import { Outlet } from 'react-router-dom';
import { Flyout } from '../Flyout/Flyout';
import refreshIcon from '../../assets/refresh.svg';

export const MainPage = () => {
  const {
    data: {
      results,
      info: { pages },
    },
    isLoading,
    isFetching,

    isError,
    error,
    handleSearch,
    currentPage,
    setCurrentPage,
    refetch,
  } = useCharacters();

  return (
    <div className="mainPage">
      <ErrorBoundary fallback={GENERIC_ERROR}>
        <div className="left">
          <Search handleSearch={handleSearch} />
          <button className="refreshButton" onClick={refetch}>
            <img className="refresh" src={refreshIcon} alt="refresh"></img>
          </button>

          <div>
            <Results
              characters={results}
              isLoading={isLoading}
              isFetching={isFetching}
              isError={isError}
              error={error}
              pageCount={pages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>

          <Flyout />
        </div>

        <div className="right">
          <Outlet />
        </div>
      </ErrorBoundary>
    </div>
  );
};
