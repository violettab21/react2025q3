import './main.css';
import { Search } from '../Search/Search';
import { Results } from '../Results/Results';
import { Flyout } from '../Flyout/Flyout';
import { Suspense } from 'react';
import { Loader } from '../Loader/Loader';
import { Refresh } from './parts/Refresh';

export const MainPage = ({
  page,
  search,
}: {
  page: string;
  search?: string;
}) => {
  return (
    <div className="mainPage">
      <div className="left">
        <Search />
        <Refresh />
        <div>
          <Suspense fallback={<Loader />}>
            <Results page={page} search={search} />
          </Suspense>
        </div>
        <Flyout />
      </div>
    </div>
  );
};
