import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { Provider } from 'react-redux';
import { ModalButton } from './ModalButton';
import userEvent from '@testing-library/user-event';
import { createStore } from '../../store/store';

const MockedComponent = () => {
  return (
    <>
      <p>ModalContent</p>
    </>
  );
};

describe('ModalButton component tests', () => {
  it('Check that ModalButton component renders', async () => {
    const store = createStore();

    render(
      <Provider store={store}>
        <ModalButton name="Test1" renderItem={() => <MockedComponent />} />
      </Provider>
    );
    const button = screen.getByRole('button', { name: 'Test1' });
    await userEvent.click(button);
    const modal = screen.getByTestId('modal');
    const modalContent = screen.getByText('ModalContent');
    expect(modal).toBeInTheDocument();
    expect(modalContent).toBeInTheDocument();
  });

  it('Check that ModalButton component closed on clicking Close', async () => {
    const store = createStore();

    render(
      <Provider store={store}>
        <ModalButton name="Test1" renderItem={() => <MockedComponent />} />
      </Provider>
    );
    const button = screen.getByRole('button', { name: 'Test1' });
    await userEvent.click(button);
    const modal = screen.getByTestId('modal');
    const buttonClose = screen.getByRole('button', { name: 'Close' });
    await userEvent.click(buttonClose);

    expect(modal).not.toBeInTheDocument();
  });
});
