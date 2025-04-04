import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { apiSlice } from "./api/apiSlice";



const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
})


const persistConfig = {
  key: "root",
  storage,
  whitelist: [apiSlice.reducerPath], // only persist the RTK Query cache
}


const persistedReducer = persistReducer(persistConfig, rootReducer)


export const setupStore = (preloadedState) => {

  const store = configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiSlice.middleware)
  })


  const persistor = persistStore(store)

  return { store, persistor } 
}

