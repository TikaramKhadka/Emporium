'use client'
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default storage for web
import logger from "redux-logger";
import userReducer from "./userSlice"; // Import your userSlice reducer

const persistConfig = {
  key: "root", // Key for the persisted data
  storage, // Storage engine to use (local storage in this case)
};

const rootReducer = combineReducers({
  user: userReducer, // Make sure this matches the user slice export
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // Use default middleware and concatenate logger
});

// Create the persistor for persisting the store
export const persistor = persistStore(store);