import type { Character } from '../../types';

export interface ResultsProps {
  characters: Character[];
  isLoading: boolean;
  error: string;
  pageCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
