import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { Character } from '../../types';
import type { SerializedError } from '@reduxjs/toolkit/react';

export interface ResultsProps {
  characters: Character[];
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  isFetching: boolean;
  isError: boolean;
  pageCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
