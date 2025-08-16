'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetCharacterQuery } from '../../../store/api';

export const useCharacterDetails = (id: string) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetCharacterQuery(Number(id));

  const closeDetails = () => {
    router.push(`/?page=${searchParams.get('page') || 1}`);
    console.log('hello');
  };

  return { data, isLoading, isError, isFetching, error, refetch, closeDetails };
};
