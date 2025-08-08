import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { useGetCharacterQuery } from '../../../store/api';

export const useCharacterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data, isLoading, isError, error, refetch } = useGetCharacterQuery(
    Number(id)
  );

  const closeDetails = () => {
    navigate(`/?page=${searchParams.get('page') || 1}`);
  };

  return { data, isLoading, isError, error, refetch, closeDetails };
};
