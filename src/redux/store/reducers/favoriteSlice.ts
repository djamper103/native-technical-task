import {createSlice} from '@reduxjs/toolkit';
import {MovieData} from '../../../types/movieData';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

interface FavoriteState {
  favoriteState: MovieData[];
}

const initialState: FavoriteState = {
  favoriteState: [],
};

// storage.set('favorite', 'Marc');
// const keys = storage.getAllKeys();

//   const username = storage.getString('user');

export const FavoriteSlice = createSlice({
  name: 'favoriteState',
  initialState: initialState,
  reducers: {
    setFavoriteState(state) {
      const json = storage.getString('favorite');
      if (json !== undefined) {
        const userObject = JSON.parse(json);
        state.favoriteState = userObject;
      }
    },
    incrementFavorite(state, action) {
      state.favoriteState = [action.payload, ...state.favoriteState];
      storage.set('favorite', JSON.stringify(state.favoriteState));
    },
    decrementFavorite(state, action) {
      state.favoriteState = state.favoriteState.filter(
        el => el.id !== action.payload.id,
      );
      storage.set('favorite', JSON.stringify(state.favoriteState));
    },
  },
});

export default FavoriteSlice.reducer;
