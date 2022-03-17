import {fetchSearch} from './actionCreator';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MovieData} from '../../../types/movieData';

interface SearchState {
  searchState: MovieData[];
  searchText: string;
  searchAllPages: number;
  isLoading: boolean;
  error: string;
}

const initialState: SearchState = {
  searchState: [],
  searchText: '',
  searchAllPages: 0,
  isLoading: false,
  error: '',
};

export const SearchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    searchText(state, action) {
      state.searchText = action.payload;
    },
    nullText(state) {
      state.searchText = '';
    },
  },
  extraReducers: {
    [fetchSearch.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.searchState = action.payload.results;
      state.searchAllPages = action.payload.total_pages;
    },
    [fetchSearch.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchSearch.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default SearchSlice.reducer;
