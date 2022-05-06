import {createSlice} from '@reduxjs/toolkit';

interface UserState {
  userName: string;
  imageUrl: string;
  isSignIn: boolean;
}

const initialState: UserState = {
  userName: '',
  imageUrl: '',
  isSignIn: false,
};

export const LoginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    signIn(state, action) {
      state.imageUrl = action.payload.imageUrl;
      state.userName = action.payload.name;
      state.isSignIn = true;
    },
    signOut(state) {
      state.userName = '';
      state.imageUrl = '';
      state.isSignIn = false;
    },
    isSignIn(state, action) {
      state.userName = action.payload.name;
      state.imageUrl = action.payload.imageUrl;
      state.isSignIn = true;
    },
  },
});

export default LoginSlice.reducer;
