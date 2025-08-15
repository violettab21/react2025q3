/*import { useNavigate, useParams, useSearchParams } from 'react-router-dom';*/

import { useGetCharacterQuery } from '../../../store/api';

export const useCharacterDetails = (id: string) => {
  /*const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();*/
  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetCharacterQuery(Number(id));

  const closeDetails = () => {
    /* navigate(`/?page=${searchParams.get('page') || 1}`);*/
    console.log('hello');
  };

  return { data, isLoading, isError, isFetching, error, refetch, closeDetails };
};
