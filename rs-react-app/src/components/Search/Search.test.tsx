import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Search } from './Search';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { LOCAL_STORAGE_KEY } from '../../constants';

const mockedSearchHandler = vi.fn();

describe('Search component tests', () => {
  beforeEach(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    vi.clearAllMocks();
  });

  it('Check that search component renders correctly', () => {
    render(<Search handleSearch={async () => {}} />);
    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button');
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('Check that search handler is triggered on clicking Search', async () => {
    render(<Search handleSearch={mockedSearchHandler} />);
    const searchButton = screen.getByRole('button');

    await userEvent.click(searchButton);

    expect(mockedSearchHandler).toBeCalled();
  });

  it('Check that search handler is triggered with entered searchTerm', async () => {
    const searchTerm = 'Rick';

    render(<Search handleSearch={mockedSearchHandler} />);

    const searchButton = screen.getByRole('button');
    const searchInput = screen.getByRole('textbox');

    await userEvent.type(searchInput, searchTerm);
    await userEvent.click(searchButton);

    expect(mockedSearchHandler).toBeCalledWith(searchTerm);
  });

  it('Check Search Input when local storage is empty', async () => {
    render(<Search handleSearch={async () => {}} />);

    const searchInput = screen.getByRole('textbox');

    expect(searchInput).toHaveValue('');
  });

  it('Check Search Input when local storage is not empty', async () => {
    const searchTerm = 'Morty';

    localStorage.setItem(LOCAL_STORAGE_KEY, searchTerm);

    render(<Search handleSearch={async () => {}} />);

    const searchInput = screen.getByRole('textbox');

    expect(searchInput).toHaveValue(searchTerm);
  });

  it('Check that searchTerm is saved to localStorage', async () => {
    const searchTerm = 'Morty';

    render(<Search handleSearch={async () => {}} />);

    const searchButton = screen.getByRole('button');
    const searchInput = screen.getByRole('textbox');

    await userEvent.type(searchInput, searchTerm);
    await userEvent.click(searchButton);

    const savedTerm = localStorage.getItem(LOCAL_STORAGE_KEY);

    expect(savedTerm).toBe(searchTerm);
  });

  it('Check that searchTerm spaces are trimmed', async () => {
    const searchTerm = '  Morty  ';

    render(<Search handleSearch={mockedSearchHandler} />);

    const searchButton = screen.getByRole('button');
    const searchInput = screen.getByRole('textbox');

    await userEvent.type(searchInput, searchTerm);
    await userEvent.click(searchButton);
    const savedTerm = localStorage.getItem(LOCAL_STORAGE_KEY);

    expect(mockedSearchHandler).toBeCalledWith(searchTerm.trim());
    expect(savedTerm).toBe(searchTerm.trim());
  });

  it('Check that saved searchTerm is overwritten after searching with new term', async () => {
    const searchTerm1 = 'Morty';
    localStorage.setItem(LOCAL_STORAGE_KEY, searchTerm1);
    const searchTerm2 = 'Rick';

    render(<Search handleSearch={mockedSearchHandler} />);

    const searchButton = screen.getByRole('button');
    const searchInput = screen.getByRole('textbox');

    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, searchTerm2);
    await userEvent.click(searchButton);

    const savedTerm = localStorage.getItem(LOCAL_STORAGE_KEY);

    expect(savedTerm).toBe(searchTerm2);
  });
});
