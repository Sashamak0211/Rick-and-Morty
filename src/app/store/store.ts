import { configureStore } from "@reduxjs/toolkit";

import { rickApi } from "./api";
import { charactersSlice } from "./characterSlice";

export const store = configureStore({
  reducer: {
    characters: charactersSlice.reducer,
    [rickApi.reducerPath]: rickApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
