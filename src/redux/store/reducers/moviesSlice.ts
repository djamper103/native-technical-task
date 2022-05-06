import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MovieData} from '../../../types/movieData';
import {fetchMovies} from '../actionCreator/actionCreator';

interface MoviesState {
  moviesState: MovieData[];
  allPages: number;
  isLoading: boolean;
  error: string;
}

const initialState: MoviesState = {
  moviesState: [],
  allPages: 0,
  isLoading: false,
  error: '',
};

export const MoviesSlice = createSlice({
  name: 'movies',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchMovies.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.moviesState = action.payload.results;
      state.allPages = action.payload.total_results;
    },
    [fetchMovies.pending.type]: state => {
      state.isLoading = true;
    },
    [fetchMovies.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default MoviesSlice.reducer;
