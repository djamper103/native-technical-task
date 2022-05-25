import {MovieData} from 'types/movieData';
import {FavoriteSlice} from '../reducers/favoriteSlice';
import {AppDispatch} from '../store';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {netInfo} from 'components/functions/internet';
import {ifJson} from 'components/functions/ifJson';
import {storageLocal} from 'constants/common';

export const addFavorite = (item: MovieData) => (dispatch: AppDispatch) => {
  dispatch(FavoriteSlice.actions.incrementFavorite(item));
};

export const deleteFavorite = (item: MovieData) => (dispatch: AppDispatch) => {
  dispatch(FavoriteSlice.actions.decrementFavorite(item));
};

export const setFavorite =
  (isLogin: boolean) => async (dispatch: AppDispatch) => {
    if (await netInfo()) {
      if (isLogin) {
        firestore()
          .collection('Favorite')
          .doc(auth().currentUser?.uid)
          .get()
          .then(documentSnapshot => {
            if (documentSnapshot.exists) {
              let result: any = documentSnapshot.data();
              if (result.favorite.length !== 0) {
                const json = storageLocal.getString('favorite');
                if (json !== undefined) {
                  let uniqueObjArray = [
                    ...new Map(
                      [...JSON.parse(json), ...result.favorite].map(
                        (item: any) => [item.title, item],
                      ),
                    ).values(),
                  ];
                  dispatch(
                    FavoriteSlice.actions.setFavoriteState(uniqueObjArray),
                  );
                } else {
                  dispatch(
                    FavoriteSlice.actions.setFavoriteState(result.favorite),
                  );
                }
              } else {
                ifJson(
                  'favorite',
                  FavoriteSlice.actions.setFavoriteState,
                  dispatch,
                );
              }
            } else {
              ifJson(
                'favorite',
                FavoriteSlice.actions.setFavoriteState,
                dispatch,
              );
            }
          });
      } else {
        dispatch(FavoriteSlice.actions.setFavoriteState([]));
      }
    } else {
      ifJson('favorite', FavoriteSlice.actions.setFavoriteState, dispatch);
    }
  };
