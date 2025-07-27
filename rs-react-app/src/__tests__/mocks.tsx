import { vi } from 'vitest';
import type { Character, CharactersResponse } from '../types';
import { Component } from 'react';

export const mockedResponse: CharactersResponse = {
  info: {
    count: 826,
    pages: 42,
  },
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      origin: {
        name: 'Earth (C-137)',
      },
      location: {
        name: 'Citadel of Ricks',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    },
    {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      origin: {
        name: 'unknown',
      },
      location: {
        name: 'Citadel of Ricks',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    },
    {
      id: 3,
      name: 'Summer Smith',
      status: 'Alive',
      species: 'Human',
      gender: 'Female',
      origin: {
        name: 'Earth (Replacement Dimension)',
      },
      location: {
        name: 'Earth (Replacement Dimension)',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
    },
    {
      id: 4,
      name: 'Beth Smith',
      status: 'Alive',
      species: 'Human',
      gender: 'Female',
      origin: {
        name: 'Earth (Replacement Dimension)',
      },
      location: {
        name: 'Earth (Replacement Dimension)',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
    },
    {
      id: 5,
      name: 'Jerry Smith',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      origin: {
        name: 'Earth (Replacement Dimension)',
      },
      location: {
        name: 'Earth (Replacement Dimension)',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
    },
    {
      id: 6,
      name: 'Abadango Cluster Princess',
      status: 'Alive',
      species: 'Alien',
      gender: 'Female',
      origin: {
        name: 'Abadango',
      },
      location: {
        name: 'Abadango',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/6.jpeg',
    },
    {
      id: 7,
      name: 'Abradolf Lincler',
      status: 'unknown',
      species: 'Human',
      gender: 'Male',
      origin: {
        name: 'Earth (Replacement Dimension)',
      },
      location: {
        name: 'Testicle Monster Dimension',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/7.jpeg',
    },
    {
      id: 8,
      name: 'Adjudicator Rick',
      status: 'Dead',
      species: 'Human',

      gender: 'Male',
      origin: {
        name: 'unknown',
      },
      location: {
        name: 'Citadel of Ricks',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/8.jpeg',
    },
    {
      id: 9,
      name: 'Agency Director',
      status: 'Dead',
      species: 'Human',

      gender: 'Male',
      origin: {
        name: 'Earth (Replacement Dimension)',
      },
      location: {
        name: 'Earth (Replacement Dimension)',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/9.jpeg',
    },
    {
      id: 10,
      name: 'Alan Rails',
      status: 'Dead',
      species: 'Human',
      gender: 'Male',
      origin: {
        name: 'unknown',
      },
      location: {
        name: "Worldender's lair",
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/10.jpeg',
    },
    {
      id: 11,
      name: 'Albert Einstein',
      status: 'Dead',
      species: 'Human',
      gender: 'Male',
      origin: {
        name: 'Earth (C-137)',
      },
      location: {
        name: 'Earth (Replacement Dimension)',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/11.jpeg',
    },
    {
      id: 12,
      name: 'Alexander',
      status: 'Dead',
      species: 'Human',

      gender: 'Male',
      origin: {
        name: 'Earth (C-137)',
      },
      location: {
        name: 'Anatomy Park',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/12.jpeg',
    },
    {
      id: 13,
      name: 'Alien Googah',
      status: 'unknown',
      species: 'Alien',
      gender: 'unknown',
      origin: {
        name: 'unknown',
      },
      location: {
        name: 'Earth (Replacement Dimension)',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/13.jpeg',
    },
    {
      id: 14,
      name: 'Alien Morty',
      status: 'unknown',
      species: 'Alien',
      gender: 'Male',
      origin: {
        name: 'unknown',
      },
      location: {
        name: 'Citadel of Ricks',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg',
    },
    {
      id: 15,
      name: 'Alien Rick',
      status: 'unknown',
      species: 'Alien',

      gender: 'Male',
      origin: {
        name: 'unknown',
      },
      location: {
        name: 'Citadel of Ricks',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg',
    },
  ],
};

export const mockedCharactersList: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
    },
    location: {
      name: 'Citadel of Ricks',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: {
      name: 'unknown',
    },
    location: {
      name: 'Citadel of Ricks',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  },
  {
    id: 3,
    name: 'Summer Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Female',
    origin: {
      name: 'Earth (Replacement Dimension)',
    },
    location: {
      name: 'Earth (Replacement Dimension)',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
  },
  {
    id: 4,
    name: 'Beth Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Female',
    origin: {
      name: 'Earth (Replacement Dimension)',
    },
    location: {
      name: 'Earth (Replacement Dimension)',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
  },
  {
    id: 5,
    name: 'Jerry Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: {
      name: 'Earth (Replacement Dimension)',
    },
    location: {
      name: 'Earth (Replacement Dimension)',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
  },
  {
    id: 6,
    name: 'Abadango Cluster Princess',
    status: 'Alive',
    species: 'Alien',
    gender: 'Female',
    origin: {
      name: 'Abadango',
    },
    location: {
      name: 'Abadango',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/6.jpeg',
  },
  {
    id: 7,
    name: 'Abradolf Lincler',
    status: 'unknown',
    species: 'Human',
    gender: 'Male',
    origin: {
      name: 'Earth (Replacement Dimension)',
    },
    location: {
      name: 'Testicle Monster Dimension',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/7.jpeg',
  },
  {
    id: 8,
    name: 'Adjudicator Rick',
    status: 'Dead',
    species: 'Human',

    gender: 'Male',
    origin: {
      name: 'unknown',
    },
    location: {
      name: 'Citadel of Ricks',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/8.jpeg',
  },
  {
    id: 9,
    name: 'Agency Director',
    status: 'Dead',
    species: 'Human',

    gender: 'Male',
    origin: {
      name: 'Earth (Replacement Dimension)',
    },
    location: {
      name: 'Earth (Replacement Dimension)',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/9.jpeg',
  },
  {
    id: 10,
    name: 'Alan Rails',
    status: 'Dead',
    species: 'Human',
    gender: 'Male',
    origin: {
      name: 'unknown',
    },
    location: {
      name: "Worldender's lair",
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/10.jpeg',
  },
  {
    id: 11,
    name: 'Albert Einstein',
    status: 'Dead',
    species: 'Human',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
    },
    location: {
      name: 'Earth (Replacement Dimension)',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/11.jpeg',
  },
  {
    id: 12,
    name: 'Alexander',
    status: 'Dead',
    species: 'Human',

    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
    },
    location: {
      name: 'Anatomy Park',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/12.jpeg',
  },
  {
    id: 13,
    name: 'Alien Googah',
    status: 'unknown',
    species: 'Alien',
    gender: 'unknown',
    origin: {
      name: 'unknown',
    },
    location: {
      name: 'Earth (Replacement Dimension)',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/13.jpeg',
  },
  {
    id: 14,
    name: 'Alien Morty',
    status: 'unknown',
    species: 'Alien',
    gender: 'Male',
    origin: {
      name: 'unknown',
    },
    location: {
      name: 'Citadel of Ricks',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/14.jpeg',
  },
  {
    id: 15,
    name: 'Alien Rick',
    status: 'unknown',
    species: 'Alien',

    gender: 'Male',
    origin: {
      name: 'unknown',
    },
    location: {
      name: 'Citadel of Ricks',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg',
  },
];

export const character: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
  },
  location: {
    name: 'Citadel of Ricks',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};
export const mockedResponseSuccess = {
  ok: true,
  status: 200,
  json: () => Promise.resolve(mockedResponse),
};

export const mockedCharacterResponseSuccess = {
  ok: true,
  status: 200,
  json: () => Promise.resolve(character),
};

export const mockedCharacterResponseError = {
  ok: true,
  status: 500,
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
  json?: () => Promise<CharactersResponse> | Promise<Character>;
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
