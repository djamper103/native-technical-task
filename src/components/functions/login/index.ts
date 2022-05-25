import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {storageLocal} from 'constants/common';
import {setFavorite} from 'redux/store/actionCreator/actionCreatorFavorite';
import {LoginSlice} from 'redux/store/reducers/loginSlice';

export const setLoginFunc = (state: any, dispatch: any, isLogin: boolean) => {
  auth()
    .signInWithEmailAndPassword(state.email, state.password)
    .then(async () => {
      return firestore()
        .collection('Users')
        .doc(auth().currentUser?.uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            return documentSnapshot.data();
          }
        });
    })
    .then((el: any) => {
      storage()
        .ref(`${auth().currentUser?.uid}`)
        .getDownloadURL()
        .then((snapshot: any) => {
          dispatch(
            LoginSlice.actions.signIn({
              name: el.name,
              imageUrl: snapshot,
              date: el.date,
              email: state.email,
              error: '',
            }),
          );
          storageLocal.set(
            'login',
            JSON.stringify({
              email: state.email,
              password: state.password,
            }),
          );
          isLogin && dispatch(setFavorite(isLogin));
        });
    })
    .catch(error => {
      dispatch(
        LoginSlice.actions.signIn({name: '', imageUrl: '', error: error}),
      );
    });
};
