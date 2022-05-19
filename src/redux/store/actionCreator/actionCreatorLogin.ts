import {SignInType} from 'types/login';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {storageLocal} from '../../../constants/common';
import {AppDispatch} from '../store';
import {LoginSlice} from '../reducers/loginSlice';
import {RegistrationSlice} from '../reducers/registration';
import {uploadPhoto} from 'components/common/functions/uploadPhoto';
import {Alert} from 'react-native';
import {setFavorite} from './actionCreatorFavorite';

export const signIn =
  (payload: {item: SignInType; isLogin: boolean}) =>
  (dispatch: AppDispatch) => {
    auth()
      .signInWithEmailAndPassword(payload.item.email, payload.item.password)
      .then(async () => {
        return firestore()
          .collection('Users')
          .doc(`${auth().currentUser?.uid}`)
          .get()
          .then(documentSnapshot => {
            if (documentSnapshot.exists) {
              return documentSnapshot.data();
            }
          })
          .then(async (el: any) => {
            return storage()
              .ref(`${auth().currentUser?.uid}`)
              .getDownloadURL()
              .then((snapshot: any) => {
                dispatch(
                  LoginSlice.actions.signIn({
                    name: el.name,
                    imageUrl: snapshot,
                    email: payload.item.email,
                    date: el.date,
                    error: '',
                  }),
                );
                storageLocal.set(
                  'login',
                  JSON.stringify({
                    email: payload.item.email,
                    password: payload.item.password,
                  }),
                );
                dispatch(setFavorite(payload.isLogin));
              });
          });
      })
      .catch(error => {
        dispatch(
          LoginSlice.actions.signIn({name: '', imageUrl: '', error: error}),
        );
      });
  };

export const signOut = () => (dispatch: AppDispatch) => {
  auth()
    .signOut()
    .then(() => {
      const json = storageLocal.getString('login');
      if (json !== undefined) {
        storageLocal.delete('login');
        dispatch(LoginSlice.actions.signOut());
      }
    });
};

export const setSignIn = () => (dispatch: AppDispatch) => {
  const json = storageLocal.getString('login');
  if (json !== undefined) {
    const userObject = JSON.parse(json);
    auth()
      .signInWithEmailAndPassword(userObject.email, userObject.password)
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
              LoginSlice.actions.isSignIn({
                name: el.name,
                imageUrl: snapshot,
                date: el.date,
                email: userObject.email,
                error: '',
              }),
            );
          });
      })
      .catch(error => {
        dispatch(
          LoginSlice.actions.isSignIn({name: '', imageUrl: '', error: error}),
        );
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
  (dispatch: AppDispatch) => {
    auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(async () => {
        firestore()
          .collection('Users')
          .doc(auth().currentUser?.uid)
          .set({
            name: payload.name,
            date: new Date().toJSON().split('T')[0],
          })
          .then(async () => {
            await storage()
              .ref(`${auth().currentUser?.uid}`)
              .putFile(payload.uploadUri);
          })
          .then(() => {
            dispatch(RegistrationSlice.actions.setRegistration(''));
          });
      })
      .catch(error =>
        dispatch(RegistrationSlice.actions.setRegistration(error)),
      );
  };

export const changeName = (name: string) => async (dispatch: AppDispatch) => {
  try {
    await firestore()
      .collection('Users')
      .doc(auth().currentUser?.uid)
      .set({
        name: name,
      })
      .then(() => {
        dispatch(LoginSlice.actions.changeName(name));
        Alert.alert('Name successfully modified');
      });
  } catch (error) {
    Alert.alert(`Something went wrong try again ${error}`);
  }
};

export const changeImage = () => async (dispatch: AppDispatch) => {
  uploadPhoto('image').then(async (el: any) => {
    await storage()
      .ref(`${auth().currentUser?.uid}`)
      .putFile(el.assets[0].uri)
      .then(() => {
        if (el.assets[0].uri) {
          dispatch(LoginSlice.actions.changeImage(el.assets[0].uri));
          Alert.alert('Image successfully modified');
        } else {
          Alert.alert('Something went wrong try again');
        }
      });
  });
};

export const resetRegistration = () => (dispatch: AppDispatch) => {
  dispatch(RegistrationSlice.actions.resetRegistration());
};

export const resetPassword =
  (payload: {email: string; func: () => void}) => () => {
    auth()
      .sendPasswordResetEmail(payload.email)
      .then(() => {
        payload.func();
        Alert.alert('Password reset request sent check your email');
      })
      .catch(Error => {
        Alert.alert(`${Error}`);
      });
  };
