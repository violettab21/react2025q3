import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Search } from './Search';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { LOCAL_STORAGE_KEY } from '../../constants';

describe('Search component tests', () => {
  it('Check that search component renders correctly', () => {
    render(<Search handleSearch={async () => {}} />);
    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByRole('button');
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('Check that search handler is triggered on clicking Search', async () => {
    const mock = vi.fn();

    render(<Search handleSearch={mock} />);
    const searchButton = screen.getByRole('button');

    await userEvent.click(searchButton);

    expect(mock).toBeCalled();
  });

  it('Check that search handler is triggered with entered searchTerm', async () => {
    const mock = vi.fn();
    const searchTerm = 'Rick';

    render(<Search handleSearch={mock} />);

    const searchButton = screen.getByRole('button');
    const searchInput = screen.getByRole('textbox');

    await userEvent.type(searchInput, searchTerm);
    await userEvent.click(searchButton);

    expect(mock).toBeCalledWith(searchTerm);
  });

  it('Check Search Input when local storage is empty', async () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);

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
    localStorage.removeItem(LOCAL_STORAGE_KEY);
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
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    const searchTerm = '  Morty  ';
    const mock = vi.fn();

    render(<Search handleSearch={mock} />);

    const searchButton = screen.getByRole('button');
    const searchInput = screen.getByRole('textbox');

    await userEvent.type(searchInput, searchTerm);
    await userEvent.click(searchButton);
    const savedTerm = localStorage.getItem(LOCAL_STORAGE_KEY);

    expect(mock).toBeCalledWith(searchTerm.trim());
    expect(savedTerm).toBe(searchTerm.trim());
  });

  it('Check that saved searchTerm is overwritten after searching with new term', async () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    const searchTerm1 = 'Morty';
    localStorage.setItem(LOCAL_STORAGE_KEY, searchTerm1);
    const searchTerm2 = 'Rick';
    const mock = vi.fn();

    render(<Search handleSearch={mock} />);

    const searchButton = screen.getByRole('button');
    const searchInput = screen.getByRole('textbox');

    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, searchTerm2);
    await userEvent.click(searchButton);

    const savedTerm = localStorage.getItem(LOCAL_STORAGE_KEY);

    expect(savedTerm).toBe(searchTerm2);
  });
});
