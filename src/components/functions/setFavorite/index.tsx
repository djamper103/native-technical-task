import {storageLocal} from 'constants/common';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const setfavorite = (state: any) => {
  storageLocal.set('favorite', JSON.stringify(state.favoriteState));
  if (auth().currentUser?.uid !== undefined) {
    firestore().collection('Favorite').doc(auth().currentUser?.uid).set({
      favorite: state.favoriteState,
    });
  }
};
