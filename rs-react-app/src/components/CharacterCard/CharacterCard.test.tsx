import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { CharacterCard } from './CharacterCard';
import { character } from '../../__tests__/mocks';

describe('CharacterCard component tests', () => {
  it('Check that CharacterCard component renders correctly', () => {
    render(<CharacterCard character={character} />);
    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
  });

  it('Check that CharacterCard component shows correct character name', () => {
    render(<CharacterCard character={character} />);
    const name = screen.getByText(`Name: ${character.name}`);
    expect(name).toBeInTheDocument();
  });

  it('Check that CharacterCard component shows correct character image', () => {
    render(<CharacterCard character={character} />);
    const imageElement = screen.getByAltText('character image');
    let imageSrc = '';
    if (imageElement instanceof HTMLImageElement) {
      imageSrc = imageElement.src;
    }

    expect(imageElement).toBeInTheDocument();
    expect(imageSrc).toBe(character.image);
  });
});
