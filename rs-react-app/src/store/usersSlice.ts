import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface User {
  name: string;
  email: string;
  age: number;
  password: string;
  repeatPassword: string;
  gender: string;
  country: string;
  image: FileList;
  terms: boolean;
}

const initialState: User[] = [];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.push(action.payload);
    },
  },
});

export const { addUser } = usersSlice.actions;
