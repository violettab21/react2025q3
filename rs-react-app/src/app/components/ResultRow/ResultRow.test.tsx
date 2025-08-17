import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ResultRow } from './ResultRow';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore, resultSelected } from '../../../store/store';
import { character, mockedCharactersList } from '../../../__tests__/mocks';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

describe('ResultRow component tests', () => {
  it('Check that ResultRow component shows checkbox', () => {
    const store = createStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          {' '}
          <ResultRow character={character} />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeInTheDocument();
  });

  it('Check that item is added to state on clicking checkbox', async () => {
    const store = createStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          {' '}
          <ResultRow character={character} />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    const state = store.getState();
    expect(state.selectedCards[0].id).toEqual(character.id);
  });

  it('Check that item is removed from state on removing checkbox', async () => {
    const store = createStore();

    store.dispatch(resultSelected(mockedCharactersList[0]));
    store.dispatch(resultSelected(mockedCharactersList[1]));

    render(
      <Provider store={store}>
        <MemoryRouter>
          {' '}
          <ResultRow character={mockedCharactersList[0]} />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    const state = store.getState();
    const removedItem = state.selectedCards.some(
      (el) => el.id === mockedCharactersList[0].id
    );
    expect(removedItem).toEqual(false);
  });

  it('Check that item checked if it is present in state', async () => {
    const store = createStore();

    store.dispatch(resultSelected(mockedCharactersList[0]));
    store.dispatch(resultSelected(mockedCharactersList[1]));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ResultRow character={mockedCharactersList[0]} />
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');

    await waitFor(() => {
      expect(checkbox).toHaveAttribute('checked');
    });
  });
});
