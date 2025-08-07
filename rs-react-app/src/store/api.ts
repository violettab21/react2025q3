import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../constants';
import type { CharactersResponse } from '../types';

export interface Parameters {
  page: number;
  searchTerm?: string;
}

export const rickAndMortyAPI = createApi({
  reducerPath: 'rickAndMortyAPI',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (build) => ({
    getCharacters: build.query<CharactersResponse, Parameters>({
      query: (parameters) => {
        const { page, searchTerm } = parameters;
        const url = searchTerm
          ? `character/?page=${page}&name=${searchTerm}`
          : `character/?page=${page}`;
        return {
          url: url,
        };
      },
    }),
  }),
});

export const { useGetCharactersQuery } = rickAndMortyAPI;
