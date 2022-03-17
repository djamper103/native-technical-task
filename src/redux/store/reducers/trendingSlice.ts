import {fetchTrending} from './actionCreator';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MovieData} from '../../../types/movieData';

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
      state.isLoading = false;
      state.error = '';
      state.trendingState = action.payload.results;
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
