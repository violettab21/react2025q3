import { describe, it, expect, beforeAll, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { NotFoundPage } from './NotFoundPage';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { MainPage } from '../Main/MainPage';
import { Layout } from '../Layout/Layout';
import { mockedResponseSuccess, mockFetch } from '../../__tests__/mocks';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('NotFoundPage component tests', () => {
  beforeAll(() => {
    mockFetch(mockedResponseSuccess);
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('Check that NotFoundPage component renders correctly', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );
    const text = screen.getByText('Page is not found');

    expect(text).toBeInTheDocument();
  });

  it('Check that NotFoundPage component renders correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/sdfsdf']}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/*" element={<NotFoundPage />}></Route>
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const button = screen.getByRole('link', { name: 'Go to Home' });

    await userEvent.click(button);

    const textFromHome = screen.getByText(
      'Search for Rick and Morty character:'
    );
    await waitFor(() => {
      expect(textFromHome).toBeInTheDocument();
    });
  });
});
