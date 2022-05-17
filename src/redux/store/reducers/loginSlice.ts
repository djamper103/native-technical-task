import {createSlice} from '@reduxjs/toolkit';

interface UserState {
  userName: string;
  imageUrl: string;
  errorSignIn?: string;
  email: string;
  date: string;
  isSignIn: boolean;
  isChangeName: boolean;
  isChangeImage: boolean;
}

const initialState: UserState = {
  userName: '',
  imageUrl: '',
  errorSignIn: '',
  email: '',
  date: '',
  isSignIn: false,
  isChangeName: false,
  isChangeImage: false,
};

export const LoginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    signIn(state, action) {
      if (action.payload.error === '') {
        state.imageUrl = action.payload.imageUrl;
        state.userName = action.payload.name;
        state.email = action.payload.email;
        state.date = action.payload.date;
        state.isSignIn = true;
      } else {
        state.errorSignIn = action.payload.error;
      }
    },
    signOut(state) {
      state.userName = '';
      state.imageUrl = '';
      state.email = '';
      state.date = '';
      state.isSignIn = false;
    },
    isSignIn(state, action) {
      if (action.payload.error === '') {
        state.userName = action.payload.name;
        state.imageUrl = action.payload.imageUrl;
        state.email = action.payload.email;
        state.date = action.payload.date;
        state.isSignIn = true;
      } else {
        state.errorSignIn = action.payload.error;
      }
    },
    deleteError(state) {
      state.errorSignIn = '';
    },
    changeName(state, action) {
      state.userName = action.payload;
    },
    changeImage(state, action) {
      state.imageUrl = action.payload;
    },
  },
});

export default LoginSlice.reducer;
