import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Flyout } from './Flyout';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore, resultSelected } from '../../store/store';
import { mockedCharactersList } from '../../__tests__/mocks';
import userEvent from '@testing-library/user-event';
import { prepareFile } from './helpers';

URL.createObjectURL = vi.fn();

describe('Flyout component tests', () => {
  it('Check that Flyout component show correct number of selected items', () => {
    const store = createStore();

    store.dispatch(resultSelected(mockedCharactersList[0]));
    store.dispatch(resultSelected(mockedCharactersList[1]));

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const text = screen.getByText(`2 items are selected`);

    expect(text).toBeInTheDocument();
  });

  it('Check that Flyout component is not visible when no selected items', () => {
    const store = createStore();

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const flyout = screen.queryByTestId(`flyout-id`);

    expect(flyout).toBeNull();
  });

  it('Check that Flyout component is visible when at least one item selected', () => {
    const store = createStore();
    store.dispatch(resultSelected(mockedCharactersList[0]));

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const flyout = screen.getByTestId(`flyout-id`);

    expect(flyout).toBeInTheDocument();
  });

  it('Check that Flyout component contains Download button and Unselect All option', () => {
    const store = createStore();
    store.dispatch(resultSelected(mockedCharactersList[0]));

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const unselectAll = screen.getByRole('button', { name: 'Unselect all' });
    const downloadButton = screen.getByText('Download');

    expect(downloadButton).toBeInTheDocument();
    expect(unselectAll).toBeInTheDocument();
  });

  it('Check that state is cleared out when Unselect All clicked', async () => {
    const store = createStore();
    store.dispatch(resultSelected(mockedCharactersList[0]));

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const unselectAll = screen.getByRole('button', { name: 'Unselect all' });

    await userEvent.click(unselectAll);

    const stateLength = store.getState().selectedCards.length;
    expect(stateLength).toBe(0);
  });

  it('Check that Download Function triggered on clicking download', async () => {
    const store = createStore();
    store.dispatch(resultSelected(mockedCharactersList[0]));
    vi.mock('./helpers', () => ({ prepareFile: vi.fn() }));

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const downloadButton = screen.getByText('Download');

    await userEvent.click(downloadButton);

    await waitFor(() => {
      expect(prepareFile).toBeCalled();
    });
  });
});
