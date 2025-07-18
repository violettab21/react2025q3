import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { Results } from './Results';
import type { Character } from '../../types';

const characters: Character[] = [
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

describe('Results component tests', () => {
  it('Check that Results component renders correctly', () => {
    render(<Results characters={characters} isLoading={false} error={''} />);
    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(characters.length);
  });

  it('Check that Results component show loader when loading state', () => {
    render(<Results characters={characters} isLoading={true} error={''} />);
    const loader = screen.getByTestId('loader');
    const cards = screen.queryAllByTestId('card');
    expect(cards.length).toBe(0);
    expect(loader).toBeInTheDocument();
  });

  it('Check that Results component show error when error message passed', () => {
    const errorText = 'Error text';

    render(
      <Results characters={characters} isLoading={false} error={errorText} />
    );
    const errorMessage = screen.getByText(errorText);
    const cards = screen.queryAllByTestId('card');
    expect(cards.length).toBe(0);
    expect(errorMessage).toBeInTheDocument();
  });
});
