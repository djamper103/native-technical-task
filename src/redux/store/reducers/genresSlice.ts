import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchGenres} from './actionCreator';

interface GenresState {
  genres: Object[];
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
    [fetchGenres.fulfilled.type]: (
      state: any,
      action: PayloadAction<Object[]>,
    ) => {
      state.error = '';
      state.genres = action.payload;
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
