import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {storageLocal} from 'constants/common';
import {MovieData} from '../../../types/movieData';
import {fetchTrending} from '../actionCreator/actionCreator';

interface TrendingState {
  trendingState: MovieData[];
  allTrendingPage: number;
  isLoading: boolean;
  error: string;
}

const initialState: TrendingState = {
  trendingState: [],
  allTrendingPage: 10,
  isLoading: false,
  error: '',
};

export const TrendingSlice = createSlice({
  name: 'trending',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchTrending.fulfilled.type]: (state, action) => {
      if (action.payload.results.length > 0) {
        state.error = '';
        state.trendingState = action.payload.results;
        storageLocal.set('Data', JSON.stringify(action.payload.results));
        state.isLoading = false;
      } else {
        state.error = 'No internet connection';
        state.isLoading = false;
      }
    },
    [fetchTrending.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchTrending.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default TrendingSlice.reducer;
