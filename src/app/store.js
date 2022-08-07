import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";



export const setupStore = preloadedState => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    preloadedState,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
  })
}

