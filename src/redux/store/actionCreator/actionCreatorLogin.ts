import {SignInType} from 'types/login';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {storageLocal} from '../../../constants/common';
import {AppDispatch} from '../store';
import {LoginSlice} from '../reducers/loginSlice';
import {RegistrationSlice} from '../reducers/registration';
import {uploadPhoto} from 'components/functions/uploadPhoto';
import {showAlert} from 'components/functions/alert';
import {ifJson} from 'components/functions/ifJson';
import {setLoginFunc} from 'components/functions/login';
import {setFavorite} from './actionCreatorFavorite';

export const signIn =
  (payload: {item: SignInType; isLogin: boolean}) =>
  (dispatch: AppDispatch) => {
    setLoginFunc(payload.item, dispatch, payload.isLogin);
  };

export const signOut = () => (dispatch: AppDispatch) => {
  auth()
    .signOut()
    .then(() => {
      ifJson('login', LoginSlice.actions.signOut, dispatch, true, setFavorite);
    });
};

export const setSignIn = () => (dispatch: AppDispatch) => {
  const json = storageLocal.getString('login');
  if (json !== undefined) {
    const userObject = JSON.parse(json);
    setLoginFunc(userObject, dispatch, false);
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
        showAlert('Name successfully modified');
      });
  } catch (error) {
    showAlert(`Something went wrong try again ${error}`);
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
          showAlert('Image successfully modified');
        } else {
          showAlert('Something went wrong try again');
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
        showAlert('Password reset request sent check your email');
      })
      .catch(Error => {
        showAlert(`${Error}`);
      });
  };
