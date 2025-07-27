import { describe, it, expect, beforeAll, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { CharacterDetails } from './CharacterDetails';
import '@testing-library/jest-dom';
import { Layout } from '../Layout/Layout';
import {
  character,
  mockedCharacterResponseError,
  mockedCharacterResponseSuccess,
  mockFetch,
} from '../../__tests__/mocks';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';
import { GENERIC_ERROR, url } from '../../constants';

describe('CharacterDetails component tests', () => {
  beforeAll(() => {
    mockFetch(mockedCharacterResponseSuccess);
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Check that correct API is triggered when CharacterDetails component renders', async () => {
    render(
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
              <Route path="/details/:id" element={<CharacterDetails />}></Route>
            </Route>
          </Route>
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(fetch).toBeCalledWith(`${url}/1`);
    });
  });

  it('Check that CharacterDetails component renders correctly', async () => {
    render(
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
              <Route path="/details/:id" element={<CharacterDetails />}></Route>
            </Route>
          </Route>
        </Routes>
      </MemoryRouter>
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

  it('Check that CharacterDetails component rendering when API return ', async () => {
    mockFetch(mockedCharacterResponseError);
    render(
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
              <Route path="/details/:id" element={<CharacterDetails />}></Route>
            </Route>
          </Route>
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      const error = screen.getByText(GENERIC_ERROR);
      expect(error).toBeInTheDocument();
    });
  });
});
