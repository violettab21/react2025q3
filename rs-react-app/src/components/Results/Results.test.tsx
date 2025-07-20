import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { Results } from './Results';
import { mockedCharactersList } from '../../__tests__/mocks';

describe('Results component tests', () => {
  it('Check that Results component renders with correct number of cards', () => {
    render(
      <Results characters={mockedCharactersList} isLoading={false} error={''} />
    );
    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(mockedCharactersList.length);
  });

  it('Check that Results component shows loader when loading state', () => {
    render(
      <Results characters={mockedCharactersList} isLoading={true} error={''} />
    );
    const loader = screen.getByTestId('loader');
    const cards = screen.queryAllByTestId('card');
    expect(cards.length).toBe(0);
    expect(loader).toBeInTheDocument();
  });

  it('Check that Results component shows error when error message passed', () => {
    const errorText = 'Error text';

    render(
      <Results
        characters={mockedCharactersList}
        isLoading={false}
        error={errorText}
      />
    );
    const errorMessage = screen.getByText(errorText);
    const cards = screen.queryAllByTestId('card');
    expect(cards.length).toBe(0);
    expect(errorMessage).toBeInTheDocument();
  });
});
