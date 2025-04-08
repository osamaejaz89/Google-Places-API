import {configureStore} from '@reduxjs/toolkit';
import placesReducer from './slices/placesSlice';

export const store = configureStore({
  reducer: {
    places: placesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // For handling non-serializable values like functions in debounce
    }),
});
