import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface User {
  name: string;
  email: string;
  age: number;
  password: string;
  repeatPassword: string;
  gender: string;
  country: string;
  image: string;
  terms: boolean;
}

const initialState: User[] = [];

export const usersSliceControlled = createSlice({
  name: 'usersControlled',
  initialState,
  reducers: {
    addUserControlled(state, action: PayloadAction<User>) {
      state.push(action.payload);
    },
  },
});

export const usersSliceUncontrolled = createSlice({
  name: 'usersUncontrolled',
  initialState,
  reducers: {
    addUserUncontrolled(state, action: PayloadAction<User>) {
      state.push(action.payload);
    },
  },
});

export const { addUserControlled } = usersSliceControlled.actions;
export const { addUserUncontrolled } = usersSliceUncontrolled.actions;
