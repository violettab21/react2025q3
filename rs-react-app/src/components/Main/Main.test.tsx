import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MainPage } from './MainPage';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {
  GENERIC_ERROR,
  LOCAL_STORAGE_KEY,
  NOT_FOUND_MESSAGE,
  url,
} from '../../constants';
import {
  mockedResponse,
  mockedResponseFailNotFound,
  mockedResponseFailServerError,
  mockedResponseSuccess,
  mockFetch,
} from '../../__tests__/mocks';

describe('Main component tests', () => {
  beforeAll(() => {
    mockFetch(mockedResponseSuccess);
    console.error = vi.fn();
    console.log = vi.fn();
  });
  beforeEach(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    vi.clearAllMocks();
  });

  it('Check that API call is made to all records when no saved SearchTerm', async () => {
    render(<MainPage />);

    await waitFor(() => {
      expect(fetch).toBeCalledWith(url);
    });
  });

  it('Check that API call is made to endpoint for search when saved SearchTerm exists', async () => {
    const searchTerm = 'Rick';

    localStorage.setItem(LOCAL_STORAGE_KEY, searchTerm);

    render(<MainPage />);

    await waitFor(() => {
      expect(fetch).toBeCalledWith(`${url}?name=${searchTerm}`);
    });
  });

  it('Check that data received from API in Results', async () => {
    render(<MainPage />);

    await waitFor(() => {
      expect(screen.getAllByTestId('card').length).toBe(
        mockedResponse.results.length
      );
      expect(
        screen.getByText(`Name: ${mockedResponse.results[0].name}`)
      ).toBeInTheDocument();
    });
  });

  it('Check Error message when request returned with 404 error', async () => {
    mockFetch(mockedResponseFailNotFound);

    render(<MainPage />);

    await waitFor(() => {
      expect(screen.getByTestId('errorMessage')).toHaveTextContent(
        NOT_FOUND_MESSAGE
      );
    });
  });

  it('Check Error message when request returned with 500 error', async () => {
    mockFetch(mockedResponseFailServerError);

    render(<MainPage />);

    await waitFor(() => {
      expect(screen.getByTestId('errorMessage')).toHaveTextContent(
        GENERIC_ERROR
      );
    });
  });

  it('Check that fallback UI  appeared on clicking Error', async () => {
    render(<MainPage />);

    const errorButton = screen.getByRole('button', { name: 'Emulate Error' });

    await userEvent.click(errorButton);
    const fallbackUIButton = screen.getByRole('button', { name: 'Try again' });
    const fallbackUIMessage = screen.getByText(GENERIC_ERROR);

    expect(fallbackUIButton).toBeInTheDocument();
    expect(fallbackUIMessage).toBeInTheDocument();
  });
});
