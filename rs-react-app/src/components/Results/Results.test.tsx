import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { Results } from './Results';
import { mockedCharactersList } from '../../__tests__/mocks';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from '../../store/store';
import { Provider } from 'react-redux';

describe('Results component tests', () => {
  it('Check that Results component renders with correct number of cards', () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Results
            characters={mockedCharactersList}
            isLoading={false}
            error={''}
            pageCount={1}
            currentPage={1}
            setCurrentPage={() => {}}
          />
        </MemoryRouter>
      </Provider>
    );
    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(mockedCharactersList.length);
  });

  it('Check that Results component shows loader when loading state', () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          {' '}
          <Results
            characters={mockedCharactersList}
            isLoading={true}
            error={''}
            pageCount={1}
            currentPage={1}
            setCurrentPage={() => {}}
          />
        </MemoryRouter>
      </Provider>
    );
    const loader = screen.getByTestId('loader');
    const cards = screen.queryAllByTestId('card');
    expect(cards.length).toBe(0);
    expect(loader).toBeInTheDocument();
  });

  it('Check that Results component shows error when error message passed', () => {
    const store = createStore();
    const errorText = 'Error text';

    render(
      <Provider store={store}>
        <MemoryRouter>
          {' '}
          <Results
            characters={mockedCharactersList}
            isLoading={false}
            error={errorText}
            pageCount={1}
            currentPage={1}
            setCurrentPage={() => {}}
          />
        </MemoryRouter>
      </Provider>
    );
    const errorMessage = screen.getByText(errorText);
    const cards = screen.queryAllByTestId('card');
    expect(cards.length).toBe(0);
    expect(errorMessage).toBeInTheDocument();
  });

  it('Check that Results component shows correct number of visible pages when page count < 5', () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          {' '}
          <Results
            characters={mockedCharactersList}
            isLoading={false}
            error={''}
            pageCount={4}
            currentPage={1}
            setCurrentPage={() => {}}
          />
        </MemoryRouter>
      </Provider>
    );
    const pages = screen.getAllByTestId('page');
    expect(pages.length).toBe(4);
  });
});
