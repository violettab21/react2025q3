import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import {
  usersSliceControlled,
  usersSliceUncontrolled,
  type User,
} from './usersSlice';
import { countriesSlice } from './countries';

export const createStore = () => {
  return configureStore({
    reducer: {
      usersControlled: usersSliceControlled.reducer,
      usersUncontrolled: usersSliceUncontrolled.reducer,
      countries: countriesSlice.reducer,
    },
  });
};

export const store = createStore();

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = {
  usersControlled: User[];
  usersUncontrolled: User[];
  countries: string[];
};

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
