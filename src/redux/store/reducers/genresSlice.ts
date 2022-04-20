import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GenresType} from '../../../types/genres';
import {fetchGenres} from './actionCreator';

interface GenresState {
  genres: GenresType[];
  currentGenre: string;
  error: string;
}

const initialState: GenresState = {
  genres: [],
  currentGenre: '28',
  error: '',
};

export const GenresSlice = createSlice({
  name: 'genres',
  initialState: initialState,
  reducers: {
    setGenre(state, action: PayloadAction<string>) {
      state.currentGenre = action.payload;
    },
  },
  extraReducers: {
    [fetchGenres.fulfilled.type]: (state: any, action: any) => {
      state.error = '';
      state.genres = action.payload.genres;
    },
    [fetchGenres.pending.type]: (_state: any) => {},
    [fetchGenres.rejected.type]: (
      state: any,
      action: PayloadAction<string>,
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default GenresSlice.reducer;
