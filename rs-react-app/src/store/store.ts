'use client';
import {
  configureStore,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { Character } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { rickAndMortyAPI } from './api';
import { setupListeners } from '@reduxjs/toolkit/query/react';

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

export const createStore = () => {
  return configureStore({
    reducer: {
      selectedCards: resultsSlice.reducer,
      [rickAndMortyAPI.reducerPath]: rickAndMortyAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rickAndMortyAPI.middleware),
  });
};

export const store = createStore();

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = {
  selectedCards: Character[];
};
export const { resultSelected } = resultsSlice.actions;
export const { resultUnselected } = resultsSlice.actions;
export const { allResultsUnselected } = resultsSlice.actions;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
setupListeners(store.dispatch);
