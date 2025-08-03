import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MainPage } from './MainPage';
import '@testing-library/jest-dom';
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
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createStore } from '../../store/store';

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
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(fetch).toBeCalledWith(`${url}/?page=1`);
    });
  });

  it('Check that API call is made to endpoint for search when saved SearchTerm exists', async () => {
    const store = createStore();
    const searchTerm = 'Rick';

    localStorage.setItem(LOCAL_STORAGE_KEY, searchTerm);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(fetch).toBeCalledWith(`${url}/?page=1&name=${searchTerm}`);
    });
  });

  it('Check that data received from API in Results', async () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

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
    const store = createStore();
    mockFetch(mockedResponseFailNotFound);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('errorMessage')).toHaveTextContent(
        NOT_FOUND_MESSAGE
      );
    });
  });

  it('Check Error message when request returned with 500 error', async () => {
    const store = createStore();
    mockFetch(mockedResponseFailServerError);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('errorMessage')).toHaveTextContent(
        GENERIC_ERROR
      );
    });
  });
});
