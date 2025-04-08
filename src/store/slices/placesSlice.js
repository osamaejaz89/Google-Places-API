import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getSearchHistory, saveSearchHistory} from '../../services/storage';
import {getPlaceDetails} from '../../services/places';

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
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchSearchHistory.fulfilled, (state, action) => {
      state.searchHistory = action.payload;
    });
    builder.addCase(selectPlace.fulfilled, (state, action) => {
      state.selectedPlace = action.payload.placeDetails;
      state.searchHistory = action.payload.updatedHistory;
    });
  },
});

// Thunks
export const fetchSearchHistory = createAsyncThunk(
  'places/fetchSearchHistory',
  async () => {
    return await getSearchHistory();
  },
);

export const selectPlace = createAsyncThunk(
  'places/selectPlace',
  async place => {
    const placeDetails = await getPlaceDetails(place.place_id);
    const history = await getSearchHistory();
    const updatedHistory = [
      place,
      ...history.filter(item => item.place_id !== place.place_id),
    ].slice(0, 10);
    await saveSearchHistory(updatedHistory);
    return {placeDetails, updatedHistory};
  },
);

export const {setSearchResults, setLoading, setError} = placesSlice.actions;
export default placesSlice.reducer;
