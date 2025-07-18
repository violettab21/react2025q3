import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Main } from './Main';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {
  GENERIC_ERROR,
  LOCAL_STORAGE_KEY,
  NOT_FOUND_MESSAGE,
  url,
} from '../../constants';
import type { CharactersResponse } from '../../types';

globalThis.fetch = vi.fn();
const response: CharactersResponse = {
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

describe('Main component tests', () => {
  it('Check that API call is made to all records when no saved SearchTerm', () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);

    render(<Main />);
    expect(fetch).toBeCalledWith(url);
  });

  it('Check that API call is made to endpoint for search when saved SearchTerm exists', () => {
    const searchTerm = 'Rick';

    localStorage.setItem(LOCAL_STORAGE_KEY, searchTerm);

    render(<Main />);
    expect(fetch).toBeCalledWith(`${url}?name=${searchTerm}`);
  });

  it('Check that data recevied from API in Results', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(response),
    });

    render(<Main />);

    await waitFor(() => {
      expect(screen.getAllByTestId('card').length).toBe(
        response.results.length
      );
      expect(
        screen.getByText(`Name: ${response.results[0].name}`)
      ).toBeInTheDocument();
    });
  });

  it('Check Error message when request returned with 404 error', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: false, status: 404 });

    render(<Main />);

    await waitFor(() => {
      expect(screen.getByTestId('errorMessage')).toHaveTextContent(
        NOT_FOUND_MESSAGE
      );
    });
  });

  it('Check Error message when request returned with 500 error', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 });

    render(<Main />);

    await waitFor(() => {
      expect(screen.getByTestId('errorMessage')).toHaveTextContent(
        GENERIC_ERROR
      );
    });
  });

  it('Check that fallback UI  appeared on clicking Error', async () => {
    render(<Main />);

    const errorButton = screen.getByRole('button', { name: 'Emulate Error' });

    await userEvent.click(errorButton);
    const fallbackUIButton = screen.getByRole('button', { name: 'Try again' });
    const fallbackUIMessage = screen.getByText(GENERIC_ERROR);

    expect(fallbackUIButton).toBeInTheDocument();
    expect(fallbackUIMessage).toBeInTheDocument();
  });

  it('Check that message is logged to console log on error', async () => {
    console.log = vi.fn();

    render(<Main />);

    const errorButton = screen.getByRole('button', { name: 'Emulate Error' });

    await userEvent.click(errorButton);

    expect(console.log).toBeCalled();
  });

  it('Check that app is restored after clicking Try Again Button', async () => {
    history.go = vi.fn();
    render(<Main />);

    const errorButton = screen.getByRole('button', { name: 'Emulate Error' });

    await userEvent.click(errorButton);
    const fallbackUIButton = screen.getByRole('button', { name: 'Try again' });

    await userEvent.click(fallbackUIButton);

    expect(history.go).toBeCalled();
  });
});
