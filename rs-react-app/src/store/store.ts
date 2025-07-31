import {
  configureStore,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { Character } from '../types';
import { useDispatch, useSelector } from 'react-redux';

const initialState: Character[] = [];

const resultsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    resultSelected(state, action: PayloadAction<Character>) {
      state.push(action.payload);
    },
  },
});

export const store = configureStore({
  reducer: { selectedCards: resultsSlice.reducer },
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const { resultSelected } = resultsSlice.actions;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
