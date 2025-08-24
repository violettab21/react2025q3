import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { createStore } from '../../../store/store';
import { Provider } from 'react-redux';
import { ControlledForm } from './ControlledForm';
import userEvent from '@testing-library/user-event';

describe('ControlledForm component tests', () => {
  it('Check that ControlledForm component renders with all required fields', () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );
    const name = screen.getByPlaceholderText('Name');
    const email = screen.getByPlaceholderText('Email');
    const age = screen.getByPlaceholderText('Age');
    const country = screen.getByPlaceholderText('Country');
    const password = screen.getByPlaceholderText('Password');
    const repeatPassword = screen.getByPlaceholderText('Repeat Password');
    const male = screen.getByLabelText('Male');
    const female = screen.getByLabelText('Female');
    const terms = screen.getByLabelText(
      'I accept Terms and Conditions agreement'
    );
    const file = screen.getByLabelText('Choose an image');

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(age).toBeInTheDocument();
    expect(country).toBeInTheDocument();
    expect(male).toBeInTheDocument();
    expect(female).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(repeatPassword).toBeInTheDocument();
    expect(terms).toBeInTheDocument();
    expect(file).toBeInTheDocument();
  });

  it('Check that error message displayed when Name does not start with Uppercase letter', async () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );
    const name = screen.getByPlaceholderText('Name');
    await userEvent.type(name, 'viyaleta');
    const errorMessage = screen.getByText(
      'Name should start with capital letter'
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('Check that error message displayed when Name contains numbers', async () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );
    const name = screen.getByPlaceholderText('Name');
    await userEvent.type(name, 'Viyaleta5');
    const errorMessage = screen.getByText('Only letters are allowed');
    expect(errorMessage).toBeInTheDocument();
  });

  it('Check that error message displayed when Name is empty', async () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );
    const name = screen.getByPlaceholderText('Name');
    await userEvent.type(name, 'Viyaleta');
    await userEvent.clear(name);
    const errorMessage = screen.getByText('Name is required');
    expect(errorMessage).toBeInTheDocument();
  });

  it('Check that error message displayed when Age is not a number', async () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );
    const age = screen.getByPlaceholderText('Age');
    await userEvent.type(age, '-1');
    const errorMessage = screen.getByText('Age should be positive number');
    expect(errorMessage).toBeInTheDocument();
  });

  it('Check that error message displayed when Age is not a integer', async () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );
    const age = screen.getByPlaceholderText('Age');
    await userEvent.type(age, '1.5');
    const errorMessage = screen.getByText('Age should be integer');
    expect(errorMessage).toBeInTheDocument();
  });

  it('Check that error message displayed when Age is empty', async () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );
    const age = screen.getByPlaceholderText('Age');
    await userEvent.type(age, '1');
    await userEvent.clear(age);
    const errorMessage = screen.getByText('Age must be a number');
    expect(errorMessage).toBeInTheDocument();
  });

  it('Check that error message displayed when Email is empty', async () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );
    const email = screen.getByPlaceholderText('Email');
    await userEvent.type(email, 'email@example.com');
    await userEvent.clear(email);
    const errorMessage = screen.getByText('Email is required');
    expect(errorMessage).toBeInTheDocument();
  });

  it('Check that error message displayed when Email is invalid', async () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );
    const email = screen.getByPlaceholderText('Email');
    await userEvent.type(email, 'emailexample.com');
    const errorMessage = screen.getByText(
      'Email must correspond to email@example.com format'
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('Check that error message displayed when Password is empty', async () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );
    const password = screen.getByPlaceholderText('Password');
    await userEvent.type(password, '12345678qQ!');
    await userEvent.clear(password);
    const errorMessage = screen.getByText('Password is required');
    expect(errorMessage).toBeInTheDocument();
  });

  it('Check that error message displayed when Password complexity incorrect - missing uppercase letter', async () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );
    const password = screen.getByPlaceholderText('Password');
    await userEvent.type(password, '12345678q!');
    const errorMessage = screen.getByText(
      'Password must contain at least one uppercase letter'
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('Check that error message displayed when Password complexity incorrect - missing lowercase letter', async () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );
    const password = screen.getByPlaceholderText('Password');
    await userEvent.type(password, '12345678Q!');
    const errorMessage = screen.getByText(
      'Password must contain at least one lowercase letter'
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('Check that error message displayed when Password complexity incorrect - missing number', async () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );
    const password = screen.getByPlaceholderText('Password');
    await userEvent.type(password, 'abcdsjdknQ!');
    const errorMessage = screen.getByText(
      'Password must contain at least one number'
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('Check that error message displayed when Password complexity incorrect - missing special character', async () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );
    const password = screen.getByPlaceholderText('Password');
    await userEvent.type(password, 'abcdsjdknQ1');
    const errorMessage = screen.getByText(
      'Password must contain at least one special character'
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('Check that error message displayed when Password complexity incorrect - length is less than 10', async () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );
    const password = screen.getByPlaceholderText('Password');
    await userEvent.type(password, '12345qQ!');
    const errorMessage = screen.getByText(
      'Password must contain at least 10 characters'
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('Check that error message displayed when passwords do not match', async () => {
    const userPassword = '123456789!Qq';
    const store = createStore();
    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );
    const password = screen.getByPlaceholderText('Password');
    const repeat = screen.getByPlaceholderText('Repeat Password');
    await userEvent.type(password, userPassword);
    await userEvent.type(repeat, '123456789');
    const errorMessage = screen.getByText('Passwords must match');
    expect(errorMessage).toBeInTheDocument();
  });

  it('Check that error message displayed when file with invalid format uploaded', async () => {
    const mockedFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    const store = createStore();
    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );

    const file = screen.getByLabelText('Choose an image');

    await userEvent.upload(file, mockedFile);
    const errorMessage = screen.getByText(
      'Invalid Format, jpeg and png allowed'
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('Check that error message displayed when country is empty', async () => {
    const store = createStore();
    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );

    const country = screen.getByPlaceholderText('Country');

    await userEvent.type(country, 'Test');
    await userEvent.clear(country);
    const errorMessage = screen.getByText('Country is required');
    expect(errorMessage).toBeInTheDocument();
  });

  it('Submit form with valid data', async () => {
    const mockedFile = new File(['test'], 'test.jpeg', { type: 'image/jpeg' });
    const store = createStore();
    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );
    const name = screen.getByPlaceholderText('Name');
    const email = screen.getByPlaceholderText('Email');
    const age = screen.getByPlaceholderText('Age');
    const country = screen.getByPlaceholderText('Country');
    const password = screen.getByPlaceholderText('Password');
    const repeatPassword = screen.getByPlaceholderText('Repeat Password');
    const female = screen.getByLabelText('Female');
    const terms = screen.getByLabelText(
      'I accept Terms and Conditions agreement'
    );
    const file = screen.getByLabelText('Choose an image');

    await userEvent.type(name, 'Viyaleta');
    await userEvent.type(email, 'email@example.com');
    await userEvent.type(age, '12');
    await userEvent.type(country, 'Belarus');
    await userEvent.type(password, '123456789qQ!');
    await userEvent.type(repeatPassword, '123456789qQ!');
    await userEvent.click(female);
    await userEvent.click(terms);
    await userEvent.upload(file, mockedFile);

    const submit = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submit);

    const storedData = store.getState().usersControlled;
    const lastAddedEmail = storedData.at(-1)?.email;

    expect(lastAddedEmail).toBe('email@example.com');
  });

  it('Submit form with invalid data', async () => {
    const mockedFile = new File(['test'], 'test.jpeg', { type: 'image/jpeg' });
    const store = createStore();
    render(
      <Provider store={store}>
        <ControlledForm onClose={() => {}} />
      </Provider>
    );
    const name = screen.getByPlaceholderText('Name');
    const email = screen.getByPlaceholderText('Email');
    const age = screen.getByPlaceholderText('Age');
    const country = screen.getByPlaceholderText('Country');
    const password = screen.getByPlaceholderText('Password');
    const repeatPassword = screen.getByPlaceholderText('Repeat Password');
    const female = screen.getByLabelText('Female');
    const terms = screen.getByLabelText(
      'I accept Terms and Conditions agreement'
    );
    const file = screen.getByLabelText('Choose an image');

    await userEvent.type(name, 'viyaleta');
    await userEvent.type(email, 'emailexample.com');
    await userEvent.type(age, '12g');
    await userEvent.type(country, 'Belarus');
    await userEvent.type(password, '123456789qQ!');
    await userEvent.type(repeatPassword, '123456789qQ!');
    await userEvent.click(female);
    await userEvent.click(terms);
    await userEvent.upload(file, mockedFile);

    const submit = screen.getByRole('button', { name: 'Submit' });

    expect(submit).toBeDisabled();
  });
});
