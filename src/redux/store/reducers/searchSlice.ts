import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MovieData} from '../../../types/movieData';
import {fetchSearch} from '../actionCreator/actionCreator';

interface SearchState {
  searchState: MovieData[];
  searchText: string;
  searchAllPages: number;
  searchIsLoading: boolean;
  searchError: string;
}

const initialState: SearchState = {
  searchState: [],
  searchText: '',
  searchAllPages: 0,
  searchIsLoading: false,
  searchError: '',
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
      state.searchIsLoading = false;
      state.searchError = '';
      state.searchState = action.payload.results;
      state.searchAllPages = action.payload.total_pages;
    },
    [fetchSearch.pending.type]: state => {
      state.searchIsLoading = true;
    },
    [fetchSearch.rejected.type]: (state, action: PayloadAction<string>) => {
      state.searchIsLoading = false;
      state.searchError = action.payload;
    },
  },
});

export default SearchSlice.reducer;
