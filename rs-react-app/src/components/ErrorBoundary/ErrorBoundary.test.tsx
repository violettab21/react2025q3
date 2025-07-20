import { describe, it, expect, beforeAll, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import '@testing-library/jest-dom';
import { MockedComponent } from '../../__tests__/mocks';
import userEvent from '@testing-library/user-event';

describe('ErrorBoundary Component tests', () => {
  beforeAll(() => {
    console.error = vi.fn();
    console.log = vi.fn();
  });

  it('Check Fallback error message is shown when error occurred in child component', () => {
    render(
      <ErrorBoundary fallback="Message">
        <MockedComponent />
      </ErrorBoundary>
    );
    const fallbackUIButton = screen.getByRole('button', { name: 'Try again' });
    const fallbackUIMessage = screen.getByText('Message');

    expect(fallbackUIButton).toBeInTheDocument();
    expect(fallbackUIMessage).toBeInTheDocument();
  });

  it('Check that message is logged to console log on error', async () => {
    render(
      <ErrorBoundary fallback="Message">
        <MockedComponent />
      </ErrorBoundary>
    );

    expect(console.log).toBeCalled();
  });

  it('Check that app is restored after clicking Try Again Button', async () => {
    history.go = vi.fn();
    render(
      <ErrorBoundary fallback="Message">
        <MockedComponent />
      </ErrorBoundary>
    );

    const fallbackUIButton = screen.getByRole('button', { name: 'Try again' });

    await userEvent.click(fallbackUIButton);

    expect(history.go).toBeCalled();
  });
});
