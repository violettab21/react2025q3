import {
  describe,
  it,
  expect,
  beforeAll,
  vi,
  beforeEach,
  afterEach,
  afterAll,
} from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { CharacterDetails } from './CharacterDetails';
import '@testing-library/jest-dom';
import { Layout } from '../Layout/Layout';
import { http, HttpResponse } from 'msw';
import { character } from '../../__tests__/mocks';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';
import { GENERIC_ERROR, LOCAL_STORAGE_KEY, url } from '../../constants';
import { createStore } from '../../store/store';
import { Provider } from 'react-redux';
import { server } from '../../__tests__/mocks';

describe('CharacterDetails component tests', () => {
  beforeAll(() => {
    server.listen();
  });
  beforeEach(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    vi.clearAllMocks();
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('Check that CharacterDetails component renders correctly', async () => {
    const store = createStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/1']}>
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <div>
                    <Outlet />
                  </div>
                }
              >
                <Route
                  path="/details/:id"
                  element={<CharacterDetails />}
                ></Route>
              </Route>
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const name = screen.getByText(`Name: ${character.name}`);
      const location = screen.getByText(`Location: ${character.location.name}`);
      const image = screen.getByAltText(`character image`);
      expect(name).toBeInTheDocument();
      expect(location).toBeInTheDocument();
      expect(image).toHaveAttribute('src', character.image);
    });
  });

  it('Check that CharacterDetails response is cached', async () => {
    const store = createStore();
    const spyFetch = vi.spyOn(window, 'fetch');
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/1']}>
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <div>
                    <Outlet />
                  </div>
                }
              >
                <Route
                  path="/details/:id"
                  element={<CharacterDetails />}
                ></Route>
              </Route>
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/1']}>
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <div>
                    <Outlet />
                  </div>
                }
              >
                <Route
                  path="/details/:id"
                  element={<CharacterDetails />}
                ></Route>
              </Route>
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => {
      expect(spyFetch).toBeCalledTimes(1);
    });
  });

  it('Check that CharacterDetails shows loader', () => {
    const store = createStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/1']}>
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <div>
                    <Outlet />
                  </div>
                }
              >
                <Route
                  path="/details/:id"
                  element={<CharacterDetails />}
                ></Route>
              </Route>
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('Check that CharacterDetails component rendering when API return error', async () => {
    const store = createStore();
    server.use(
      http.get(`${url}/1`, () => {
        return HttpResponse.json(null, { status: 500 });
      })
    );
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/1']}>
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <div>
                    <Outlet />
                  </div>
                }
              >
                <Route
                  path="/details/:id"
                  element={<CharacterDetails />}
                ></Route>
              </Route>
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => {
      const error = screen.getByText(GENERIC_ERROR);
      expect(error).toBeInTheDocument();
    });
  });
});
