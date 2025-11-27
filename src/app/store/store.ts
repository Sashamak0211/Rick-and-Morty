import { configureStore } from '@reduxjs/toolkit';

import characterReducer from './characterSlice';
import filterReducer from './filterSlice';
import themeReduser from './themeSlice';
import { rickApi } from './useCharactersStore';

export const store = configureStore({
  reducer: {
    theme: themeReduser,
    filter: filterReducer,
    characters: characterReducer,
    [rickApi.reducerPath]: rickApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
