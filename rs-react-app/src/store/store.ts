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
    resultUnselected(state, action: PayloadAction<Character>) {
      const index = state.findIndex((el) => el.id === action.payload.id);
      state.splice(index, 1);
    },
    allResultsUnselected(state) {
      state.length = 0;
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
export const { resultUnselected } = resultsSlice.actions;
export const { allResultsUnselected } = resultsSlice.actions;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
