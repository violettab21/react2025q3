import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  beforeAll,
  afterEach,
  afterAll,
} from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MainPage } from './MainPage';
import '@testing-library/jest-dom';
import { http, HttpResponse } from 'msw';
import {
  GENERIC_ERROR,
  LOCAL_STORAGE_KEY,
  NOT_FOUND_MESSAGE,
  url,
} from '../../constants';
import { mockedResponse, server } from '../../__tests__/mocks';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createStore } from '../../store/store';

describe('Main component tests', () => {
  beforeAll(() => {
    server.listen();
  });
  beforeEach(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    vi.clearAllMocks();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

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

    server.use(
      http.get(`${url}`, () => {
        return HttpResponse.json(null, { status: 404 });
      })
    );
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

    server.use(
      http.get(`${url}`, () => {
        return HttpResponse.json(null, { status: 500 });
      })
    );

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

  it('Check that API characters call is cached', async () => {
    const store = createStore();

    const spyFetch = vi.spyOn(window, 'fetch');
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(spyFetch).toBeCalledTimes(1);
    });
  });
});
