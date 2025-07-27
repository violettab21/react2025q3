import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { About } from './About';

describe('About component tests', () => {
  it('Check that About component renders correctly', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    const aboutBlock = screen.getByTestId('about');
    expect(aboutBlock).toBeInTheDocument();
  });

  it('Check that About component have correct link to RSS course', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    const courseLink = screen.getByRole('link');
    expect(courseLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
  });
});
