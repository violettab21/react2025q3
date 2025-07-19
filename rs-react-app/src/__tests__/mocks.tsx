import { vi } from 'vitest';
import type { Character, CharactersResponse } from '../types';
import { Component } from 'react';

export const mockedResponse: CharactersResponse = {
  info: {
    count: 10,
    pages: 1,
  },
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      species: 'Human',
      gender: 'Male',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    },
    {
      id: 2,
      name: 'Morty Smith',
      species: 'Human',
      gender: 'Male',
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    },
    {
      id: 3,
      name: 'Summer Smith',

      species: 'Human',

      gender: 'Female',

      image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
    },
    {
      id: 4,
      name: 'Beth Smith',

      species: 'Human',

      gender: 'Female',

      image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
    },
    {
      id: 5,
      name: 'Jerry Smith',

      species: 'Human',

      gender: 'Male',

      image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
    },
    {
      id: 6,
      name: 'Abadango Cluster Princess',

      species: 'Alien',

      gender: 'Female',

      image: 'https://rickandmortyapi.com/api/character/avatar/6.jpeg',
    },
    {
      id: 7,
      name: 'Abradolf Lincler',

      species: 'Human',

      gender: 'Male',

      image: 'https://rickandmortyapi.com/api/character/avatar/7.jpeg',
    },
    {
      id: 8,
      name: 'Adjudicator Rick',

      species: 'Human',

      gender: 'Male',

      image: 'https://rickandmortyapi.com/api/character/avatar/8.jpeg',
    },
    {
      id: 9,
      name: 'Agency Director',

      species: 'Human',

      gender: 'Male',

      image: 'https://rickandmortyapi.com/api/character/avatar/9.jpeg',
    },
    {
      id: 10,
      name: 'Alan Rails',

      species: 'Human',
      gender: 'Male',

      image: 'https://rickandmortyapi.com/api/character/avatar/10.jpeg',
    },
  ],
};

export const mockedCharactersList: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    species: 'Human',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
  {
    id: 2,
    name: 'Morty Smith',
    species: 'Human',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  },
  {
    id: 3,
    name: 'Summer Smith',

    species: 'Human',

    gender: 'Female',

    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
  },
  {
    id: 4,
    name: 'Beth Smith',

    species: 'Human',

    gender: 'Female',

    image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
  },
  {
    id: 5,
    name: 'Jerry Smith',

    species: 'Human',

    gender: 'Male',

    image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
  },
  {
    id: 6,
    name: 'Abadango Cluster Princess',

    species: 'Alien',

    gender: 'Female',

    image: 'https://rickandmortyapi.com/api/character/avatar/6.jpeg',
  },
  {
    id: 7,
    name: 'Abradolf Lincler',

    species: 'Human',

    gender: 'Male',

    image: 'https://rickandmortyapi.com/api/character/avatar/7.jpeg',
  },
  {
    id: 8,
    name: 'Adjudicator Rick',

    species: 'Human',

    gender: 'Male',

    image: 'https://rickandmortyapi.com/api/character/avatar/8.jpeg',
  },
  {
    id: 9,
    name: 'Agency Director',

    species: 'Human',

    gender: 'Male',

    image: 'https://rickandmortyapi.com/api/character/avatar/9.jpeg',
  },
  {
    id: 10,
    name: 'Alan Rails',

    species: 'Human',
    gender: 'Male',

    image: 'https://rickandmortyapi.com/api/character/avatar/10.jpeg',
  },
];

export const character: Character = {
  id: 1,
  name: 'Rick Sanchez',
  species: 'Human',
  gender: 'Male',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

export const mockedResponseSuccess = {
  ok: true,
  status: 200,
  json: () => Promise.resolve(mockedResponse),
};

export const mockedResponseFailNotFound = {
  ok: false,
  status: 404,
};

export const mockedResponseFailServerError = {
  ok: false,
  status: 500,
};

export const mockFetch = (response: {
  ok: boolean;
  status: number;
  json?: () => Promise<CharactersResponse>;
}) => {
  globalThis.fetch = vi.fn().mockResolvedValue(response);
};

export class MockedComponent extends Component {
  componentDidMount(): void {
    throw new Error('Test');
  }
  render() {
    return (
      <>
        <p>Test</p>
      </>
    );
  }
}
