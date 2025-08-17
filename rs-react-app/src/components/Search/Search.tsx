'use client';
import './search.css';
import { useSearch } from './hooks/useSearch';
import { useTranslations } from 'next-intl';

export const Search = () => {
  const {
    searchValue,
    searchCharactersChangeHandler,
    searchCharactersHandler,
  } = useSearch();

  const t = useTranslations('MainPage');

  return (
    <div className="searchContainer">
      <p className="searchLabel">{t('searchText')}:</p>
      <input
        className="searchInput"
        placeholder={t('searchPlaceholder')}
        value={searchValue}
        onChange={searchCharactersChangeHandler}
      ></input>
      <button className="searchButton" onClick={searchCharactersHandler}>
        {t('searchPlaceholder')}
      </button>
    </div>
  );
};
