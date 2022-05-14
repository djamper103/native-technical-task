import {createSlice} from '@reduxjs/toolkit';

interface UserState {
  userName: string;
  imageUrl: string;
  errorSignIn?: string;
  isSignIn: boolean;
}

const initialState: UserState = {
  userName: '',
  imageUrl: '',
  errorSignIn: '',
  isSignIn: false,
};

export const LoginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    signIn(state, action) {
      if (action.payload.error === '') {
        state.imageUrl = action.payload.imageUrl;
        state.userName = action.payload.name;
        state.isSignIn = true;
      } else {
        state.errorSignIn = action.payload.error;
      }
    },
    signOut(state) {
      state.userName = '';
      state.imageUrl = '';
      state.isSignIn = false;
    },
    isSignIn(state, action) {
      if (action.payload.error === '') {
        state.userName = action.payload.name;
        state.imageUrl = action.payload.imageUrl;
        state.isSignIn = true;
      } else {
        state.errorSignIn = action.payload.error;
      }
    },
  },
});

export default LoginSlice.reducer;
