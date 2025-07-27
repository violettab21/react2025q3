import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { Pagination } from './Pagination';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('Pagination component tests', () => {
  it('Check that Pagination component shows correct number of visible pages when page count < 5', () => {
    render(
      <MemoryRouter>
        {' '}
        <Pagination pageCount={4} currentPage={1} setCurrentPage={() => {}} />
      </MemoryRouter>
    );
    const pages = screen.getAllByTestId('page');
    expect(pages.length).toBe(4);
  });
  it('Check that Pagination component shows correct number of visible pages when page count =5', () => {
    render(
      <MemoryRouter>
        {' '}
        <Pagination pageCount={5} currentPage={1} setCurrentPage={() => {}} />
      </MemoryRouter>
    );
    const pages = screen.getAllByTestId('page');
    expect(pages.length).toBe(5);
  });
  it('Check that Pagination component shows correct number of visible pages when page count >5', () => {
    render(
      <MemoryRouter>
        {' '}
        <Pagination pageCount={5} currentPage={1} setCurrentPage={() => {}} />
      </MemoryRouter>
    );
    const pages = screen.getAllByTestId('page');
    expect(pages.length).toBe(5);
  });

  it('Check that Pagination component shows correct number of visible pages when page count >5 current page is the last one', () => {
    render(
      <MemoryRouter>
        {' '}
        <Pagination pageCount={12} currentPage={12} setCurrentPage={() => {}} />
      </MemoryRouter>
    );
    const pages = screen.getAllByTestId('page');
    expect(pages.length).toBe(5);
  });

  it('Check that correct page is set after page selection', async () => {
    const setCurrentPageMock = vi.fn();
    render(
      <MemoryRouter>
        {' '}
        <Pagination
          pageCount={6}
          currentPage={2}
          setCurrentPage={setCurrentPageMock}
        />
      </MemoryRouter>
    );
    const pages = screen.getAllByTestId('page');
    await userEvent.click(pages[0]);
    expect(setCurrentPageMock).toBeCalledWith(Number(pages[0].textContent));
  });

  it('Check that correct page is set after click Prev', async () => {
    const setCurrentPageMock = vi.fn();
    const currentPageMock = 3;
    render(
      <MemoryRouter>
        {' '}
        <Pagination
          pageCount={6}
          currentPage={currentPageMock}
          setCurrentPage={setCurrentPageMock}
        />
      </MemoryRouter>
    );
    const prev = screen.getByTestId('prev');
    await userEvent.click(prev);
    expect(setCurrentPageMock).toBeCalledWith(Number(currentPageMock - 1));
  });

  it('Check that correct page is set after click Next', async () => {
    const setCurrentPageMock = vi.fn();
    const currentPageMock = 3;
    render(
      <MemoryRouter>
        {' '}
        <Pagination
          pageCount={6}
          currentPage={currentPageMock}
          setCurrentPage={setCurrentPageMock}
        />
      </MemoryRouter>
    );
    const next = screen.getByTestId('next');
    await userEvent.click(next);
    expect(setCurrentPageMock).toBeCalledWith(Number(currentPageMock + 1));
  });
});
