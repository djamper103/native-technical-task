import {createSlice} from '@reduxjs/toolkit';
import {MovieData} from '../../../types/movieData';
import {setfavorite} from 'components/functions/setFavorite';

interface FavoriteState {
  favoriteState: MovieData[];
}

const initialState: FavoriteState = {
  favoriteState: [],
};

export const FavoriteSlice = createSlice({
  name: 'favoriteState',
  initialState: initialState,
  reducers: {
    setFavoriteState(state, action) {
      state.favoriteState = action.payload;
    },
    incrementFavorite(state, action) {
      state.favoriteState = [action.payload, ...state.favoriteState];
      setfavorite(state);
    },
    decrementFavorite(state, action) {
      state.favoriteState = state.favoriteState.filter(
        el => el.id !== action.payload.id,
      );
      setfavorite(state);
    },
  },
});

export default FavoriteSlice.reducer;
