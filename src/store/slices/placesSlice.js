import {createSlice} from '@reduxjs/toolkit';
import {getSearchHistory, saveSearchHistory} from '../../services/storage';
import {searchPlaces, getPlaceDetails} from '../../services/places';

const initialState = {
  searchResults: [],
  selectedPlace: null,
  searchHistory: [],
  isLoading: false,
  error: null,
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setSelectedPlace: (state, action) => {
      state.selectedPlace = action.payload;
    },
    setSearchHistory: (state, action) => {
      state.searchHistory = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
  setSearchResults,
  setSelectedPlace,
  setSearchHistory,
  setLoading,
  setError,
} = placesSlice.actions;

// Thunk for loading history
export const loadSearchHistory = () => async dispatch => {
  try {
    const history = await getSearchHistory();
    dispatch(setSearchHistory(history));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Thunk for searching places
export const searchPlacesDebounced = query => async dispatch => {
  if (query.length < 3) {
    dispatch(setSearchResults([]));
    return;
  }

  dispatch(setLoading(true));
  try {
    const results = await searchPlaces(query);
    dispatch(setSearchResults(results));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk for selecting a place
export const selectPlace = place => async dispatch => {
  dispatch(setLoading(true));
  try {
    const details = await getPlaceDetails(place.place_id);
    dispatch(setSelectedPlace(details));

    // Update history
    const history = await getSearchHistory();
    const newHistory = [
      place,
      ...history.filter(item => item.place_id !== place.place_id),
    ].slice(0, 10);

    await saveSearchHistory(newHistory);
    dispatch(setSearchHistory(newHistory));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default placesSlice.reducer;
