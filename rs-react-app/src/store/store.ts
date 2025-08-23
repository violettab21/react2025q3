import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { usersSlice, type User } from './usersSlice';
import { countriesSlice } from './countries';

export const createStore = () => {
  return configureStore({
    reducer: { users: usersSlice.reducer, countries: countriesSlice.reducer },
  });
};

export const store = createStore();

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = {
  users: User[];
  countries: string[];
};

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
