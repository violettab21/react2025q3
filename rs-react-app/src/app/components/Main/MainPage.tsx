import './main.css';
import { Search } from '../Search/Search';
import { Results } from '../Results/Results';
import { Flyout } from '../Flyout/Flyout';
import refreshIcon from '../../assets/refresh.svg';
import Image from 'next/image';
import { Suspense } from 'react';
import { Loader } from '../Loader/Loader';

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

/* <button
          className="refreshButton"
          onClick={() => {
            console.log('hello');
          }}
        >
          <Image className="refresh" src={refreshIcon} alt="refresh" priority />
        </button>*/
