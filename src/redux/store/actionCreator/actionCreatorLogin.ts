import {SignInType} from 'types/login';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {storageLocal} from '../../../constants/common';
import {AppDispatch} from '../store';
import {LoginSlice} from '../reducers/loginSlice';

export const signIn = (item: SignInType) => (dispatch: AppDispatch) => {
  auth()
    .signInWithEmailAndPassword(item.email, item.password)
    .then(() => {
      return firestore()
        .collection('Users')
        .doc(`${auth().currentUser?.uid}`)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            return documentSnapshot.data();
          }
        })
        .then((el: any) => {
          return storage()
            .ref(`${auth().currentUser?.uid}`)
            .getDownloadURL()
            .then((snapshot: any) => {
              dispatch(
                LoginSlice.actions.signIn({name: el.name, imageUrl: snapshot}),
              );
            });
        });
    });
  storageLocal.set(
    'login',
    JSON.stringify({
      email: item.email,
      password: item.password,
    }),
  );
};

export const signOut = () => (dispatch: AppDispatch) => {
  auth().signOut();
  const json = storageLocal.getString('login');
  if (json !== undefined) {
    storageLocal.delete('login');
    dispatch(LoginSlice.actions.signOut());
  }
};

export const isSignIn = () => (dispatch: AppDispatch) => {
  const json = storageLocal.getString('login');
  if (json !== undefined) {
    const userObject = JSON.parse(json);
    auth()
      .signInWithEmailAndPassword(userObject.email, userObject.password)
      .then(() => {
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
              LoginSlice.actions.isSignIn({name: el.name, imageUrl: snapshot}),
            );
          });
      });
  }
};

export const registration =
  (payload: {
    email: string;
    password: string;
    uploadUri: string;
    name: string;
  }) =>
  () => {
    auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        firestore()
          .collection('Users')
          .doc(auth().currentUser?.uid)
          .set({
            name: payload.name,
          })
          .then(async () => {
            storage()
              .ref(`${auth().currentUser?.uid}`)
              .putFile(payload.uploadUri);
          });
      });
  };
