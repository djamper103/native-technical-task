import {createSlice} from '@reduxjs/toolkit';
import {storageLocal} from 'constants/common';
import {MovieData} from '../../../types/movieData';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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
      storageLocal.set('favorite', JSON.stringify(state.favoriteState));
      if (auth().currentUser?.uid !== undefined) {
        firestore().collection('Favorite').doc(auth().currentUser?.uid).set({
          favorite: state.favoriteState,
        });
      }
    },
    decrementFavorite(state, action) {
      state.favoriteState = state.favoriteState.filter(
        el => el.id !== action.payload.id,
      );
      storageLocal.set('favorite', JSON.stringify(state.favoriteState));
      if (auth().currentUser?.uid !== undefined) {
        firestore().collection('Favorite').doc(auth().currentUser?.uid).set({
          favorite: state.favoriteState,
        });
      }
    },
  },
});

export default FavoriteSlice.reducer;
