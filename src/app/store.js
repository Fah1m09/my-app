import { configureStore } from '@reduxjs/toolkit';

import postReducer from '../features/api/postSlice';
export const store = configureStore({
  reducer: {
    // [apiSlice.reducerPath] : apiSlice.reducer,
    posts: postReducer
  },
  middleware: (getDefaultMiddlewares) =>
  getDefaultMiddlewares().concat(),
});
