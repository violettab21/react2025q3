import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Layout component tests', () => {
  it('Check that Layout component renders correctly', () => {
    render(
      <MemoryRouter initialEntries={['/rs-react-app']}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/rs-react-app" element={<p>TEST</p>}></Route>
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const text = screen.getByText('TEST');

    expect(text).toBeInTheDocument();
  });
});
